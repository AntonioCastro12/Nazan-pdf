import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportApiService } from '../../services/report-api.service';
import { ReportStateService } from '../../services/report-state.service';
import { ExcelService } from '../../services/excel.service';
import { OptionsStateService } from 'src/app/shared/components/options/models/options-state.service';
import { CommonStateService } from '../../services/common-state.service';
import { searchFormEntityLabels } from '../../models/search-form-entity';
import {
  ReportsExcelNames,
  segmentCollaboratorsNazanLabels,
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
import { CommonApiService } from '../../services/common-api.service';
import { Store } from '../../models/store.model';
import { TemplateStateService } from 'src/app/template';

@Component({
  selector: 'app-report-segment-collaborators-nazan',
  templateUrl: './report-segment-collaborators-nazan.component.html',
  styleUrls: ['./report-segment-collaborators-nazan.component.scss'],
  providers: [HttpClient],
})
export class ReportSegmentCollaboratorsNazan {
  selectedStore: Store | null = null;
  suggestions: Store[] = [];
  selectedOrigin: string = '';
  searchText: string = '';
  segmentId: number = 165;
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
  segmentCollaboratorsNazanLabels = segmentCollaboratorsNazanLabels;
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
    public _report: ReportStateService,
    private _commonApi: CommonApiService,
    public _common: CommonStateService,
    public _excelService: ExcelService,
    public _auth: AuthStateService,
    private route: ActivatedRoute,
    public _template: TemplateStateService
  ) {
    // this._auth.loadUserInfo();
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
    this._report.state.segments.collaboratorsNazan.list.data = [];
    this.getList();
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
              (item) => item.url === '/segments/collaborators-nazan'
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
          this.segmentId = report.searchCriteria.segmentId;
          this.segmentId = report.searchCriteria.segmentId;
          this._optionServices.setSearch();
          this.handleSearch();
        }
      }
    });
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

  handleFavorite() {
    this.isLoading = true;
    const data = {
      searchCriteria: {
        segmentId: this.segmentId,
        storeId: this.selectedStore?.storeInfoId,
      },
      url: '/segments/collaborators-nazan',
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

  getList() {
    this._report.state.segments.collaboratorsNazan.list.data = [];
    this.isLoading = true;
    this._reportApi.segmentsCollaboratorsNazan(this.filter).subscribe({
      next: (data) => {
        const dataOriginal = addIdToData(data);
        this._report.state.segments.collaboratorsNazan.original = {
          data: dataOriginal,
          total: dataOriginal.length,
        };
        let dataFormatted = dataOriginal.map((obj: any) => ({ ...obj }));
        dataFormatted = formatArrayValues(dataFormatted, {
          signup_date: { type: 'date', format: 'dd-MM-yyyy' },
          birthday: { type: 'date', format: 'dd-MM-yyyy' },
        });
        this._report.state.segments.collaboratorsNazan.list = {
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
      this.segmentId === 0
    ) {
      await this.setErrorModal(
        'Error',
        'Debe completar los datos del formulario de busqueda',
        '50px'
      );
      return;
    }
    this.filter = `?storeId=${this.selectedStore?.storeInfoId}&segmentId=${
      this.segmentId ? this.segmentId : ''
    }`;
    this.getList();
  }
  resetFilters() {
    this.segmentId = 0;
    this.filter = '';
  }

  async handleSearchRecords() {
    if (this.segmentId === 0) {
      await this.setErrorModal(
        'Error',
        'Debe completar los datos del formulario de busqueda',
        '50px'
      );
      return;
    }
    const list = this._report.state.segments.collaboratorsNazan.list.data;
    this._report.state.segments.collaboratorsNazan.filter.data = list.filter(
      (item) => objectContainsValue(item, this.searchText)
    );
  }

  async setErrorModal(title: string, text: string, width: string) {
    this.titleModal = title;
    this.textModal = text;
    this.widthModal = width;
    this.showModal = true;
  }

  async exportExcel() {
    if (this._report.state.segments.collaboratorsNazan.list.data.length <= 0) {
      await this.setErrorModal('Error', 'No hay datos a exportar', '50px');
      return;
    }
    let list =
      this._report.state.segments.collaboratorsNazan.filter.data.length > 0
        ? this._report.state.segments.collaboratorsNazan.filter.data
        : this._report.state.segments.collaboratorsNazan.list.data;
    const ids = list.map((item) => item[ID_DATA_NAME]);
    list = this._report.state.segments.collaboratorsNazan.original.data.filter(
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
      ReportsExcelNames.SEGMENTOS_COLABORADORES_NAZAN_
    }${DateTime.local().toFormat('yyyy-MM-dd_HH_mm_ss')}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
