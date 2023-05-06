import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MedicalTestsRoutingModule} from './medical-tests-routing.module';
import {MedicalTestsPatientComponent} from './pages/patient/medical-tests-patient/medical-tests-patient.component';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {
  MedicalTestSchedulesPatientComponent
} from './pages/patient/medical-test-schedules-patient/medical-test-schedules-patient.component';


@NgModule({
  declarations: [
    MedicalTestsPatientComponent,
    MedicalTestSchedulesPatientComponent,
  ],
  imports: [
    CommonModule,
    MedicalTestsRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class MedicalTestsModule {
}
