export class SegmentCollaboratorsNazanResponse {
  ORGANIZATION_ID: number | null = null;
  CUST_ID: string | null = null;
  CARD_NUM: string | null = null;
  FIRST_NAME: string | null = null;
  MIDDLE_NAME: string | null = null;
  LAST_NAME: string | null = null;
  last_name2: string | null = null;
  PARTY_TYPE_CODE: string | null = null;
  CUSTOMER_GROUPS: string | null = null;
  CUSTOMER_TYPE: string | null = null;
}

export const segmentCollaboratorsNazanResponseName = {
  ORGANIZATION_ID: 'Organización',
  CUST_ID: 'Id cliente',
  CARD_NUM: 'Membresía',
  FIRST_NAME: 'Primer nombre',
  MIDDLE_NAME: 'Segundo nombre',
  LAST_NAME: 'Primer apellido',
  last_name2: 'Segundo apellido',
  PARTY_TYPE_CODE: 'Tipo',
  CUSTOMER_GROUPS: 'Grupo',
  CUSTOMER_TYPE: 'Atributo',
};
