import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import {
  InventorySapXstoreApiService,
  InventorySapXstoreApstateService,
} from '../../services';
import { InventorySapXstoreDTO, inventorySapXstoreLabels } from '../../models';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'inventory-sap-xstore-form',
  templateUrl: './inventory-sap-xstore-form.component.html',
  styleUrls: ['./inventory-sap-xstore-form.component.scss'],
})
export class InventorySapXstoreFormComponent {
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

  inventorySapXstoreLabels = inventorySapXstoreLabels;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventorySapXstoreAp: InventorySapXstoreApstateService,
    public _inventorySapXstoreApi: InventorySapXstoreApiService,
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
    this._inventorySapXstoreAp.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventorySapXstoreAp.state.form.controls;
  }

  onSubmit() {
    this._inventorySapXstoreAp.state.isLoadingList = true;

    let item: InventorySapXstoreDTO = new InventorySapXstoreDTO();
    let formItems = this._inventorySapXstoreAp.state.form.value;

    const storesSelected = formItems.storeId
      .map((s: Store) => s.id)
      .join("','");

    item = {
      storeId: "'" + storesSelected + "'",
    };

    this._inventorySapXstoreAp.state.inventorySapXstoreDTO = item;

    this._inventorySapXstoreApi
      .inventorySapXstore(
        this._inventorySapXstoreAp.state.inventorySapXstoreDTO
      )
      .subscribe({
        next: (data) => {
          this._inventorySapXstoreAp.state.inventorySapXstoreResponse = data;
          this._inventorySapXstoreAp.state.inventorySapXstoreResponseList =
            data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._inventorySapXstoreAp.state.isLoadingList = false;
        },
      });
  }

  onReset() {
    this.onFillForm();
  }

  onFilterStores() {
    const filteredStores: Store[] = [];
    const stores: Store[] = [];
    const userRol = this.userSelected.privileges.reportesadministrativos;
    const userStore = this.userSelected.tienda;

    if (userRol.includes('staff-menudeo')) {
      const temp = this.storeList.filter(
        (x) => x.type === 'R' || x.type === 'K'
      );
      stores.push(...temp);
    }

    if (userRol.includes('staff-mayoreo')) {
      const temp = this.storeList.filter((x) => x.type === 'W');
      stores.push(...temp);
    }

    if (
      userRol.includes('sistemas') ||
      userRol.includes('staff-inventarios-ost')
    ) {
      stores.push(...this.storeList);
    }

    this.suggestions = stores;
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/inventories/sap-xstore'
        )
      : this._common.state.historic.find(
          (item) =>
            item.index ===
            Number(this.route.snapshot.queryParamMap.get('index'))
        );

    if (report) {
      let storeSelected = [];
      const stores = report.searchCriteria.storeId
        .replace(/["']/g, '')
        .split(',');

      for (const store of stores) {
        const temp = this.storeList.find((s) => s.id === store);
        if (temp !== undefined) storeSelected.push(temp);
      }

      this._inventorySapXstoreAp.state.form = this._formBuilder.group({
        storeId: [storeSelected],
      });

      this.onSubmit();
    }
  }
}
