import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { HomeComponent } from './pages/home/home.component';
import { DoctorPageComponent } from './pages/doctor-page/doctor-page.component';
import { AppointmentFormComponent } from './pages/appointment-form/appointment-form.component';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { RegisterPatientFormComponent } from './pages/register-patient-form/register-patient-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patient',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'complete-user-data',
    component: RegisterPatientFormComponent
  },
  {
    path: 'doctors',
    component: CatalogComponent,
    children: [

    ]
  },
  {
    path: 'doctors/id',
    component: DoctorPageComponent
  },
  {
    canActivate: [AuthGuard],
    path: 'doctors/appointment-form',
    component: AppointmentFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
