import { TestType } from "../common/TestType";
import { Department } from "./Department";
import { Patient } from "./Patient";

export interface Test {
    id: number;
    department: Department;
    patient: Patient;
    type: TestType;
    description: string;
    // testResult: TestResult;
}