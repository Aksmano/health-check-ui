import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../../model/entities/Test';

interface MedicalTestRepository {
  getAllMedicalTests(): Observable<Test[]>;
  getMedicalTestById(id: number): Observable<Test>;
  getAllMedicalByPatientId(id: number): Observable<Test[]>;
}

@Injectable({
  providedIn: 'root'
})
export class MedicalTestService {

  constructor() { }
}
