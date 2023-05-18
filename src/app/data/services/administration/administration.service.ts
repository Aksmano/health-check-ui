import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdministratorRS } from '../../model/dto/rs/employeeRS/AdministratorRS';
import { AdministratorRQ } from '../../model/dto/rq/employeeRQ/AdministratorRQ';
import { HttpClient } from '@angular/common/http';
import { AdministrationService } from './AdministrationService';
import { DepartmentRS } from '../../model/dto/rs/DepartmentRS';

@Injectable({
  providedIn: 'root'
})
export class AdministrationServiceImpl implements AdministrationService {
  public readonly baseUrl = '/api/domain-service/administrators'

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAdministratorByUUID(uuid: string): Observable<AdministratorRS> {
    return this.httpClient.get<AdministratorRS>(`${this.baseUrl}/${uuid}`);
  }

  getAdministratorByDepartmentId(departmentId: number): Observable<AdministratorRS> {
    return this.httpClient.get<AdministratorRS>(this.baseUrl, { params: { 'departmentId': departmentId } });
  }

  createAdministrator(administratorData: AdministratorRQ): Observable<AdministratorRS> {
    return this.httpClient.post<AdministratorRS>(this.baseUrl, { ...administratorData });
  }

  deleteAdministratorByUUID(uuid: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/${uuid}`);
  }
}
