import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { DateTime } from 'luxon';
import {
  SegmentAffiliatedKiponDTO,
  segmentAffiliatedKiponLabels,
} from '../../models';
import { objectContainsValue } from '@shared/functions';
import {
  SegmentAffiliatedKiponApiService,
  SegmentAffiliatedKiponStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'segment-affiliated-kipon-form',
  templateUrl: './segment-affiliated-kipon-form.component.html',
  styleUrls: ['./segment-affiliated-kipon-form.component.scss'],
})
export class SegmentAffiliatedKiponFormComponent {
  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Restaurar filtros',
    labelSave: 'Buscar',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    selectStore: 'Seleccionar tienda',
    title: 'Búsqueda por',
    placeholderProductId: 'Código de producto',
    placeholderOrigin: 'Seleccionar origen',
  };

  segmentAffiliatedKiponLabels = segmentAffiliatedKiponLabels;
  //originOptions = originOptions;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _segmentAffiliatedKipon: SegmentAffiliatedKiponStateService,
    public _segmentAffiliatedKiponApi: SegmentAffiliatedKiponApiService,
    private route: ActivatedRoute,
    public _common: CommonStateService,
    private _toastr: ToastrService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
    this.userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
  }

  ngOnInit(): void {
    this.onFillForm();

    if (
      this.route.snapshot.queryParamMap.get('favorite') ||
      this.route.snapshot.queryParamMap.get('historic')
    ) {
      this.onManageFav();
    }
  }

  onFillForm() {
    this._segmentAffiliatedKipon.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._segmentAffiliatedKipon.state.form.controls;
  }

  onSubmit() {
    this._segmentAffiliatedKipon.state.isLoadingList = true;
    let item: SegmentAffiliatedKiponDTO = new SegmentAffiliatedKiponDTO();
    let formItems = this._segmentAffiliatedKipon.state.form.value;
    const storesSelected = formItems.storeId
      .map((s: Store) => s.id)
      .join("','");

    item = {
      storeId: "'" + storesSelected + "'",
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._segmentAffiliatedKipon.state.segmentAffiliatedKiponDTO = item;

    this._segmentAffiliatedKiponApi
      .segmentAffiliatedKiponList(
        this._segmentAffiliatedKipon.state.segmentAffiliatedKiponDTO
      )
      .subscribe({
        next: (data) => {
          this._segmentAffiliatedKipon.state.segmentAffiliatedKiponResponse =
            data;
          this._segmentAffiliatedKipon.state.segmentAffiliatedKiponResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._segmentAffiliatedKipon.state.isLoadingList = false;
        },
      });
  }

  onReset() {
    this.onFillForm();
  }

  onFilterStores() {
    const filteredStores: Store[] = [];
    const storeList: Store[] = [];
    const userRol = this.userSelected.privileges.reportesadministrativos;
    const userStore = this.userSelected.tienda;
    const kiponStores = this.storeList.filter((x) => x.type === 'K');

    if (userRol.includes('tienda')) {
      const temp = kiponStores.filter((store) => store.id === userStore);
      storeList.push(...temp);
    }

    if (
      userRol.includes('sistemas') ||
      userRol.includes('staff-kipon') ||
      userRol.includes('staff-menudeo')
    ) {
      storeList.push(...kiponStores);
    }

    this.suggestions = storeList;
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/segments/affiliated-kipon'
        )
      : this._common.state.historic.find(
          (item) =>
            item.index ===
            Number(this.route.snapshot.queryParamMap.get('index'))
        );

    if (report) {
      let storeSelected = [];
      const stores = report.searchCriteria.storeId
        .replace(/["']/g, '')
        .split(',');

      for (const store of stores) {
        const temp = this.storeList.find((s) => s.id === store);
        if (temp !== undefined) storeSelected.push(temp);
      }

      this._segmentAffiliatedKipon.state.form = this._formBuilder.group({
        storeId: [storeSelected],
        startDate: report.searchCriteria.startDate,
        endDate: report.searchCriteria.endDate,
      });

      this.onSubmit();
    }
  }
}
