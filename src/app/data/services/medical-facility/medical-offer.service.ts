import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nullable, mockResponse } from 'src/app/utils';
import { LocationSearchItem } from '../../model/entities/AutoComplete';
import { cities, medicalOfferItems } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class MedicalOfferService {
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getMedicalFacilitiesCities(): Observable<LocationSearchItem[]> {
    return mockResponse({
      dataToReturn: cities,
      fetchTime: [500, 1500]
    });
  }

  public getMedicalOffers(city: string, address: string) {
    return mockResponse({
      dataToReturn: medicalOfferItems,
      fetchTime: [500, 1500]
    });
  }
}