import { Injectable } from '@angular/core';
import { StoreEntity } from '@shared/models/store.entity';
// vendor

import { RoleEntity } from '@shared/models/role.entity';
import { LayoutStateService } from 'src/app/layout/config/layout-manager/services';

import { StoreStateService } from '@store-manager/services/store-state.service';
import { RoleStateService } from '@role-manager/services/role-state.service';
import { HttpClient } from '@angular/common/http';
import { SystemEnvironmentService } from '@shared/services/system.environment.service';
import { map, Observable } from 'rxjs';
import { LayoutState } from '../models/layout.state';

@Injectable({
  providedIn: 'root',
})
export class LayoutApiService {
  constructor(
    private layoutStateService: LayoutStateService,
    private storeStateService: StoreStateService,
    private roleStateService: RoleStateService,
    private http: HttpClient,
    private env: SystemEnvironmentService
  ) {}
}
