import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mockResponse } from 'src/app/utils';
import { AutoCompleteItem } from '../../model/entities/AutoComplete';
import { cities } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class MedicalFacilityService {
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getMedicalFacilitiesCities(): Observable<AutoCompleteItem[]> {
    return mockResponse(cities)
  }
}