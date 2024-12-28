import { UntypedFormGroup } from '@angular/forms';
import { SalesGeneralSalesDTO } from './sales-general-sales.dto';
import {
  SalesGeneralPaymentResponse,
  SalesGeneralSalesResponse,
} from './sales-general-sales.response';

export class SalesGeneralSalesState {
  salesGeneralSalesDTO: SalesGeneralSalesDTO = new SalesGeneralSalesDTO();
  salesGeneralSalesResponse: SalesGeneralSalesResponse[] = [];
  salesGeneralSalesResponseSalesList: SalesGeneralSalesResponse[] = [];
  salesGeneralSalesResponsePayFormsList: SalesGeneralPaymentResponse[] = [];

  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
  // searchText: string = '';
  // selectedStatus!: string;
  // selectedStore: Store | null = null;
  // selectedOrigin: string = '';
  // suggestions: Store[] = [];
  // isLoading: boolean = false;
  // showModal: boolean = false;
  // titleModal: string = '';
  // textModal: string = '';
  // widthModal: string = '';
  // showDetail: boolean = false;
  // originList: any[] = [
  //   { name: 'xStore', id: 'xstore' },
  //   { name: 'xCenter', id: 'xcenter' },
  // ];
  // searchFormEntityLabels = searchFormEntityLabels;
  // inventoryKardexLabels = inventoryKardexLabels;
  // productCode: string = '';
  // from: Date = new Date();
  // to: Date = new Date();
  // filter: string = '';
  // subscription: any = {};
  // optionsState: any = {};
  // highlightSearchText = highlightSearchText;
  // lastOptionsEntity: OptionsEntity = {
  //   onChart: false,
  //   onDownload: false,
  //   onRefresh: false,
  //   onSearch: false,
  //   onShow: false,
  //   onFavorite: false,
  // };
}
