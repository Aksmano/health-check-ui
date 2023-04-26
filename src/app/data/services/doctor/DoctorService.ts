import { Observable } from "rxjs";
import { DoctorRS } from "../../model/dto/rs/employeeRS/DoctorRS";
import { DoctorRQ } from "../../model/dto/rq/employeeRQ/DoctorRQ";
import { RatingRS } from "../../model/dto/rs/RatingRS";
import { Service } from "../Service";
import { DoctorsCriteriaQP } from "../../model/dto/qp/DoctorsCriteriaQP";

export interface DoctorService extends Service {
    getAllDoctors(doctorsCriteria?: DoctorsCriteriaQP): Observable<DoctorRS[]>;
    getDoctorById(uuid: string): Observable<DoctorRS>;
    createDoctor(doctorData: DoctorRQ): Observable<DoctorRS>;
    deleteDoctorById(uuid: string): Observable<string>;
    getDoctorRatesById(uuid: string): Observable<RatingRS[]>;
}
