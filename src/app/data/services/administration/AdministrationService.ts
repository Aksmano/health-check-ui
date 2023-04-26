import { Observable } from "rxjs";
import { AdministratorRS } from "../../model/dto/rs/employeeRS/AdministratorRS";
import { AdministratorRQ } from "../../model/dto/rq/employeeRQ/AdministratorRQ";
import { Service } from "../Service";

export interface AdministrationService extends Service {
    getAdministratorByUUID(uuid: string): Observable<AdministratorRS>;
    getAdministratorByDepartmentId(deptId: number): Observable<AdministratorRS>;
    createAdministrator(administratorData: AdministratorRQ): Observable<AdministratorRS>;
    deleteAdministratorByUUID(uuid: string): Observable<string>;
}