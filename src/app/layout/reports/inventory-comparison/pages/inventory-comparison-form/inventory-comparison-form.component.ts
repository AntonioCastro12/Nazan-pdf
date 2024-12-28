import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  InventoryComparisonApiService,
  InventoryComparisonStateService,
} from '../../services';
import {
  InventoryComparisonDTO,
  inventoryComparisonLabels,
} from '../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-comparison-form',
  templateUrl: './inventory-comparison-form.component.html',
  styleUrls: ['./inventory-comparison-form.component.scss'],
})
export class InventoryComparisonFormComponent {
  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Restaurar filtros',
    labelSave: 'Buscar',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    selectStore: 'Seleccionar tienda',
    title: 'Búsqueda por',
    placeholderProductId: 'Código de producto',
    placeholderOrigin: 'Seleccionar origen',
  };

  inventoryComparisonLabels = inventoryComparisonLabels;
  //originOptions = originOptions;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: any;
  results: any;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryComparison: InventoryComparisonStateService,
    public _inventoryComparisonApi: InventoryComparisonApiService,
    private _toastr: ToastrService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
  }

  ngOnInit(): void {
    this.onFillForm();
  }

  onFillForm() {
    this._inventoryComparison.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      productId: ['', [Validators.required], []],
      origin: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventoryComparison.state.form.controls;
  }
  onSubmit() {
    // this._inventoryComparison.state.isLoadingList = true;
    // let item: InventoryComparisonDTO = new InventoryComparisonDTO();
    // let formItems = this._inventoryComparison.state.form.value;
    // item = {
    //   storeId: formItems.storeId.id,
    //   productId: formItems.productId,
    //   origin: formItems.origin.value,
    //   startDate: formItems.startDate,
    //   endDate: formItems.endDate,
    // };
    // this._inventoryComparison.state.inventoryComparisonDTO = item;
    // this._inventoryComparisonApi
    //   .inventoryKardexProduct(this._inventoryComparison.state.inventoryComparisonDTO)
    //   .subscribe({
    //     next: (data) => {
    //       this._inventoryComparison.state.inventoryComparisonResponse = data;
    //     },
    //     error: (error) => {
    //       console.error(error);
    //     },
    //     complete: () => {
    //       this._inventoryComparison.state.isLoadingList = false;
    //     },
    //   });
  }

  onReset() {
    this.onFillForm();
  }

  filterCountry(event: any) {
    if (event.query == '') {
      this.results = this.storeList;
    } else {
      this.results = this.storeList.filter((item: any) =>
        objectContainsValue(item, event.query)
      );
    }
  }
}
