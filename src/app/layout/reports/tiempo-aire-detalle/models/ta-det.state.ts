import { UntypedFormGroup } from '@angular/forms';
import { taDetDTO } from './ta-det.dto';
import { airTimeDetailResonpse
} from './ta-det.response';

export class TaDetResumeState {


  //datos de credito recepcion
  taDetDTO:taDetDTO= new taDetDTO;
  taDetResponse: airTimeDetailResonpse[]=[];

  currentStore!: string;
  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  isLoadingTicket: boolean = false;
  isVisibleModal: boolean = false;
}
