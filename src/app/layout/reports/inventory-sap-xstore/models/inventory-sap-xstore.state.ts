import { UntypedFormGroup } from '@angular/forms';
import { InventorySapXstoreDTO } from './inventory-sap-xstore.dto';
import { InventorySapXstoreResponse } from './inventory-sap-xstore.response';

export class InventorySapXstoreState {
  inventorySapXstoreDTO: InventorySapXstoreDTO = new InventorySapXstoreDTO();
  inventorySapXstoreResponse: InventorySapXstoreResponse[] = [];
  inventorySapXstoreResponseList: InventorySapXstoreResponse[] = [];

  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
}
