import { Component } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { DateTime } from 'luxon';
import {
  InventoryStockResumeDTO,
  inventoryStockResumeLabels,
} from '../../models';
import {
  InventoryStockResumeApiService,
  InventoryStockResumeStateService,
} from '../../services';
import { objectContainsValue } from '@shared/functions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';

@Component({
  selector: 'inventory-stock-resume-form',
  templateUrl: './inventory-stock-resume-form.component.html',
  styleUrls: ['./inventory-stock-resume-form.component.scss'],
})
export class InventoryStockResumeFormComponent {
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

  inventoryStockResumeLabels = inventoryStockResumeLabels;

  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _inventoryStockResume: InventoryStockResumeStateService,
    public _inventoryStockResumeApi: InventoryStockResumeApiService,
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
    this._inventoryStockResume.state.form = this._formBuilder.group({
      storeId: ['', [Validators.required], []],
    });
  }

  get fg(): { [key: string]: AbstractControl } {
    return this._inventoryStockResume.state.form.controls;
  }

  onSubmit() {
    this._inventoryStockResume.state.isLoadingList = true;
    let item: InventoryStockResumeDTO = new InventoryStockResumeDTO();
    let formItems = this._inventoryStockResume.state.form.value;
    item = {
      storeId: formItems.storeId.id,
    };
    this._inventoryStockResume.state.inventoryStockResumeDTO = item;

    this._inventoryStockResumeApi
      .inventoryStockResume(
        this._inventoryStockResume.state.inventoryStockResumeDTO
      )
      .subscribe({
        next: (data) => {
          this._inventoryStockResume.state.inventoryStockResumeResponse = data;
          this._inventoryStockResume.state.inventoryStockResumeResponseList =
            data;

          console.log("Datos enviados en api: ",this._inventoryStockResume.state.inventoryStockResumeDTO);
        },
        error: (error) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
        },
        complete: () => {
          this._inventoryStockResume.state.isLoadingList = false;
        },
      });
  }

  onReset() {
    this.onFillForm();
  }

  filterStores(event: { query: string }) {
    const filteredStores: Store[] = [];
    const storeList: Store[] = [];
    const userRol = this.userSelected.privileges.reportesadministrativos;
    const userStore = this.userSelected.tienda;

    if (userRol.includes('tienda')) {
      const temp = this.storeList.filter((store) => store.id === userStore);
      storeList.push(...temp);
    }

    if (userRol.includes('staff-menudeo')) {
      const temp = this.storeList.filter((x) => x.type === 'R');
      storeList.push(...temp);
    }

    if (userRol.includes('staff-mayoreo')) {
      const temp = this.storeList.filter((x) => x.type === 'W');
      storeList.push(...temp);
    }

    if (
      userRol.includes('sistemas') ||
      userRol.includes('staff-inventarios-ost') ||
      userRol.includes('staff-planeacion')
    ) {
      storeList.push(...this.storeList);
    }

    for (const store of storeList) {
      if (store.name.toLowerCase().includes(event.query.toLowerCase())) {
        filteredStores.push(store);
      }
    }
    this.suggestions = filteredStores;
  }

  onManageFav() {
    const report: any = this.route.snapshot.queryParamMap.get('favorite')
      ? this._common.state.favorites.find(
          (item) => item.url === '/inventories/inventory-stock/resume'
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

      this._inventoryStockResume.state.form = this._formBuilder.group({
        storeId: selectedStore,
      });

      this.onSubmit();
    }
  }
}
