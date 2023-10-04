export interface ContactInterface {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
}

export class Contact implements ContactInterface {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
}
