export class UserEntity {
  // id?: string | null = null;
  // employeeNumber: string = '';
  // firstName: string = '';
  // lastName: string = '';
  // role: string = 'administrador';
  // storeId: StoreEntity = new StoreEntity();
  aud: string[] = [];
  auth_time: number | null = null;
  iat: number | null = null;
  iss: string = '';
  nombre: string = '';
  privileges: any;
  rat: number | null = null;
  sub: string = '';
  tienda: string = '';
  tiendaNombre: string = '';
  tiendaTipo: string = '';
}

export const userEntityName = {
  id: 'ID',
  employeeNumber: 'Número del empleado',
  firstName: 'Primer nombre',
  lastName: 'Apellidos',
  role: 'Rol',
  storeId: 'Tienda',
};

export class DATA_HIDRA {
  aud: string[] = [];
  auth_time: number | null = null;
  iat: number | null = null;
  iss: string = '';
  nombre: string = '';
  privileges: any;
  rat: number | null = null;
  sub: string = '';
  tienda: string = '';
  tiendaNombre: string = '';
  tiendaTipo: string = '';
}

/*
{
  "DATA_HIDRA": {
    "aud": [
      "dashboard"
    ],
    "auth_time": 1696972238,
    "iat": 1696972239,
    "iss": "https://hydra.impuls.com.mx/",
    "nombre": "rojas",
    "privileges": {
      "dashboard": [
        "admin"
      ],
      "kiponshoesclub": [
        "admin"
      ],
      "prenomina": [
        "prenomina-status",
        "manager",
        "todas-las-tiendas"
      ],
      "preprod": [
        "sistemas"
      ],
      "promotoresimpuls": [
        "admin"
      ],
      "reportesadministrativos": [
        "sistemas"
      ],
      "retailcustomermanager": [
        "admin"
      ]
    },
    "rat": 1696972218,
    "sub": "bonarja@gmail.com",
    "tienda": "01",
    "tiendaNombre": "Sucursal 01 Matamoros",
    "tiendaTipo": "menudeo"
  }
}
*/
