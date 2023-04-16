import { Address } from "./Address";
import { Doctor } from "./Doctor";

export interface Department {
    id: number;
    name: string;
    address: Address;
    doctors: Doctor[];
    // receptionists: Receptionist[];
    // administrator: Administrator;
    // appointments: Appointment[];
    // tests: Test[];
}
