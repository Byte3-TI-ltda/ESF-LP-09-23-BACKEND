export interface ContactInterface {
  firstname: string;
  lastname: string;
  email: string;
  whatsapp: string;
}

export class Contact implements ContactInterface {
  firstname: string;
  lastname: string;
  email: string;
  whatsapp: string;
}
