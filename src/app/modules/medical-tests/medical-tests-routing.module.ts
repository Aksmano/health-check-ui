import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MedicalTestsPatientComponent} from "./pages/patient/medical-tests-patient/medical-tests-patient.component";
import {AuthGuard} from "../../core/guards/auth/auth.guard";
import {
  MedicalTestSchedulesPatientComponent
} from "./pages/patient/medical-test-schedules-patient/medical-test-schedules-patient.component";

const routes: Routes = [
  {
    path: 'patient',
    canActivate: [AuthGuard],
    component: MedicalTestsPatientComponent,
    children: [
      {
        path: 'medical-test-schedules',
        component: MedicalTestSchedulesPatientComponent
      }
    ]
  },
  {
    path: 'medical-test-schedules',
    canActivate: [AuthGuard],
    component: MedicalTestSchedulesPatientComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalTestsRoutingModule {
}
