import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserDataRoutingModule } from './register-user-data-routing.module';
import { PatientComponent } from './pages/patient/patient.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    RegisterUserDataRoutingModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    ButtonModule
  ]
})
export class RegisterUserDataModule { }
