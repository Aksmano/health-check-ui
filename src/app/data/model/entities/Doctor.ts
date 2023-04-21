import { Specialization } from "../common/Specialization";
import { Appointment } from "./Appointment";
import { Department } from "./Department";
import { Person } from "./Person";
import { Rating } from "./Rating";
import { Schedule } from "./Schedule";

export interface Doctor extends Person{
    department: Department;
    specialization: Specialization;
    schedules: Schedule[];
    appointments: Appointment[];
    rating: number;
    numberOfRatings: number;
}
