import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MedicalTestsRoutingModule} from './medical-tests-routing.module';
import {MedicalTestsSearchPatientComponent} from './pages/patient/medical-tests-search-patient/medical-tests-search-patient.component';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {
  MedicalTestsSchedulesPatientComponent
} from './pages/patient/medical-tests-schedules-patient/medical-tests-schedules-patient.component';
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {CarouselModule} from "primeng/carousel";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {DialogModule} from "primeng/dialog";
import { MedicalTestsPatientComponent } from './pages/patient/medical-tests-patient/medical-tests-patient.component';
import {TimelineModule} from "primeng/timeline";
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [
    MedicalTestsSearchPatientComponent,
    MedicalTestsSchedulesPatientComponent,
    MedicalTestsPatientComponent,
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
    DialogModule,
    TimelineModule,
    CardModule
  ]
})
export class MedicalTestsModule {
}