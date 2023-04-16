import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mockResponse } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getAllDoctors() {
    return mockResponse({
      dataToReturn: null
    });
  }

  public getDoctorById(doctorId: number) {
    return mockResponse({
      dataToReturn: null
    });
  }

  public getDoctorsByDept(deptId: number) {
    return mockResponse({
      dataToReturn: null
    });
  }
}
