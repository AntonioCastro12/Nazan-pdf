import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  KardexProductDTO,
  kardexProductDTOname,
  originOptions,
} from '../../models';
import { InventoryKardexStateService } from '../../services';
import { InventoryKardexApiService } from '../../services/inventory-kardex-api.service';
import { DateTime } from 'luxon';
import { objectContainsValue } from '@shared/functions';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-kardex-form',
  templateUrl: './inventory-kardex-form.component.html',
  styleUrls: ['./inventory-kardex-form.component.scss'],
})
export class InventoryKardexFormComponent implements OnInit {
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

  kardexProductDTOname = kardexProductDTOname;
  originOptions = originOptions;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryKardex: InventoryKardexStateService,
    public _inventoryKardexApi: InventoryKardexApiService,
    private route: ActivatedRoute,
    public _common: CommonStateService,
    private _toastr: ToastrService
  ) {
    this.storeList = JSON.parse(sessionStorage.getItem('storeList') as string);
    this.userSelected = JSON.parse(
      sessionStorage.getItem('userSelected') as string
    );
  }

  ngOnInit(): void {
    this.onFillForm();

    if (
      this.route.snapshot.queryParamMap.get('favorite') ||
      this.route.snapshot.queryParamMap.get('historic')
    ) {
      this.onManageFav();
    }
  }

  onFillForm() {
    this._inventoryKardex.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      productId: ['', [Validators.required], []],
      origin: ['', [Validators.required], []],
      startDate: [this.today, [Validators.required], []],
      endDate: [this.today, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventoryKardex.state.form.controls;
  }

  onSubmit() {
    this._inventoryKardex.state.isLoadingList = true;
    let item: KardexProductDTO = new KardexProductDTO();
    let formItems = this._inventoryKardex.state.form.value;
    item = {
      storeId: formItems.storeId.id,
      productId: formItems.productId,
      origin: formItems.origin.value,
      startDate: formItems.startDate,
      endDate: formItems.endDate,
    };
    this._inventoryKardex.state.kardexProductDTO = item;

    this._inventoryKardexApi
      .inventoryKardexProduct(this._inventoryKardex.state.kardexProductDTO)
      .subscribe({
        next: (data) => {
          this._inventoryKardex.state.kardexProductResponse = data;
          this._inventoryKardex.state.kardexProductResponseList = data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._inventoryKardex.state.isLoadingList = false;
        },
      });
  }

  onReset() {
    this.onFillForm();
  }

  onFilterStores(event: { query: string }) {
    const filteredStores: Store[] = [];
    const stores: Store[] = [];
    const userRol = this.userSelected.privileges.reportesadministrativos;
    const userStore = this.userSelected.tienda;

    if (userRol.includes('tienda')) {
      const temp = this.storeList.filter((store) => store.id === userStore);
      stores.push(...temp);
    }
    if (userRol.includes('staff-menudeo')) {
      const temp = this.storeList.filter((store) => store.type === 'R');
      stores.push(...temp);
    }
    if (userRol.includes('staff-mayoreo')) {
      const temp = this.storeList.filter((store) => store.type === 'W');
      stores.push(...temp);
    }

    if (
      userRol.includes('sistemas') ||
      userRol.includes('staff-inventarios-ost')
    ) {
      stores.push(...this.storeList);
    }

    for (const store of stores) {
      if (store.name.toLowerCase().includes(event.query.toLowerCase())) {
        filteredStores.push(store);
      }
    }
    this.suggestions = filteredStores;
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/inventories/kardex-product'
        )
      : this._common.state.historic.find(
          (item) =>
            item.index ===
            Number(this.route.snapshot.queryParamMap.get('index'))
        );

    if (report) {
      const selectedStore = this.storeList.find(
        (item) => item.id === report.searchCriteria.storeId
      );

      const originSelect = originOptions.filter(
        (o) => o.value === report.searchCriteria.origin
      );

      this._inventoryKardex.state.form = this._formBuilder.group({
        storeId: selectedStore,
        productId: report.searchCriteria.productId,
        origin: originSelect[0],
        startDate: report.searchCriteria.startDate,
        endDate: report.searchCriteria.endDate,
      });

      this.onSubmit();
    }
  }
}
