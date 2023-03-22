import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      // {
      //   path: '',

      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
