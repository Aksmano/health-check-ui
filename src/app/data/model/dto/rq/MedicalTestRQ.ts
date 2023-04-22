import { TestType } from "../../common/TestType";

export interface MedicalTestRQ {
    departmentId: number;
    patientUUID: string;  // as uuid
    type: TestType;
    testDate: Date;
}