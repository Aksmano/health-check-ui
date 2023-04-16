import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { DataViewModule } from 'primeng/dataview';
import { DoctorsCardComponent } from './pages/catalog/doctors-card/doctors-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorPageComponent } from './pages/doctor-page/doctor-page.component';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CarouselModule } from 'primeng/carousel';
import { AppointmentFormComponent } from './pages/appointment-form/appointment-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RegisterPatientFormComponent } from './pages/register-patient-form/register-patient-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    CatalogComponent,
    DoctorsCardComponent,
    DoctorPageComponent,
    AppointmentFormComponent,
    RegisterPatientFormComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ButtonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    AutoCompleteModule,
    DataViewModule,
    SharedModule,
    DividerModule,
    RatingModule,
    ScrollPanelModule,
    CarouselModule,
    DropdownModule,
    KeyFilterModule
  ]
})
export class PatientModule { }
