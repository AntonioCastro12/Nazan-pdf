import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-report-manager',
  templateUrl: './report-manager.component.html',
  styleUrls: ['./report-manager.component.scss'],
})
export class ReportManagerComponent {
  constructor(private cd: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
}
