import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { objectContainsValue } from '@shared/functions';
import { DateTime } from 'luxon';
import { InventoryPodDTO, inventoryPodLabels } from '../../models';
import {
  InventoryPodApiService,
  InventoryPodStateService,
} from '../../services';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'inventory-pod-form',
  templateUrl: './inventory-pod-form.component.html',
  styleUrls: ['./inventory-pod-form.component.scss'],
})
export class InventoryPodFormComponent {
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

  inventoryPodLabels = inventoryPodLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryPod: InventoryPodStateService,
    public _inventoryPodApi: InventoryPodApiService,
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
    this._inventoryPod.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
      days: [30, [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventoryPod.state.form.controls;
  }
  onSubmit() {
    this._inventoryPod.state.isLoadingList = true;
    let item: InventoryPodDTO = new InventoryPodDTO();
    let formItems = this._inventoryPod.state.form.value;

    const storesSelected = formItems.storeId
      .map((s: Store) => s.id)
      .join("','");

    item = {
      storeId: "'" + storesSelected + "'",
      days: formItems.days,
    };

    this._inventoryPod.state.inventoryPodDTO = item;

    this._inventoryPodApi
      .inventoryPod(this._inventoryPod.state.inventoryPodDTO)
      .subscribe({
        next: (data) => {
          this._inventoryPod.state.inventoryPodResponse = data;
          this._inventoryPod.state.inventoryPodResponseList = data;
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._inventoryPod.state.isLoadingList = false;
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

    if (userRol.includes('sistemas') || userRol.includes('staff-planeacion')) {
      stores.push(...this.storeList);
    }

    this.suggestions = stores;
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/inventories/pod'
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

      this._inventoryPod.state.form = this._formBuilder.group({
        storeId: [storeSelected],
        days: report.searchCriteria.days,
      });

      this.onSubmit();
    }
  }
}
