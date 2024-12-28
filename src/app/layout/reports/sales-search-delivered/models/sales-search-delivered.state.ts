import { UntypedFormGroup } from '@angular/forms';
import { SalesSearchDeliveredDTO } from './sales-search-delivered.dto';
import { SalesSearchDeliveredResponse } from './sales-search-delivered.response';

export class SalesSearchDeliveredState {
  SalesSearchDeliveredDTO: SalesSearchDeliveredDTO =
    new SalesSearchDeliveredDTO();
  SalesSearchDeliveredResponse: SalesSearchDeliveredResponse[] = [];
  SalesSearchDeliveredResponseReceived: SalesSearchDeliveredResponse[] = [];
  SalesSearchDeliveredResponseOnTheWay: SalesSearchDeliveredResponse[] = [];

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
