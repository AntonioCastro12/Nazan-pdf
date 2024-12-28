export class DirectusLoginResponse {
  data: DataResponse = new DataResponse();
}

class DataResponse {
  access_token: string = '';
  expires: number = 0;
  refresh_token: string = '';
}
