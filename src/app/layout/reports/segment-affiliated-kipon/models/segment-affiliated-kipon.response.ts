export class SegmentAffiliatedKiponResponse {
  store_id: string | null = null;
  membership: string | null = null;
  cust_id: string | null = null;
  first_name: string | null = null;
  second_name: string | null = null;
  surname: string | null = null;
  lastname: string | null = null;
  home_phone: string | null = null;
  cel_phone: string | null = null;
  business_phone: string | null = null;
  email: string | null = null;
  birthday: string | null = null;
  gender: string | null = null;
  status: string | null = null;
  signup_date: string | null = null;
}

export const segmentAffiliatedKiponResponseName = {
  store_id: 'Tienda',
  membership: 'Numero socio ',
  cust_id: 'Id cliente',
  first_name: 'Primer nombre ',
  second_name: 'Segundo nombre',
  surname: 'Primer apellido ',
  lastname: 'Segundo apellido',
  home_phone: 'Telefono casa',
  cel_phone: 'Telefono celular',
  business_phone: 'Telefono trabajo',
  email: 'Email',
  birthday: 'Fecha nacimiento ',
  gender: 'Genero',
  status: 'Estatus',
  signup_date: 'Fecha registro',
};
