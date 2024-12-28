import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToggleButtonModule } from 'primeng/togglebutton';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ListboxModule } from 'primeng/listbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { SpeedDialModule } from 'primeng/speeddial';
import { CheckboxModule } from 'primeng/checkbox';
import { PrimeNGConfig } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { ErrorMessageComponent } from './pages/error-message';

// import { PrettyPrintPipe } from './pipes/preatty-json.pipe';

const primeModules = [
  ConfirmPopupModule,
  SpeedDialModule,
  TabViewModule,
  SplitButtonModule,
  InputSwitchModule,
  ToggleButtonModule,
  RippleModule,
  PanelModule,
  DataViewModule,
  PanelMenuModule,
  InputTextModule,
  ChartModule,
  ButtonModule,
  ToolbarModule,
  SidebarModule,
  TableModule,
  ToastModule,
  TableModule,
  CalendarModule,
  SliderModule,
  DialogModule,
  MultiSelectModule,
  ContextMenuModule,
  DropdownModule,
  ButtonModule,
  InputTextModule,
  ProgressBarModule,
  TooltipModule,
  FileUploadModule,
  ToolbarModule,
  RatingModule,
  RadioButtonModule,
  InputNumberModule,
  ConfirmDialogModule,
  InputTextareaModule,
  InputMaskModule,
  AutoCompleteModule,
  ImageModule,
  AccordionModule,
  MenuModule,
  ColorPickerModule,
  ListboxModule,
  DividerModule,
  CardModule,
  CheckboxModule,
  ProgressSpinnerModule,
];

// const components = [ErrorMessageComponent, PrettyPrintPipe];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...primeModules],
  exports: [...primeModules],
})
export class PrimeNgModule {
  constructor(private config: PrimeNGConfig) {
    this.config.setTranslation({
      startsWith: 'Comience con',
      contains: 'Contenga',
      notContains: 'No contenga',
      endsWith: 'Termine con',
      equals: 'Igual a',
      notEquals: 'Diferente a',
      noFilter: 'Sin filtro',
      lt: 'Menor que',
      lte: 'Menor o igual a',
      gt: 'Mayor que',
      gte: 'Mayor o igual a',
      dateIs: 'Fecha igual a',
      dateIsNot: 'Fecha diferente a',
      dateBefore: 'Fecha antes de',
      dateAfter: 'Fecha después de',
      // custom: 'Personalizar',
      clear: 'Limpiar',
      apply: 'Aplicar',
      matchAll: 'Coincidir todo',
      matchAny: 'Coincidir con cualquiera',
      addRule: 'Agregar regla',
      removeRule: 'Eliminar regla',
      accept: 'Sí',
      reject: 'No',
      choose: 'Escoger',
      upload: 'Subir',
      cancel: 'Cancelar',
      // fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      dayNames: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
      today: 'Hoy',
      weekHeader: 'Sem',
      firstDayOfWeek: 1,
      // showMonthAfterYear: false,
      dateFormat: 'dd/mm/yy',
      weak: 'Débil',
      medium: 'Medio',
      strong: 'Fuerte',
      passwordPrompt: 'Escriba una contraseña',
      emptyFilterMessage: 'Sin opciones disponibles',
      emptyMessage: 'No se han encontrado resultados',
      // aria: {
      //     trueLabel: 'Verdadero',
      //     falseLabel: 'Falso',
      //     nullLabel: 'No seleccionado',
      //     star: '1 estrella',
      //     stars: '{star} estrellas',
      //     selectAll: 'Seleccionar todos',
      //     unselectAll: 'Deseleccionar todos',
      //     close: 'Cerrar',
      //     previous: 'Anterior',
      //     next: 'Siguiente',
      //     navigation: 'Navegación',
      //     scrollTop: 'Desplazarse hacia arriba',
      //     moveTop: 'Mover arriba',
      //     moveUp: 'Subir',
      //     moveDown: 'Bajar',
      //     moveBottom: 'Desplazarse hacia abajo',
      //     moveToTarget: 'Mover al objetivo',
      //     moveToSource: 'Mover al origen',
      //     moveAllToTarget: 'Mover todo al objetivo',
      //     moveAllToSource: 'Mover todo al origen',
      //     pageLabel: 'Página {page}',
      //     firstPageLabel: 'Primera Página',
      //     lastPageLabel: 'Última Página',
      //     nextPageLabel: 'Siguiente Página',
      //     previousPageLabel: 'Página Anterior',
      //     rowsPerPageLabel: 'Filas por página',
      //     jumpToPageDropdownLabel: 'Ir al menú desplegable de página',
      //     jumpToPageInputLabel: 'Ir a la entrada de página',
      //     selectRow: 'Seleccionar fila',
      //     unselectRow: 'Desmarcar fila',
      //     expandRow: 'Expandir Fila',
      //     collapseRow: 'Reducir Fila',
      //     showFilterMenu: 'Mostrar menú del filtro',
      //     hideFilterMenu: 'Ocultar menú del filtro',
      //     filterOperator: 'Operador de filtro',
      //     filterConstraint: 'Restricción de filtro',
      //     editRow: 'Editar fila',
      //     saveEdit: 'Guardar editado',
      //     cancelEdit: 'Cancelar editado',
      //     listView: 'Vista de lista',
      //     gridView: 'Vista de cuadrícula',
      //     slide: 'Deslizar',
      //     slideNumber: '{slideNumber}',
      //     zoomImage: 'Ampliar imagen',
      //     zoomIn: 'Ampliar',
      //     zoomOut: 'Reducir',
      //     rotateRight: 'Girar a la derecha',
      //     rotateLeft: 'Girar a la izquierda',
      // },
    });
  }
}
