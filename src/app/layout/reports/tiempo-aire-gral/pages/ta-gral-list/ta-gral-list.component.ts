import { Component } from '@angular/core';
import {
  TaGralApiService,
  TaGralStateService,
} from '../../services';
import {TaGralResume} from '../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ta-gral-list',
  templateUrl: './ta-gral-list.component.html',
  styleUrl: './ta-gral-list.component.scss'
})
export class TaGralListComponent {

  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  taGralResume = TaGralResume;


  searchText = '';
  isLoading: boolean = false;
  visible: boolean = false;
  ticketSelected: string = '';

  constructor(
    public _taGralState: TaGralStateService,
    public _taGralApi: TaGralApiService,
    private _toastr: ToastrService
  ) { }


}
