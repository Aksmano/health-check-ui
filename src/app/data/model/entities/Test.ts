import { Department } from "./Department";
import { TestType } from "./MedicalOffer";
import { Patient } from "./Patient";

export interface Test {
    id: number;
    department: Department;
    patient: Patient;
    type: TestType;
    description: string;
    // testResult: TestResult;
}