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
  inventoryCycleCountLabels,
} from '../../models/report.entity';
import {
  ID_DATA_NAME,
  addIdToData,
  formatArrayValues,
  highlightSearchText,
  objectContainsValue,
} from 'src/app/shared/functions/functions';
import { OptionsEntity } from 'src/app/shared/components/options/models/options.entity';
import { DateTime } from 'luxon';
import { ActivatedRoute } from '@angular/router';
import { TemplateStateService } from 'src/app/template';
import { UserStateService } from '@user-manager/services';

@Component({
  selector: 'app-report-inventory-cycle-count',
  templateUrl: './report-inventory-cycle-count.component.html',
  styleUrls: ['./report-inventory-cycle-count.component.scss'],
  providers: [HttpClient],
})
export class ReportInventoryCycleCountComponent {
  searchText: string = '';
  selectedCountType!: string;
  selectedStore: Store[] | null = null;
  selectedOrigin: string = '';
  suggestions: Store[] = [];
  isLoading: boolean = false;
  showModal: boolean = false;
  titleModal: string = '';
  textModal: string = '';
  widthModal: string = '';
  showDetail: boolean = false;
  from: Date = new Date();
  to: Date = new Date();
  countTypeList: any[] = [
    { name: 'Conteo Cíclico', id: 'CYCLE_COUNT' },
    { name: 'Conteo Físico', id: 'PHYSICAL_COUNT' },
  ];
  searchFormEntityLabels = searchFormEntityLabels;
  inventoryCycleCountLabels = inventoryCycleCountLabels;
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
    this._optionServices.initState();
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
    this._report.state.inventory.cycleCount.list.data = [];
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
              (item) => item.url === '/inventories/cycle-count'
            )
          : this._common.state.historic.find(
              (item) =>
                item.index ===
                Number(this.route.snapshot.queryParamMap.get('index'))
            );
        if (report) {
          const selectedStore = this._common.state.stores.filter((item) =>
            report.searchCriteria.storeId.split(',').includes(item.storeInfoId)
          );
          const selectedCountType = this.countTypeList.find(
            (item) => item.id === report.searchCriteria.type
          );
          this.selectedStore = selectedStore || null;
          this.selectedCountType = selectedCountType.id || null;
          this.from = new Date(report.searchCriteria.startDate);
          this.to = new Date(report.searchCriteria.endDate);
          this.lastOptionsEntity.onSearch === false
            ? this._optionServices.setSearch()
            : null;
          this.handleSearch();
        }
      }
    });
  }

  handleFavorite() {
    this.isLoading = true;
    const data = {
      searchCriteria: {
        storeId: this.selectedStore?.map((item) => item.storeInfoId).join(','),
        type: this.selectedCountType,
        startDate: DateTime.fromJSDate(new Date(this.from)).toFormat(
          'yyyy-MM-dd'
        ),
        endDate: DateTime.fromJSDate(new Date(this.to)).toFormat('yyyy-MM-dd'),
      },
      url: '/inventories/cycle-count',
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
      complete: () => {},
    });
  }

  filterStores() {
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

    this.suggestions = storeList;
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
          reject();
        },
        complete: () => {
          resolve();
        },
      });
    });
  }
  getList() {
    this.isLoading = true;
    this._reportApi.inventoryCycleCount(this.filter).subscribe({
      next: (data) => {
        this._report.state.inventory.cycleCount.list = {
          data,
          total: data.length,
        };
        const dataOriginal = addIdToData(data);
        this._report.state.inventory.cycleCount.original = {
          data: dataOriginal,
          total: dataOriginal.length,
        };
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {
          FECHA_INICIAL: { type: 'date', format: 'dd-MM-yyyy' },
          FECHA_FINAL: { type: 'date', format: 'dd-MM-yyyy' },
          CANT_ITEMS: { type: 'number', format: 'currency' },
        });
        this._report.state.inventory.cycleCount.list = {
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

  async onSelectRange() {
    let diffDays = 0;
    if (this.from && this.to)
      diffDays = DateTime.fromJSDate(this.to)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .diff(
          DateTime.fromJSDate(this.from).set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
          }),
          'days'
        ).days;
    if (diffDays > 90) {
      await this.setErrorModal(
        'Error',
        'El rango supera el limite de 90 dias',
        '50px'
      );
    }
    if (diffDays < 0) {
      await this.setErrorModal(
        'Error',
        'La fecha final no puede ser menor a la fecha final',
        '50px'
      );
    }
  }

  async handleSearch() {
    console.error(this.selectedStore, this.selectedCountType);
    if (
      this.selectedStore === null ||
      typeof this.selectedStore !== 'object' ||
      this.selectedCountType === undefined
    ) {
      await this.setErrorModal(
        'Error',
        'Debe completar los datos del formulario de busqueda',
        '50px'
      );
      return;
    }
    this.filter = `?storeId=${this.selectedStore
      ?.map((item) => item.storeInfoId)
      .join(',')}&startDate=${DateTime.fromJSDate(new Date(this.from)).toFormat(
      'yyyy-MM-dd'
    )}&endDate=${DateTime.fromJSDate(new Date(this.to)).toFormat(
      'yyyy-MM-dd'
    )}&type=${this.selectedCountType}`;

    this.getList();
  }
  resetFilters() {
    this.selectedStore = null;
    this.selectedOrigin = '';
    this.filter = '';
  }

  handleSearchRecords() {
    const list = this._report.state.inventory.cycleCount.list.data;
    this._report.state.inventory.cycleCount.filter.data = list.filter((item) =>
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
    if (this._report.state.inventory.cycleCount.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list =
      this._report.state.inventory.cycleCount.filter.data.length > 0
        ? this._report.state.inventory.comparison.filter.data
        : this._report.state.inventory.cycleCount.list.data;
    const ids = list.map((item) => item[ID_DATA_NAME]);
    list = this._report.state.inventory.cycleCount.original.data.filter(
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
      ReportsExcelNames.CUMPLIMIENTO_CONTEOS_CICLICOS_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
