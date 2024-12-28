import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  PointProgramDetailWalletDTO,
  pointProgramDetailWalletLabels,
} from '../../models';
import {
  PointProgramDetailWalletApiService,
  PointProgramDetailWalletStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'point-program-detail-wallet-form',
  templateUrl: './point-program-detail-wallet-form.component.html',
  styleUrls: ['./point-program-detail-wallet-form.component.scss'],
})
export class PointProgramDetailWalletFormComponent {
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

  pointProgramDetailWalletLabels = pointProgramDetailWalletLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _pointProgramDetailWallet: PointProgramDetailWalletStateService,
    public _pointProgramDetailWalletApi: PointProgramDetailWalletApiService,
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
    this._pointProgramDetailWallet.state.form = this._formBuilder.group({
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._pointProgramDetailWallet.state.form.controls;
  }

  onSubmit() {
    this._pointProgramDetailWallet.state.isLoadingList = true;
    let item: PointProgramDetailWalletDTO = new PointProgramDetailWalletDTO();
    let formItems = this._pointProgramDetailWallet.state.form.value;
    item = {
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._pointProgramDetailWallet.state.pointProgramDetailWalletDTO = item;

    this._pointProgramDetailWalletApi
      .detailWalletList(
        this._pointProgramDetailWallet.state.pointProgramDetailWalletDTO
      )
      .subscribe({
        next: (data) => {
          console.log(data[0]);
          this._pointProgramDetailWallet.state.pointProgramDetailWalletResponse =
            data;
          this._pointProgramDetailWallet.state.pointProgramDetailWalletResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._pointProgramDetailWallet.state.isLoadingList = false;
        },
      });
  }

  onReset() {
    this.onFillForm();
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/point-program/detail-wallet'
        )
      : this._common.state.historic.find(
          (item) =>
            item.index ===
            Number(this.route.snapshot.queryParamMap.get('index'))
        );

    if (report) {
      this._pointProgramDetailWallet.state.form = this._formBuilder.group({
        startDate: report.searchCriteria.startDate,
        endDate: report.searchCriteria.endDate,
      });

      this.onSubmit();
    }
  }
}
