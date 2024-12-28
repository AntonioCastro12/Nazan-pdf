import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  SegmentCollaboratorsNazanDTO,
  segmentCollaboratorsNazanLabels,
} from '../../models';
import {
  SegmentCollaboratorsNazanApiService,
  SegmentCollaboratorsNazanStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'segment-collaborators-nazan-form',
  templateUrl: './segment-collaborators-nazan-form.component.html',
  styleUrls: ['./segment-collaborators-nazan-form.component.scss'],
})
export class SegmentCollaboratorsNazanFormComponent {
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

  segmentCollaboratorsNazanLabels = segmentCollaboratorsNazanLabels;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _segmentCollaboratorsNazan: SegmentCollaboratorsNazanStateService,
    public _segmentCollaboratorsNazanApi: SegmentCollaboratorsNazanApiService,
    private _toastr: ToastrService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  onFillForm() {
    this._segmentCollaboratorsNazan.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._segmentCollaboratorsNazan.state.form.controls;
  }
  onSubmit() {
    this._segmentCollaboratorsNazan.state.isLoadingList = true;

    this._segmentCollaboratorsNazanApi.SegmentCollaboratorsList().subscribe({
      next: (data) => {
        this._segmentCollaboratorsNazan.state.segmentCollaboratorsNazanResponse =
          data;
        this._segmentCollaboratorsNazan.state.segmentCollaboratorsNazanResponseList =
          data;
      },
      error: (error) => {
        console.error(error);
        this._toastr.error('Opps ha ocurrido un error', error.erros.message);
      },
      complete: () => {
        this._segmentCollaboratorsNazan.state.isLoadingList = false;
      },
    });
  }

  onReset() {
    this.onFillForm();
  }
}
