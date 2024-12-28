export interface Identity {
  at_hash: string;
  aud: Array<string>;
  auth_time: number;
  exp: number;
  grupo: string;
  iat: number;
  iss: string;
  jti: string;
  nombre: string;
  nonce: string;
  privileges: { [app: string]: Array<string> };
  rat: number;
  sid: string;
  sub: string;
  tienda: string;
  tiendaNombre: string;
  tiendaTipo: string;
}
