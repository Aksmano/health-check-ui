import { DepartmentRS } from "src/app/data/model/dto/rs/DepartmentRS";
import { DoctorRS } from "src/app/data/model/dto/rs/employeeRS/DoctorRS";
import { WithProcessIndicator } from "src/app/data/model/utils/WithProcessIndicator";

export interface DepartmentState {
    allDepartments: WithProcessIndicator<DepartmentRS[]>;
    departmentId: WithProcessIndicator<number>;
    departmentDoctors: WithProcessIndicator<DoctorRS>;
}