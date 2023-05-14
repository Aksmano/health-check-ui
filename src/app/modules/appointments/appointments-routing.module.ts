import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './pages/patient/search/search.component';
import { SearchTableComponent } from './pages/patient/search-table/search-table.component';
import { DoctorsScheduleDetailsComponent } from './pages/patient/doctors-schedule-details/doctors-schedule-details.component';
import { PatientAllAppointmentsComponent } from './pages/patient/patient-all-appointments/patient-all-appointments.component';
import { AppointmentViewComponent } from './pages/patient/appointment-view/appointment-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full'
  },
  {
    path: 'patient',
    component: SearchComponent
  },
  {
    path: 'patient/search',
    component: SearchTableComponent
  },
  {
    path: 'patient/doctor/:id',
    component: DoctorsScheduleDetailsComponent
  },
  {
    path: 'patient/schedules',
    component: PatientAllAppointmentsComponent
  },
  {
    path: 'patient/appointment-details/:id',
    component: AppointmentViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
