import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { DateTime } from 'luxon';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonApiService } from '../../services/common-api.service';
import { CommonStateService } from '../../services/common-state.service';
import { Store } from '../../models/store.model';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import {
  ReportsExcelNames,
  inventoryKardexLabels,
} from '../../models/report.entity';
import {
  objectContainsValue,
  highlightSearchText,
  addIdToData,
  formatArrayValues,
  ID_DATA_NAME,
} from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';
import { ActivatedRoute } from '@angular/router';
import { TemplateStateService } from 'src/app/template';
import { UserStateService } from '@user-manager/services';

@Component({
  selector: 'app-report-inventory-kardex',
  templateUrl: './report-inventory-kardex.component.html',
  styleUrls: ['./report-inventory-kardex.component.scss'],
  providers: [HttpClient],
})
export class ReportInventoryKardexComponent {
  searchText: string = '';
  selectedStatus!: string;
  selectedStore: Store | null = null;
  selectedOrigin: string = '';
  suggestions: Store[] = [];
  isLoading: boolean = false;
  showModal: boolean = false;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';
  showDetail: boolean = false;
  originList: any[] = [
    { name: 'xStore', id: 'xstore' },
    { name: 'xCenter', id: 'xcenter' },
  ];
  searchFormEntityLabels = searchFormEntityLabels;
  inventoryKardexLabels = inventoryKardexLabels;
  productCode: string = '';
  from: Date = new Date();
  to: Date = new Date();
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
    private route: ActivatedRoute,
    private _template: TemplateStateService,
    private _user: UserStateService
  ) {
    _optionServices.initState();
    //this._auth.loadUserInfo();
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
    this._report.state.inventory.kardex.list.data = [];
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
        this.route.snapshot.queryParamMap.get('favorite') ||
        this.route.snapshot.queryParamMap.get('historic')
      ) {
        const report: any = this.route.snapshot.queryParamMap.get('favorite')
          ? this._common.state.favorites.find(
              (item) => item.url === '/inventories/kardex'
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
          this.productCode = report.searchCriteria.productId;
          this.selectedOrigin = report.searchCriteria.origin;
          this.from = DateTime.fromISO(
            report.searchCriteria.startDate
          ).toJSDate();
          this.to = DateTime.fromISO(report.searchCriteria.endDate).toJSDate();
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
        productId: this.productCode,
        origin: this.selectedOrigin,
        startDate: DateTime.fromJSDate(new Date(this.from)).toFormat(
          'yyyy-MM-dd'
        ),
        endDate: DateTime.fromJSDate(new Date(this.to)).toFormat('yyyy-MM-dd'),
      },
      url: '/inventories/kardex',
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
    this.isLoading = true;
    this._reportApi.inventoryKardexProduct(this.filter).subscribe({
      next: (data) => {
        const dataOriginal = addIdToData(data);
        this._report.state.inventory.kardex.original = {
          data: dataOriginal,
          total: dataOriginal.length,
        };
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {
          create_date: { type: 'date', format: 'dd-MM-yyyy HH:mm:ss' },
        });
        this._report.state.inventory.kardex.list = {
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
    if (
      this.selectedStore === null ||
      typeof this.selectedStore === 'string' ||
      this.productCode === '' ||
      this.selectedOrigin === ''
    ) {
      await this.setErrorModal(
        'Error',
        'Debe completar los datos del formulario de busqueda',
        '50px'
      );
      return;
    }
    this.filter = `?storeId=${this.selectedStore?.storeInfoId}&productId=${
      this.productCode
    }&origin=${this.selectedOrigin}&startDate=${DateTime.fromJSDate(
      new Date(this.from)
    ).toFormat('yyyy-MM-dd')}&endDate=${DateTime.fromJSDate(
      new Date(this.to)
    ).toFormat('yyyy-MM-dd')}`;
    this.getList();
  }
  resetFilters() {
    this.selectedStore = null;
    this.selectedOrigin = '';
    this.productCode = '';
    this.from = new Date();
    this.to = new Date();
    this.filter = '';
  }

  handleSearchRecords() {
    const list = this._report.state.inventory.kardex.list.data;
    this._report.state.inventory.kardex.filter.data = list.filter((item) =>
      objectContainsValue(item, this.searchText)
    );
  }

  async setErrorModal(title: string, text: string, width: string) {
    this.titleModal = title;
    this.textModal = text;
    this.widthModal = width;
    this.showModal = true;
  }

  async exportExcel() {
    if (this._report.state.inventory.kardex.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list =
      this._report.state.inventory.kardex.filter.data.length > 0
        ? this._report.state.inventory.kardex.filter.data
        : this._report.state.inventory.kardex.list.data;
    const ids = list.map((item) => item[ID_DATA_NAME]);
    list = this._report.state.inventory.kardex.original.data.filter((item) => {
      if (ids.includes(item[ID_DATA_NAME])) {
        return item;
      }
    });
    const blob = await this._excelService.generateExcel(list);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = `${
      ReportsExcelNames.KARDEX_DE_ARTICULO_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
