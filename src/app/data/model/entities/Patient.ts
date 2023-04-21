import { KeycloakProfile } from "keycloak-js";
import { Gender } from "../common/Gender";
import { Address } from "./Address";
import { Test } from "./Test";
import { Person } from "./Person";

export interface Patient extends Person{
    // keycloakId: string;
    pesel: string;
    phoneNumber: string;
    address: Address;
    gender: Gender;
    // appointment: Appointment;
    // ratings: Rating;
    tests?: Test;
}