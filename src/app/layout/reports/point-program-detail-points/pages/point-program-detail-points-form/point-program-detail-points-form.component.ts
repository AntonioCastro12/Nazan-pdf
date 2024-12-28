import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  PointProgramDetailPointsDTO,
  pointProgramDetailPointsLabels,
} from '../../models';
import {
  PointProgramDetailPointsApiService,
  PointProgramDetailPointsStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';

@Component({
  selector: 'point-program-detail-points-form',
  templateUrl: './point-program-detail-points-form.component.html',
  styleUrls: ['./point-program-detail-points-form.component.scss'],
})
export class PointProgramDetailPointsFormComponent {
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

  pointProgramDetailPointsLabels = pointProgramDetailPointsLabels;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _pointProgramDetailPoints: PointProgramDetailPointsStateService,
    public _pointProgramDetailPointsApi: PointProgramDetailPointsApiService,
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
    this._pointProgramDetailPoints.state.form = this._formBuilder.group({
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._pointProgramDetailPoints.state.form.controls;
  }

  onSubmit() {
    this._pointProgramDetailPoints.state.isLoadingList = true;
    let item: PointProgramDetailPointsDTO = new PointProgramDetailPointsDTO();
    let formItems = this._pointProgramDetailPoints.state.form.value;
    item = {
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._pointProgramDetailPoints.state.pointProgramDetailPointsDTO = item;

    this._pointProgramDetailPointsApi
      .detailPointsList(
        this._pointProgramDetailPoints.state.pointProgramDetailPointsDTO
      )
      .subscribe({
        next: (data) => {
          console.log(data[0].NOM_CORTO);
          this._pointProgramDetailPoints.state.pointProgramDetailPointsResponse =
            data;
          this._pointProgramDetailPoints.state.pointProgramDetailPointsResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._pointProgramDetailPoints.state.isLoadingList = false;
        },
      });
  }

  onReset() {
    this.onFillForm();
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/point-program/detail-points'
        )
      : this._common.state.historic.find(
          (item) =>
            item.index ===
            Number(this.route.snapshot.queryParamMap.get('index'))
        );

    if (report) {
      this._pointProgramDetailPoints.state.form = this._formBuilder.group({
        startDate: report.searchCriteria.startDate,
        endDate: report.searchCriteria.endDate,
      });

      this.onSubmit();
    }
  }
}
