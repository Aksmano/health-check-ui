import { Observable } from "rxjs";
import { DepartmentCriteriaQP } from "../../model/dto/qp/DepartmentsCriteriaQP";
import { DepartmentRS } from "../../model/dto/rs/DepartmentRS";
import { DepartmentRQ } from "../../model/dto/rq/DepartmentRQ";
import { Service } from "../Service";

export interface DepartmentService extends Service{
    getDepartmentsByCriteria(deptCriteria?: DepartmentCriteriaQP): Observable<DepartmentRS[]>;
    getDepartmentById(id: number): Observable<DepartmentRS>;
    createDepartment(departmentData: DepartmentRQ): Observable<DepartmentRS>;
    deleteDepartmentById(id: number): Observable<DepartmentRS>;
}
