import { Component } from '@angular/core';
import {
  TaDetApiService,
  TaDetStateService,
} from '../../services';
import {TaDetResume} from '../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ta-det-list',
  templateUrl: './ta-det-list.component.html',
  styleUrl: './ta-det-list.component.scss'
})
export class TaDetListComponent {

  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  taDetResume = TaDetResume;


  searchText = '';
  isLoading: boolean = false;
  visible: boolean = false;
  ticketSelected: string = '';

  constructor(
    public _taDetState: TaDetStateService,
    public _taDetApi: TaDetApiService,
    private _toastr: ToastrService
  ) { }


}
