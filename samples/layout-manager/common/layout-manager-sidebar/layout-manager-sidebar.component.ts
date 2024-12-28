import { Component, ElementRef, OnInit } from '@angular/core';
import { LayoutService, LayoutStateService } from 'src/app/layout/config/layout-manager/services';
import { SystemEnvironmentService } from 'src/app/shared/services/system.environment.service';

@Component({
  selector: 'layout-manager-sidebar',
  templateUrl: './layout-manager-sidebar.component.html',
  styleUrls: ['./layout-manager-sidebar.component.scss'],
})
export class LayoutManagerSidebarComponent implements OnInit {
  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    public env: SystemEnvironmentService,
    public layoutStateService: LayoutStateService
  ) { }
  sidebarVisible: boolean = true;


  ngOnInit(): void { }
}
