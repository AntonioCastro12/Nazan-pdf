import { Component } from '@angular/core';
import { PointProgramDetailPointsStateService } from '../../services';
import { pointProgramDetailPointsResponseName } from '../../models';
import { objectContainsValue } from '@shared/functions';

@Component({
  selector: 'point-program-detail-points-list',
  templateUrl: './point-program-detail-points-list.component.html',
  styleUrls: ['./point-program-detail-points-list.component.scss'],
})
export class PointProgramDetailPointsListComponent {
  TEMPLATE_TEXT = {
    isLoadingOn: 'Por favor espere...',
    isLoadingOff: 'Tenemos resultados',
    isResultEmpty: 'No hay datos para mostrar',
  };

  pointProgramDetailPointsResponseName = pointProgramDetailPointsResponseName;

  searchText = '';

  constructor(
    public _pointProgramDetailPoints: PointProgramDetailPointsStateService
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
      this._pointProgramDetailPoints.state.pointProgramDetailPointsResponse;
    this._pointProgramDetailPoints.state.pointProgramDetailPointsResponseList =
      list.filter((item) => objectContainsValue(item, this.searchText));
  }
}
