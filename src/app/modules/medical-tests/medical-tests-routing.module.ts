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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalTestsRoutingModule {
}
