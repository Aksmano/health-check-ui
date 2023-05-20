import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientGuard } from 'src/app/core/guards/patient/patient.guard';
import { PatientComponent } from './pages/patient/patient.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'update-user-data',
    pathMatch: 'full'
  },
  {
    path: 'patient/:mode',
    canActivate: [PatientGuard],
    component: PatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterUserDataRoutingModule { }
