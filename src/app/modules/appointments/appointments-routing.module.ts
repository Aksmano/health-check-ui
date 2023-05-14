import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { SearchTableComponent } from './pages/search-table/search-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'search',
    component: SearchTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
