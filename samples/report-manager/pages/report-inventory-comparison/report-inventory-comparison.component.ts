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
  ReportsExcelNames,
  inventoryComparisonLabels,
} from '../../models/report.entity';
import {
  objectContainsValue,
  highlightSearchText,
  ID_DATA_NAME,
  addIdToData,
  formatArrayValues,
} from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';
import { DateTime } from 'luxon';
import { AuthStateService } from '../../../../src/app/layout/modules/auth-manager/services/auth-state.service';
import { ActivatedRoute } from '@angular/router';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'app-report-inventory-comparison',
  templateUrl: './report-inventory-comparison.component.html',
  styleUrls: ['./report-inventory-comparison.component.scss'],
  providers: [HttpClient],
})
export class ReportInventoryComparisonComponent {
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
  inventoryComparisonLabels = inventoryComparisonLabels;
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
    public _auth: AuthStateService,
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
    this._report.state.inventory.comparison.list.data = [];
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
              (item) => item.url === '/inventories/inventory-comparison'
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
      url: '/inventories/inventory-comparison',
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
    for (const store of this._common.state.stores) {
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
    this._reportApi.inventoryComparison(this.filter).subscribe({
      next: (data) => {
        this._report.state.inventory.comparison.list = {
          data,
          total: data.length,
        };
        const dataOriginal = addIdToData(data);
        this._report.state.inventory.comparison.original = {
          data: dataOriginal,
          total: dataOriginal.length,
        };
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {
          businessDate: { type: 'date', format: 'dd-MM-yyyy' },
          totalMoneyReturn: { type: 'number', format: 'currency' },
          totalMoneySale: { type: 'number', format: 'currency' },
          totalPercentReturn: {
            type: 'number',
            format: 'percent',
            suffix: '%',
          },
          unitPercentReturn: { type: 'number', format: 'percent', suffix: '%' },
        });
        this._report.state.inventory.comparison.list = {
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
    this.selectedOrigin = '';
    this.filter = '';
  }

  handleSearchRecords() {
    const list = this._report.state.inventory.comparison.list.data;
    this._report.state.inventory.comparison.filter.data = list.filter((item) =>
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
    if (this._report.state.inventory.comparison.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list =
      this._report.state.inventory.comparison.filter.data.length > 0
        ? this._report.state.inventory.comparison.filter.data
        : this._report.state.inventory.comparison.list.data;
    const ids = list.map((item) => item[ID_DATA_NAME]);
    list = this._report.state.inventory.comparison.original.data.filter(
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
      ReportsExcelNames.COMPARACION_DE_INVENTARIOS_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
