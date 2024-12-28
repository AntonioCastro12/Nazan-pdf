import { UntypedFormGroup } from '@angular/forms';
import { PointProgramDetailPointsDTO } from './point-program-detail-points.dto';
import { PointProgramDetailPointsResponse } from './point-program-detail-points.response';

export class PointProgramDetailPointsState {
  pointProgramDetailPointsDTO: PointProgramDetailPointsDTO =
    new PointProgramDetailPointsDTO();
  pointProgramDetailPointsResponse: PointProgramDetailPointsResponse[] = [];
  pointProgramDetailPointsResponseList: PointProgramDetailPointsResponse[] = [];

  form!: UntypedFormGroup;

  isVisibleForm: boolean = false;
  isLoadingList: boolean = false;
}
