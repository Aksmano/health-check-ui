import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './pages/patient/search/search.component';
import { SearchTableComponent } from './pages/patient/search-table/search-table.component';
import { DoctorsScheduleDetailsComponent } from './pages/patient/doctors-schedule-details/doctors-schedule-details.component';
import { PatientAllAppointmentsComponent } from './pages/patient/patient-all-appointments/patient-all-appointments.component';
import { AppointmentViewComponent } from './pages/patient/appointment-view/appointment-view.component';
import { AppointmentsPickerReceptionistComponent } from './pages/receptionist/appointments-picker-receptionist/appointments-picker-receptionist.component';
import { AddAppointmentSchedulesComponent } from './pages/receptionist/add-appointment-schedules/add-appointment-schedules.component';
import { AppointmentCreateVisitComponent } from './pages/receptionist/appointment-create-visit/appointment-create-visit.component';
import { ScheduledAppointmentsTableComponent } from './pages/receptionist/scheduled-appointments-table/scheduled-appointments-table.component';
import { ReceptionistAppointmentViewComponent } from './pages/receptionist/receptionist-appointment-view/receptionist-appointment-view.component';
import { DoctorScheduledAppointmentsTableComponent } from './pages/doctor/scheduled-appointments-table/scheduled-appointments-table.component';
import { DoctorsAppointmentViewComponent } from './pages/doctor/doctors-appointment-view/doctors-appointment-view.component';
import { DoctorsScheduleInsertComponent } from './pages/doctor/doctors-schedule-insert/doctors-schedule-insert.component';
import { PatientGuard } from 'src/app/core/guards/patient/patient.guard';
import { ReceptionistGuard } from 'src/app/core/guards/receptionist/receptionist.guard';
import { DoctorGuard } from 'src/app/core/guards/doctor/doctor.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full'
  },
  {
    path: 'patient',
    canActivate: [PatientGuard],
    component: SearchComponent
  },
  {
    path: 'patient/search',
    canActivate: [PatientGuard],
    component: SearchTableComponent
  },
  {
    path: 'patient/doctor/:id',
    canActivate: [PatientGuard],
    component: DoctorsScheduleDetailsComponent
  },
  {
    path: 'patient/schedules',
    canActivate: [PatientGuard],
    component: PatientAllAppointmentsComponent
  },
  {
    path: 'patient/appointment-details/:id',
    canActivate: [PatientGuard],
    component: AppointmentViewComponent
  },
  {
    path: 'receptionist/appointment-picker',
    canActivate: [ReceptionistGuard],
    component: AppointmentsPickerReceptionistComponent
  },
  {
    path: 'receptionist/add-schedules/:id/:spec',
    canActivate: [ReceptionistGuard],
    component: AddAppointmentSchedulesComponent
  },
  {
    path: 'receptionist/create-appointment/:id/:spec',
    canActivate: [ReceptionistGuard],
    component: AppointmentCreateVisitComponent
  },
  {
    path: 'receptionist/appointment-visits/:id',
    canActivate: [ReceptionistGuard],
    component: ScheduledAppointmentsTableComponent,
  },
  {
    path: 'receptionist/appointment-view/:id',
    canActivate: [ReceptionistGuard],
    component: ReceptionistAppointmentViewComponent,
  },
  {
    path: 'doctor/appointment-visits/:doctorId',
    canActivate: [DoctorGuard],
    component: DoctorScheduledAppointmentsTableComponent,
  },
  {
    path: 'doctor/appointment-view/:id',
    canActivate: [DoctorGuard],
    component: DoctorsAppointmentViewComponent,
  },
  {
    path: 'doctor/add-schedules/:id',
    canActivate: [DoctorGuard],
    component: DoctorsScheduleInsertComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
