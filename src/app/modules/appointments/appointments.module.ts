import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SearchComponent } from './pages/patient/search/search.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SharedModule } from "../../shared/shared.module";
import { SearchTableComponent } from './pages/patient/search-table/search-table.component';
import { DoctorsScheduleDetailsComponent } from './pages/patient/doctors-schedule-details/doctors-schedule-details.component';
import { DialogModule } from 'primeng/dialog';
import { AppointmentViewComponent } from './pages/patient/appointment-view/appointment-view.component';
import { PatientAllAppointmentsComponent } from './pages/patient/patient-all-appointments/patient-all-appointments.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    SearchComponent,
    SearchTableComponent,
    DoctorsScheduleDetailsComponent,
    AppointmentViewComponent,
    PatientAllAppointmentsComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    ButtonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    AutoCompleteModule,
    DataViewModule,
    DividerModule,
    RatingModule,
    ScrollPanelModule,
    CarouselModule,
    DropdownModule,
    KeyFilterModule,
    SharedModule,
    DialogModule,
    TableModule,
    TagModule
  ]
})
export class AppointmentsModule { }
