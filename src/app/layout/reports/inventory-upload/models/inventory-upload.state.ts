import { UntypedFormGroup } from '@angular/forms';

export class InventoryUploadState {
  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
}
