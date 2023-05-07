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
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {CarouselModule} from "primeng/carousel";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {DialogModule} from "primeng/dialog";

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
    ButtonModule,
    TableModule,
    ToolbarModule,
    CarouselModule,
    ScrollPanelModule,
    DialogModule
  ]
})
export class MedicalTestsModule {
}
