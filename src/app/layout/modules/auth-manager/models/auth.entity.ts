export class UserInfoEntity {
  aud: string[] = [];
  auth_time: number = 0;
  iat: number = 0;
  iss: string = '';
  nombre: string = '';
  privileges: {
    reportesadministrativos: string[];
  } = {
    reportesadministrativos: [],
  };
  rat: number = 0;
  sub: string = '';
  tienda: string = '';
  tiendaNombre: string = '';
  tiendaTipo: string = '';
}
