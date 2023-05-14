import {Gender} from "../../common/Gender";
import {AddressRS} from "./AddressRS";

export interface PatientRS {
  patientUUID: string;  // as uuid
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: Gender;
  address: AddressRS;
}
