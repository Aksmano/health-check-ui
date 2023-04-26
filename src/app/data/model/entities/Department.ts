import { AddressRS } from "../dto/rs/AddressRS";
import { Doctor } from "./Doctor";

export interface Department {
    id: number;
    name: string;
    address: AddressRS;
    doctors: Doctor[];
    // receptionists: Receptionist[];
    // administrator: Administrator;
    // appointments: Appointment[];
    // tests: Test[];
}
