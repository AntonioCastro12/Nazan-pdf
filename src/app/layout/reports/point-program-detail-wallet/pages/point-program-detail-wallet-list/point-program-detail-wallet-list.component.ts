import { Component } from '@angular/core';
import { PointProgramDetailWalletStateService } from '../../services';
import { pointProgramDetailWalletResponseName } from '../../models';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'point-program-detail-wallet-list',
  templateUrl: './point-program-detail-wallet-list.component.html',
  styleUrls: ['./point-program-detail-wallet-list.component.scss'],
})
export class PointProgramDetailWalletListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  pointProgramDetailWalletResponseName = pointProgramDetailWalletResponseName;

  searchText = '';

  constructor(
    public _pointProgramDetailWallet: PointProgramDetailWalletStateService
  ) {}

  handleSearch() {}
  handleChart() {}
  handleRefresh() {}

  handleDownload() {}
  handleFavorite() {}

  highlightSearchText(searchText: string, field: any) {
    return field;
  }

  handleSearchRecords() {
    const list =
      this._pointProgramDetailWallet.state.pointProgramDetailWalletResponse;
    this._pointProgramDetailWallet.state.pointProgramDetailWalletResponseList =
      list.filter((item) => objectContainsValue(item, this.searchText));
  }
}
