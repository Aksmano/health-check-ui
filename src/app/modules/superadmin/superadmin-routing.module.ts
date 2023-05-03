import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './pages/panel/panel.component';
import { EntityViewerComponent } from './pages/entity-viewer/entity-viewer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'superpanel/browse?type=users&user-type=Doctor',
    pathMatch: 'full'
  },
  {
    path: 'browse',
    component: PanelComponent
  },
  {
    path: 'entity-view',
    component: EntityViewerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
