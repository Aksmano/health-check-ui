import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { AdminGuard } from './core/guards/admin/admin.guard';
import { SuperadminGuard } from './core/guards/superadmin/superadmin.guard';
import { AdminPanelLayoutComponent } from './layout/admin-panel-layout/admin-panel-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: ContentLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'patient',
        loadChildren: () =>
          import('./modules/patient/patient.module').then(m => m.PatientModule)
      },
      // {
      //   path: 'admin',
      //   canActivate: [AdminGuard],
      //   loadChildren: () =>
      //     import('./modules/admin/admin.module').then(m => m.AdminModule)
      // },
      // {
      //   path: 'superadmin',
      //   canActivate: [SuperadminGuard],
      //   loadChildren: () =>
      //   import('./modules/superadmin/superadmin.module').then(m => m.SuperadminModule)
      // },
    ]
  },
  {
    path: 'app/admin',
    // canActivate: [AdminGuard],
    component: AdminPanelLayoutComponent,
    children: [
      {
        path: 'superpanel',
        canActivate: [SuperadminGuard],
        loadChildren: () =>
          import('./modules/superadmin/superadmin.module').then(m => m.SuperadminModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/app',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
