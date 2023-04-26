import { Gender } from "../../common/Gender";
import { AddressRQ } from "./AddressRQ";

export interface PatientDataRQ {
    pesel: string;
    phoneNumber: string;
    gender: Gender;
    address: AddressRQ;
}