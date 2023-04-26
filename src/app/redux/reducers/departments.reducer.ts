import { createReducer, on } from "@ngrx/store";
import { DepartmentRS } from "src/app/data/model/dto/rs/DepartmentRS";
import { DoctorRS } from "src/app/data/model/dto/rs/employeeRS/DoctorRS";
import { SchedulesAppointmentsRS } from "src/app/data/model/dto/rs/schedules/SchedulesAppointmentsRS";
import { WithProcessIndicator, newWPI } from "src/app/data/model/utils/WithProcessIndicator";

export interface DepartmentsState {
    departments: WithProcessIndicator<DepartmentRS[]>;
    doctors: WithProcessIndicator<{
        info: WithProcessIndicator<DoctorRS>;
        schedules: WithProcessIndicator<SchedulesAppointmentsRS>;
    }>;
};

const initialState: DepartmentsState = {
    departments: newWPI(),
    doctors: newWPI({
        info: newWPI(),
        schedules: newWPI()
    })
};

export const departmentReducer = createReducer(
    initialState,
    // on()
)