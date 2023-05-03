import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { PanelComponent } from './pages/panel/panel.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { EntityViewerComponent } from './pages/entity-viewer/entity-viewer.component';
import { DepartmentViewComponent } from './pages/entity-viewer/views/department-view/department-view.component';
import { AdminViewComponent } from './pages/entity-viewer/views/admin-view/admin-view.component';
import { ReceptionistViewComponent } from './pages/entity-viewer/views/receptionist-view/receptionist-view.component';
import { DoctorViewComponent } from './pages/entity-viewer/views/doctor-view/doctor-view.component';
import { PatientViewComponent } from './pages/entity-viewer/views/patient-view/patient-view.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    PanelComponent,
    EntityViewerComponent,
    DepartmentViewComponent,
    AdminViewComponent,
    ReceptionistViewComponent,
    DoctorViewComponent,
    PatientViewComponent,
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    TabMenuModule,
    MenuModule,
    InputTextModule,
    MenubarModule,
    SharedModule,
    ScrollPanelModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
  ]
})
export class SuperadminModule { }
