import { Component } from '@angular/core';
import {
  CalcApiService,
  CalcStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'calc-inc-list',
  templateUrl: './calc-inc-list.component.html',
  styleUrl: './calc-inc-list.component.scss'
})
export class CalcIncListComponent {

  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };


  searchText = '';
  isLoading: boolean = false;
  visible: boolean = false;
  ticketSelected: string = '';

  constructor(
    public _taGralState: CalcStateService,
    public _taGralApi: CalcApiService,
    private _toastr: ToastrService
  ) { }

}
