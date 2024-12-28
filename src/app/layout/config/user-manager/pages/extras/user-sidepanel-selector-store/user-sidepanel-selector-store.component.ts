import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { StoreEntity } from 'src/app/layout/config/store-manager/models';
import { SharedEnvironmentService } from '@shared/services';
import { UserCrudService, UserStateService } from '@user-manager/services';
import { StoreStateService } from 'src/app/layout/config/store-manager/services';

@Component({
  selector: 'user-sidepanel-selector-store',
  templateUrl: './user-sidepanel-selector-store.component.html',
})
export class UserSidepanelSelectorStoreComponent {
  @Output() messageEvent = new EventEmitter<any>();
  @Input() filterParams: any;

  TEMPLATE_TEXT = {
    name: 'Nombre',
    id: 'ID',
    type: 'Tipo',
  };

  value: string = '';
  constructor(
    public _user: UserStateService,
    public _store: StoreStateService,
    private _userCrud: UserCrudService,
    public env: SharedEnvironmentService
  ) {}

  ngOnInit() {
    this.onOpen();
  }

  onSelectStore(store: StoreEntity) {
    this._user.state.isStoreSidepanel = false;
    this.messageEvent.emit(store);
  }

  onOpen() {
    this._store.state.storeList = [];
    this._store.state.storeFilterList = [];
    // this._userCrud.onGetStoreList();
  }

  onSearchParams() {
    this._store.state.storeFilterList = this._store.state.storeList.filter(
      (x: StoreEntity) =>
        x.id == this.value || x.name == this.value || x.type == this.value
    );
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onSearchParams();
    }
  }

  @HostListener('window:keypress', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSearchParams();
    }
  }
}
