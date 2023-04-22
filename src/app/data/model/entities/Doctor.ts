import { DepartmentRS } from "../dto/rs/DepartmentRS";
import { DoctorRS } from "../dto/rs/employeeRS/DoctorRS";
import { SchedulesAppointmentsRS } from "../dto/rs/schedules/SchedulesAppointmentsRS";

export interface Doctor {
    department?: DepartmentRS;
    personalData?: DoctorRS;
    schedulesAppointments?: SchedulesAppointmentsRS;
}
