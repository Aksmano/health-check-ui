import { TestStatus } from "../../common/TestStatus";
import { TestType } from "../../common/TestType";
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