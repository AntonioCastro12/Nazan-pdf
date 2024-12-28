import { Component } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';

import { DateTime } from 'luxon';

import {
  CalcApiService,
  CalcStateService,
} from '../../services';

import { predeterminadoDTO, personalizadoDTO } from '../../models';
import { objectContainsValue } from '@shared/functions';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@report-manager/models';
import { UserEntity } from '@user-manager/models';
import { ActivatedRoute } from '@angular/router';
import { CommonStateService } from '@report-manager/services';
import { labelsListFavorites } from '../../../../../../../samples/layout-manager/models/bookmarks.model';

@Component({
  selector: 'calc-inc-forms',
  templateUrl: './calc-inc-forms.component.html',
  styleUrl: './calc-inc-forms.component.scss'
})
export class CalcIncFormsComponent {
  value = "";

  selectedCategory: any = null;
  formGroup: FormGroup | undefined | any;
  checked: boolean = true;
  today = DateTime.now().toFormat('yyyy-LL-dd');
  storeList: Store[];
  suggestions: Store[] = [];
  userSelected: UserEntity;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _taGralStateService: CalcStateService,
    public _taServiceApi: CalcApiService,
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
    this.getCatalogos();
  }

  veDatos(dato:any){
    console.log(dato)
  }

  TEMPLATE_TXT = {
    labelReturn: 'Volver a usuarios',
    labelReset: 'Restaurar filtros',
    labelSave: 'Calcular',
    labelCancel: 'Cancelar',
    tooltipCancel: 'Cancelar',
    required: 'Este campo es obligatorio',
    selectStore: 'Seleccionar tienda',
    title: 'Búsqueda por',
    placeholderProductId: 'Código de producto',
    placeholderOrigin: 'Seleccionar origen',
  };

  getCatalogos() {
    this._taGralStateService.state.isLoadingCatalogues = true;
    this._taServiceApi.catActuales().subscribe(

      {
        next: (data: any) => {
          this._taGralStateService.state.catActuales = data.resume;
        },
        error: (error: { erros: { message: string | undefined; }; }) => {
          this._toastr.error('Opps ha ocurrido un error', error.erros.message);
          console.error(error);
          this._taGralStateService.state.isLoadingCatalogues = false;
        },
        complete: () => {
          this._taGralStateService.state.isLoadingCatalogues = false;
        },

      }
    );
  }

  onFillForm() {
    this._taGralStateService.state.form = this._formBuilder.group({
      catalogos: '',
      incPred: '',
      incPers: '',
      gralbase: '',
      gralsocio: '',
      DNBase: '',
      DNSocio: '',
      DIBase: '',
      DISocio: ''

    });

  }

  get fg(): { [key: string]: AbstractControl } {
    return this._taGralStateService.state.form.controls;
  }



  transformData(data: any[]): any[] {
    const mapping = {
      '10': 'Diez',
      '20': 'Veinte',
      '30': 'Treinta',
      '40': 'Cuarenta',
      '50': 'Cincuenta',
      '60': 'Sesenta',
      '70': 'Setenta'
    };

    return data.map(obj => {
      for (const [key, value] of Object.entries(mapping)) {
        if (obj.hasOwnProperty(key)) {
          obj[value] = obj[key];
          delete obj[key];
        }
      }
      return obj;
    });
  }


  socioSubmit() {
    this._taGralStateService.state.personalizadoResponse = [];
    this._taGralStateService.state.predeterminadoResponse = [];
    this._taGralStateService.state.isLoadingList = true;

    let formItems = this._taGralStateService.state.form.value;
    console.log('ESTOS SON LOS ITEMS')
    console.log(formItems)
    const cadenacat = formItems.catalogos.join(',');

    switch (this._taGralStateService.state.tipoCalculo) {
        case 1: // Cálculo Predeterminado
            formItems.incPred.forEach((descuento: any) => {
                this._taGralStateService.state.headerPredeterminado.push(descuento);
            });

            let preItems: predeterminadoDTO = new predeterminadoDTO();
            let especial = 0;

            for (let i = 0; i < formItems.incPred.length; i++) {
              if (formItems.incPred[i] === "NI") {
                console.log('ENCONTRO NI');
                especial = 1;
                formItems.incPred.splice(i, 1, 50, 30);
                i += 1;
              }
            }

            let cadenaNumeros = formItems.incPred.map((num: any) => `[${num}]`).join(',');

            preItems = {
                catalogos: cadenacat,
                incremento: cadenaNumeros,
                cEspecial: especial
            };

            console.log("Enviando datos a calcPredeterminado:", preItems);

            this._taServiceApi.calcPredeterminado(preItems).subscribe({
                next: (data: any) => {
                    console.log("Respuesta recibida de calcPredeterminado:", data);
                    this._taGralStateService.state.predeterminadoResponse = data;

                    this.transformData(data);
                },
                error: (error: any) => {
                    console.error("Error en calcPredeterminado:", error);
                    this._toastr.error('Opps ha ocurrido un error', error.erros?.message || "Error desconocido");
                },
                complete: () => {
                    this._taGralStateService.state.isLoadingList = false;
                }
            });
            break;

        case 2: 
            let perGralItem: personalizadoDTO = new personalizadoDTO();
            perGralItem = {
                catalogos: cadenacat,
                base: formItems.gralbase,
                socio: formItems.gralsocio,
                incremento: 0,
                baseI: '0',
                socioI: '0'
            };

            console.log("Enviando datos a calcPerzonalizado (General):", perGralItem);

            this._taServiceApi.calcPerzonalizado(perGralItem).subscribe({
                next: (data: any) => {
                  console.log("Respuesta recibida de calcPerzonalizado (General):", data);
                  const gralBasePercentage = formItems.gralbase;
                  const gralSocioPercentage = formItems.gralsocio;

                  if (Array.isArray(data)) {
                      data.forEach((item, index) => {
                          if (item && item.PRICE !== undefined) {
                              const updatedPrice = item.PRICE * (1 + gralBasePercentage / 100) * (1 + gralSocioPercentage / 100);
                              item.PRECIO_CALCULADO = Math.ceil(updatedPrice);
                          } else {
                              console.warn(`Precio no encontrado o inválido en el índice ${index}:`, item);
                          }
                      });
                  } else if (data && data.PRICE !== undefined) {
                      const updatedPrice = data.PRICE * (1 + gralBasePercentage / 100) * (1 + gralSocioPercentage / 100);
                      data.PRECIO_CALCULADO = Math.ceil(updatedPrice);
                  } else {
                      console.warn("Precio no encontrado en data o inválido:", data);
                  }

                  this._taGralStateService.state.personalizadoResponse = data;
              },
                error: (error: any) => {
                    console.error("Error en calcPerzonalizado (General):", error);
                    this._toastr.error('Opps ha ocurrido un error', error.erros?.message || "Error desconocido");
                },
                complete: () => {
                    this._taGralStateService.state.isLoadingList = false;
                }
            });
            break;

        case 3:
            let perDifItem: personalizadoDTO = new personalizadoDTO();
            perDifItem = {
                catalogos: cadenacat,
                incremento: 1,
                baseI: formItems.DIBase,
                socioI: formItems.DISocio,
                base: formItems.DNBase,
                socio: formItems.DNSocio
            };

            console.log("Enviando datos a calcPerzonalizado (Diferenciado):", perDifItem);

            this._taServiceApi.calcPerzonalizado(perDifItem).subscribe({
                next: (data: any) => {
                  console.log("Respuesta recibida de calcPerzonalizado (Diferenciado):", data);

                  const baseI = formItems.DIBase;
                  const socioI = formItems.DISocio;
                  const baseN = formItems.DNBase;
                  const socioN = formItems.DNSocio;

                  if (Array.isArray(data)) {
                      data.forEach((item, index) => {
                          if (item && item.PRICE !== undefined) {
                              let updatedPrice = item.PRICE;
                                  updatedPrice = updatedPrice * (1 + baseN / 100) * (1 + socioN / 100);
                              item.PRECIO_CALCULADO = Math.ceil(updatedPrice);

                          } else {
                              console.warn(`Precio no encontrado o inválido en el índice ${index}:`, item);
                          }
                      });
                  } else {
                      console.warn("La respuesta no es un array:", data);
                  }

                  this._taGralStateService.state.personalizadoResponse = data;
              },
                error: (error: any) => {
                    console.error("Error en calcPerzonalizado (Diferenciado):", error);
                    this._toastr.error('Opps ha ocurrido un error', error.erros?.message || "Error desconocido");
                },
                complete: () => {
                    this._taGralStateService.state.isLoadingList = false;
                }
            });
            break;

        default:
            console.warn("Tipo de cálculo no definido:", this._taGralStateService.state.tipoCalculo);
            break;
    }
}


  onReset() {
    this.onFillForm();
  }


  predeterminado() {
    this._taGralStateService.state.tipoCalculo = 1
    this._taGralStateService.state.predeterminado = true;
  }
  personalizado() {
    this._taGralStateService.state.tipoCalculo = 2
    this._taGralStateService.state.predeterminado = false;
  }
  general() {
    this._taGralStateService.state.tipoCalculo = 2
    this._taGralStateService.state.PersonalizadoGral = true;
  }
  diferenciado() {
    this._taGralStateService.state.tipoCalculo = 3
    this._taGralStateService.state.PersonalizadoGral = false;
  }


}

