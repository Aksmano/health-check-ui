import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mockResponse, objectToHttpParams } from 'src/app/utils';
import { DepartmentCriteriaQP } from '../../model/dto/qp/DepartmentsCriteriaQP';
import { Observable } from 'rxjs';
import { DepartmentRS } from '../../model/dto/rs/DepartmentRS';
import { DepartmentRQ } from '../../model/dto/rq/DepartmentRQ';
import { DepartmentService } from './DepartmentService';
import { AddressRQ } from '../../model/dto/rq/AddressRQ';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceImpl implements DepartmentService {
  public readonly baseUrl = '/api/domain-service/departments'

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getDepartmentsByCriteria(
    deptCriteria: DepartmentCriteriaQP = {} as DepartmentCriteriaQP
  ): Observable<DepartmentRS[]> {
    const deptParams = objectToHttpParams(deptCriteria);

    return this.httpClient.get<DepartmentRS[]>(this.baseUrl, { params: deptParams });
  }

  getDepartmentById(id: number): Observable<DepartmentRS> {
    return this.httpClient.get<DepartmentRS>(`${this.baseUrl}/${id}`);
  }

  createDepartment(departmentData: DepartmentRQ): Observable<DepartmentRS> {
    return this.httpClient.post<DepartmentRS>(this.baseUrl, {
      'name': departmentData.name,
      'addressRQ': departmentData.address as AddressRQ
    });
  }

  deleteDepartmentById(id: number): Observable<DepartmentRS> {
    return this.httpClient.delete<DepartmentRS>(`${this.baseUrl}/${id}`);
  }

  getDepartmentByAdministratorUUID(uuid: string): Observable<DepartmentRS> {
    return this.httpClient.get<DepartmentRS>(`${this.baseUrl}/administrator/${uuid}`);
  }
}
