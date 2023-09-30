import { Company } from "./company";

export type Employee = {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: number;
  birthDate: Date;
  company: Company;
};
