import { UntypedFormGroup } from '@angular/forms';
import { taGralDTO } from './ta-gral.dto';
import {
  taGralResponse
} from './ta-gral.response';

export class TaGralResumeState {


  //datos de credito recepcion
  taGralDTO:taGralDTO= new taGralDTO;
  taGralResponse: taGralResponse[]=[];

  currentStore!: string;
  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  isLoadingTicket: boolean = false;
  isVisibleModal: boolean = false;
}
