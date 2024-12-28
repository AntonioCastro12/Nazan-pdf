export class SegmentCollaboratorsNazanDTO {
  store_id: string = '';
  segment: number = 0;
  membership: string = '';
  client_id: string = '';
  first_name: string = '';
  second_name: string = '';
  last_name: string = '';
  second_last_name: string = '';
  cellphone_number: string = '';
  mail: string = '';
  birthday: Date = new Date();
  gender: string = '';
  marital_status: string = '';
  signup_date: Date = new Date();
}

export const segmentCollaboratorsNazanLabels = {
  store_id: 'Tienda',
  segment: 'Segmento',
  membership: 'Numero socio',
  client_id: 'Id cliente',
  first_name: 'Primer nombre',
  second_name: 'Segundo nombre',
  last_name: 'Primer apellido',
  second_last_name: 'Segundo apellido',
  cellphone_number: 'Numero celular',
  mail: 'Email',
  birthday: 'Fecha nacimiento',
  gender: 'Género',
  marital_status: 'Estado civil',
  signup_date: 'Fecha de registro',
};
