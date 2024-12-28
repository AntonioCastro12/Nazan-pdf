import { Component } from '@angular/core';
import { segmentAffiliatedKiponResponseName } from '../../models';
import { SegmentAffiliatedKiponStateService } from '../../services';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'segment-affiliated-kipon-list',
  templateUrl: './segment-affiliated-kipon-list.component.html',
  styleUrls: ['./segment-affiliated-kipon-list.component.scss'],
})
export class SegmentAffiliatedKiponListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  segmentAffiliatedKiponResponseName = segmentAffiliatedKiponResponseName;

  searchText = '';

  constructor(
    public _segmentAffiliatedKipon: SegmentAffiliatedKiponStateService
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
      this._segmentAffiliatedKipon.state.segmentAffiliatedKiponResponse;
    this._segmentAffiliatedKipon.state.segmentAffiliatedKiponResponseList =
      list.filter((item) => objectContainsValue(item, this.searchText));
  }
}
