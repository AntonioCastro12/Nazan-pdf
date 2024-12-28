import { Component } from '@angular/core';
import { InventoryStockResumeStateService } from '../../services';

@Component({
  selector: 'inventory-stock-resume-report',
  templateUrl: './inventory-stock-resume-report.component.html',
  styleUrls: ['./inventory-stock-resume-report.component.scss'],
})
export class InventoryStockResumeReportComponent {
  TEMPLATE_TEXT = {
    title: 'Existencia en Inventario',
  };

  constructor(public _inventoryStockResume: InventoryStockResumeStateService) {}
}
