import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mockResponse } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getAllDepartments() {
    return mockResponse({
      dataToReturn: null
    });
  }

  public getDepartmentDetails(
    city: string,
    street: string,
    houseNumber: string,
    apartmentNumber?: string) {
    return mockResponse({
      dataToReturn: null
    });
  }
}
