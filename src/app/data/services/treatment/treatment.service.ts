import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Treatment } from '../../model/entities/Treatment';

interface TreatmentRepository {
  getTreatmentById(id: number): Observable<Treatment>;
  getTreatmentsByDoctorId(id: number): Observable<Treatment[]>;
  getTreatmentsByPatientId(id: number): Observable<Treatment[]>;
  getTreatmentsByDate(id: number): Observable<Treatment[]>;
}

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor() { }
}
