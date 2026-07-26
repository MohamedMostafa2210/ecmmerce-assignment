export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  phoneNumber?: string;
  age?: number;
  gender?: string;
}
