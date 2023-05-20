import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  MedicalTestsSearchPatientComponent
} from "./pages/patient/medical-tests-search-patient/medical-tests-search-patient.component";
import {AuthGuard} from "../../core/guards/auth/auth.guard";
import {
  MedicalTestsSchedulesPatientComponent
} from "./pages/patient/medical-tests-schedules-patient/medical-tests-schedules-patient.component";
import {MedicalTestsPatientComponent} from "./pages/patient/medical-tests-patient/medical-tests-patient.component";
import {
  MedicalTestsAllPatientComponent
} from "./pages/patient/medical-tests-all-patient/medical-tests-all-patient.component";
import {
  MedicalTestsReceptionistComponent
} from "./pages/receptionist/medical-tests-receptionist/medical-tests-receptionist.component";
import {
  MedicalTestsCreateVisitReceptionistComponent
} from "./pages/receptionist/medical-tests-create-visit-receptionist/medical-tests-create-visit-receptionist.component";
import {
  MedicalTestsInsertSchedulesReceptionistComponent
} from "./pages/receptionist/medical-tests-insert-schedules-receptionist/medical-tests-insert-schedules-receptionist.component";
import {
  MedicalTestsVisitsReceptionistComponent
} from "./pages/receptionist/medical-tests-visits-receptionist/medical-tests-visits-receptionist.component";
import {
  MedicalTestsPickerReceptionistComponent
} from "./pages/receptionist/medical-tests-picker-receptionist/medical-tests-picker-receptionist.component";

const routes: Routes = [
  {
    path: 'patient/search',
    canActivate: [AuthGuard],
    component: MedicalTestsSearchPatientComponent
  },
  {
    path: 'patient/medical-test-schedules',
    canActivate: [AuthGuard],
    component: MedicalTestsSchedulesPatientComponent,
  },
  {
    path: 'patient/medical-test-details/:id',
    canActivate: [AuthGuard],
    component: MedicalTestsPatientComponent,
  },
  {
    path: 'patient/medical-test-patient/:id',
    canActivate: [AuthGuard],
    component: MedicalTestsAllPatientComponent,
  },
  {
    path: 'receptionist/medical-test-picker',
    canActivate: [AuthGuard],
    component: MedicalTestsPickerReceptionistComponent,
  },
  {
    path: 'receptionist/medical-test-create-visit/:departmentId/:type',
    canActivate: [AuthGuard],
    component: MedicalTestsCreateVisitReceptionistComponent,
  },
  {
    path: 'receptionist/medical-test-insert-schedules/:departmentId/:type',
    canActivate: [AuthGuard],
    component: MedicalTestsInsertSchedulesReceptionistComponent,
  },
  {
    path: 'receptionist/medical-test-details/:id',
    canActivate: [AuthGuard],
    component: MedicalTestsReceptionistComponent,
  },
  {
    path: 'receptionist/medical-test-visits/:departmentId',
    canActivate: [AuthGuard],
    component: MedicalTestsVisitsReceptionistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalTestsRoutingModule {
}
