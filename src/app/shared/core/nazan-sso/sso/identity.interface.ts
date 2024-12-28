export class Identity {
  at_hash: string = '';
  aud: Array<string> = [];
  auth_time: number = 0;
  exp: number = 0;
  grupo: string = '';
  iat: number = 0;
  iss: string = '';
  jti: string = '';
  nombre: string = '';
  nonce: string = '';
  privileges: { [app: string]: Array<string> } = { ['app']: [] };
  rat: number = 0;
  sid: string = '';
  sub: string = '';
  banco: string = ''; // <- banco id
  bancoTipo: string = '';
  bancoNombre: string = '';
}
