import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CatalogComponent } from './pages/catalog/catalog.component';


@NgModule({
  declarations: [
    HomeComponent,
    CatalogComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ButtonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    AutoCompleteModule
  ]
})
export class PatientModule { }
