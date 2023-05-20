import { Gender } from "../../common/Gender";
import { AddressRQ } from "./AddressRQ";

export interface PatientDataRQ {
    firstName: string;
    lastName: string;
    pesel: string;
    phoneNumber: string;
    gender: Gender;
    addressRQ: AddressRQ;
}