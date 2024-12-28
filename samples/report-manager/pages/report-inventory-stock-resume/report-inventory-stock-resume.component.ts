import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonApiService } from '../../services/common-api.service';
import { CommonStateService } from '../../services/common-state.service';
import { Store } from '../../models/store.model';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import {
  inventoryStockResumeLabels,
  inventoryStockDetailLabels,
  ReportsExcelNames,
} from '../../models/report.entity';
import {
  objectContainsValue,
  highlightSearchText,
  addIdToData,
  formatArrayValues,
  ID_DATA_NAME,
} from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';
import { DateTime } from 'luxon';
import { AuthStateService } from '../../../../src/app/layout/modules/auth-manager/services/auth-state.service';
import { ActivatedRoute } from '@angular/router';
import { TemplateStateService } from 'src/app/template';
import { UserStateService } from '@user-manager/services';

@Component({
  selector: 'app-report-inventory-stock-resume',
  templateUrl: './report-inventory-stock-resume.component.html',
  styleUrls: ['./report-inventory-stock-resume.component.scss'],
  providers: [HttpClient],
})
export class ReportInventoryStockResumeComponent {
  searchText: string = '';
  searchTextDetails: string = '';
  selectedStatus!: string;
  selectedStore: Store | null = null;
  suggestions: Store[] = [];
  isLoading: boolean = false;
  showModal: boolean = false;
  showDetailsModal: boolean = false;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';
  showDetail: boolean = false;
  originList: any[] = [
    { name: 'xStore', id: 'xstore' },
    { name: 'xCenter', id: 'xcenter' },
  ];
  searchFormEntityLabels = searchFormEntityLabels;
  inventoryStockResumeLabels = inventoryStockResumeLabels;
  inventoryStockDetailLabels = inventoryStockDetailLabels;
  filter: string = '';
  subscription: any = {};
  optionsState: any = {};
  highlightSearchText = highlightSearchText;
  lastOptionsEntity: OptionsEntity = {
    onChart: false,
    onDownload: false,
    onRefresh: false,
    onSearch: false,
    onShow: false,
    onFavorite: false,
  };

  constructor(
    public _optionServices: OptionsStateService,
    private _reportApi: ReportApiService,
    private _commonApi: CommonApiService,
    public _report: ReportStateService,
    public _common: CommonStateService,
    public _excelService: ExcelService,
    private _user: UserStateService,
    private route: ActivatedRoute,
    private _template: TemplateStateService
  ) {
    //this._auth.loadUserInfo();
    _optionServices.initState();
    if (_template.state.roleList == undefined) {
      let userSelected = JSON.parse(
        sessionStorage.getItem('userSelected') as string
      );
      _template.state.roleList =
        userSelected.privileges.reportesadministrativos;
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
    this._template.state.sidebarOverlayVisible = false;
    this._report.state.inventory.stockResume.list.data = [];
    this.subscription = this._optionServices.state.subscribe((optionsState) => {
      if (optionsState.OptionsEntity !== this.lastOptionsEntity) {
        const { onChart, onDownload, onRefresh, onSearch, onShow, onFavorite } =
          optionsState.OptionsEntity;
        if (onRefresh !== this.lastOptionsEntity.onRefresh) {
          this.handleSearch();
        }
        if (onDownload !== this.lastOptionsEntity.onDownload) {
          this.exportExcel();
        }
        if (onFavorite !== this.lastOptionsEntity.onFavorite) {
          this.handleFavorite();
        }
        this.lastOptionsEntity = {
          onChart,
          onDownload,
          onRefresh,
          onSearch,
          onShow,
          onFavorite,
        };
      }
    });
    this.getStores().then(() => {
      if (
        this.route.snapshot.queryParamMap.get('favorite') &&
        this._common.state.favorites.length > 0
      ) {
        const report: any = this.route.snapshot.queryParamMap.get('favorite')
          ? this._common.state.favorites.find(
              (item) => item.url === '/inventories/inventory-stock/resume'
            )
          : this._common.state.historic.find(
              (item) =>
                item.index ===
                Number(this.route.snapshot.queryParamMap.get('index'))
            );
        if (report) {
          const selectedStore = this._common.state.stores.find(
            (item) => item.storeInfoId === report.searchCriteria.storeId
          );
          this.selectedStore = selectedStore || null;
          this._optionServices.setSearch();
          this.handleSearch();
        }
      }
    });
  }

  handleFavorite() {
    this.isLoading = true;
    const data = {
      searchCriteria: {
        storeId: this.selectedStore?.storeInfoId,
      },
      url: '/inventories/inventory-stock/resume',
    };

    this._reportApi.favorite(data).subscribe({
      next: async () => {
        await this.setErrorModal(
          'Completado',
          'Reporte agregado a favorito',
          '50px'
        );
        this.isLoading = false;
      },
      error: (e) => {
        console.error('error loading data', e);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  filterStores(event: { query: string }) {
    const filteredStores: Store[] = [];
    const storeList: Store[] = [];
    const userRol =
      this._user.state.userSelected.privileges.reportesadministrativos;
    const userStore = this._user.state.userSelected.tienda;

    if (userRol.includes('tienda')) {
      const temp = this._common.state.stores.filter(
        (store) => store.storeInfoId === userStore
      );
      storeList.push(...temp);
    } else if (userRol.includes('staff-menudeo')) {
      const temp = this._common.state.stores.filter(
        (x) => x.storeInfoType === 'R'
      );
      storeList.push(...temp);
    } else if (userRol.includes('staff-mayoreo')) {
      const temp = this._common.state.stores.filter(
        (x) => x.storeInfoType === 'W'
      );
      storeList.push(...temp);
    } else {
      storeList.push(...this._common.state.stores);
    }

    for (const store of storeList) {
      if (
        store.storeInfoName.toLowerCase().includes(event.query.toLowerCase())
      ) {
        filteredStores.push(store);
      }
    }
    this.suggestions = filteredStores;
  }

  getStores(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._commonApi.getStores().subscribe({
        next: (data) => {
          this._common.state.stores = data;
          resolve();
        },
        error: (e) => {
          console.error('error loading data', e);
          reject(e);
        },
        complete: () => {
          resolve();
        },
      });
    });
  }

  getList() {
    this.showDetailsModal = false;
    this.isLoading = true;
    this._reportApi.inventoryStockResume(this.filter).subscribe({
      next: (data) => {
        const dataOriginal = addIdToData(data);
        this._report.state.inventory.stockResume.original = {
          data: dataOriginal,
          total: dataOriginal.length,
        };
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {});
        this._report.state.inventory.stockResume.list = {
          data: dataFormatted,
          total: dataFormatted.length,
        };
      },
      error: (e) => {
        console.error('error loading data', e);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  async handleSearch() {
    if (this.selectedStore === null || typeof this.selectedStore === 'string') {
      await this.setErrorModal(
        'Error',
        'Debe completar los datos del formulario de busqueda',
        '50px'
      );
      return;
    }
    this.filter = `?storeId=${this.selectedStore?.storeInfoId}`;
    this.getList();
  }
  resetFilters() {
    this.selectedStore = null;
    this.filter = '';
  }

  handleSearchRecords() {
    const list = this._report.state.inventory.stockResume.list.data;
    this._report.state.inventory.stockResume.filter.data = list.filter((item) =>
      objectContainsValue(item, this.searchText)
    );
  }

  async findDetails() {
    this.isLoading = true;
    this._reportApi.inventoryStockDetails(this.filter).subscribe({
      next: (data) => {
        this._report.state.inventory.stockResume.details = data;
      },
      error: (e) => {
        console.error('error loading data', e);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  async showDetails() {
    this.showDetailsModal = true;
  }
  async setErrorModal(title: string, text: string, width: string) {
    this.titleModal = title;
    this.textModal = text;
    this.widthModal = width;
    this.showModal = true;
  }

  async exportDetailsExcel() {
    if (this._report.state.inventory.stockResume.details.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list = this._report.state.inventory.stockResume.details;
    const blob = await this._excelService.generateExcel(list);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${
      ReportsExcelNames.EXISTENCIA_DE_INVENTARIO_DETALLE_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  async exportExcel() {
    if (this._report.state.inventory.stockResume.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list =
      this._report.state.inventory.stockResume.filter.data.length > 0
        ? this._report.state.inventory.stockResume.filter.data
        : this._report.state.inventory.stockResume.list.data;
    const ids = list.map((item) => item[ID_DATA_NAME]);
    list = this._report.state.inventory.stockResume.original.data.filter(
      (item) => {
        if (ids.includes(item[ID_DATA_NAME])) {
          return item;
        }
      }
    );
    const blob = await this._excelService.generateExcel(list);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${
      ReportsExcelNames.EXISTENCIA_DE_INVENTARIO_RESUMEN_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
