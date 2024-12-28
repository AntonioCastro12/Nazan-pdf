import { Component } from '@angular/core';
import { segmentCollaboratorsNazanResponseName } from '../../models';
import { SegmentCollaboratorsNazanStateService } from '../../services';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'segment-collaborators-nazan-list',
  templateUrl: './segment-collaborators-nazan-list.component.html',
  styleUrls: ['./segment-collaborators-nazan-list.component.scss'],
})
export class SegmentCollaboratorsNazanListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  segmentCollaboratorsNazanResponseName = segmentCollaboratorsNazanResponseName;

  searchText = '';

  constructor(
    public _segmentCollaboratorsNazan: SegmentCollaboratorsNazanStateService
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
      this._segmentCollaboratorsNazan.state.segmentCollaboratorsNazanResponse;
    this._segmentCollaboratorsNazan.state.segmentCollaboratorsNazanResponseList =
      list.filter((item) => objectContainsValue(item, this.searchText));
  }
}
