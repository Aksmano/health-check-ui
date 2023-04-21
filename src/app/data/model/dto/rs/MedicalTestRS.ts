import { TestType } from "../../entities/MedicalOffer";
import { TestStatus } from "../../common/TestStatus";
import { TestResultRS } from "./TestResultRS";

export interface MedicalTestRS {
    id: number;
    testStatus: TestStatus;
    departmentId: number;
    patientUUID: string;  // as uuid
    type: TestType;
    description: string;
    testResultRS: TestResultRS;
}