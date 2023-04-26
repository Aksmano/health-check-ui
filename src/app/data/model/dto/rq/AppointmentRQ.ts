export interface AppointmentRQ {
    doctorUUID: string; // as uuid
    patientUUID: string; // as uuid
    appointmentDateTime: Date;
}