import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RateRQ } from '../../model/dto/rq/RateRQ';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  public readonly baseUrl = '/api/domain-service/ratings'

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  addRating(rateRQ: RateRQ): Observable<string> {
    return this.httpClient.post<string>(this.baseUrl, rateRQ)
  }
}
