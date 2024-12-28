import { UntypedFormGroup } from '@angular/forms';
import { InventoryStockResumeDTO, creditoSocioDTO } from './memberhsip-credit-resume.dto';
import {
  CustomerInformationResponse,
  AccountInformationResponse,
  TransactionsHistoryResponse,
  TicketResumeItemResponse,
  TicketResumeTndrResponse,
  AccountAutResponse
} from './memberhsip-credit.response';

export class InventoryStockResumeState {


  //datos de credito recepcion
  creditoSocioDTO:creditoSocioDTO= new creditoSocioDTO;
  customerInformationResponse: CustomerInformationResponse [] = [ ];
  accountInformation: AccountInformationResponse [] = []
  transactionsHistoryResponse: TransactionsHistoryResponse [] = []
  memberAut: AccountAutResponse [] = [];

  //ticket detail response
  ticketResumeItemResponse: TicketResumeItemResponse [] = [];
  ticketResumeTndrResponse: TicketResumeTndrResponse [] = [];


  currentStore!: string;
  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  isLoadingTicket: boolean = false;
  isVisibleModal: boolean = false;
}
