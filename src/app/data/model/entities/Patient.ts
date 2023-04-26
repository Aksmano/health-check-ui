import { KeycloakProfile } from "keycloak-js";
import { Gender } from "../common/Gender";
import { Test } from "./Test";
import { PatientRS } from "../dto/rs/PatientRS";
import { MedicalTestRS } from "../dto/rs/MedicalTestRS";
import { AppointmentRS } from "../dto/rs/AppointmentRS";
import { RatingRS } from "../dto/rs/RatingRS";

export interface Patient {
    personalData?: PatientRS;
    appointments?: AppointmentRS[];
    ratings?: RatingRS;
    tests?: MedicalTestRS;
}