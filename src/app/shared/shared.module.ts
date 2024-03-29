import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DataTableViewComponent } from './components/data-table-view/data-table-view.component'
import { DataViewModule  } from 'primeng/dataview';
import { AppointmentDataViewComponent } from './components/data-table-view/data-views/appointment-data-view/appointment-data-view.component';
import { DoctorDataViewComponent } from './components/data-table-view/data-views/doctor-data-view/doctor-data-view.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { AvatarComponent } from './components/avatar/avatar.component';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { TableViewComponent } from './components/table-view/table-view.component';
import { TableModule } from 'primeng/table';
import { PatientViewComponent } from './components/table-view/table-views/patient-view/patient-view.component';
import { DoctorViewComponent } from './components/table-view/table-views/doctor-view/doctor-view.component';
import { ReceptionistViewComponent } from './components/table-view/table-views/receptionist-view/receptionist-view.component';
import { DepartmentViewComponent } from './components/table-view/table-views/department-view/department-view.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AdminViewComponent } from './components/table-view/table-views/admin-view/admin-view.component';
import { DoctorAppointmentViewComponent } from './components/table-view/table-views/doctor-appointment-view/doctor-appointment-view.component';
import { FormsModule } from '@angular/forms';
import { PatientsTableComponent } from './components/patients-table/patients-table.component';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DataTableViewComponent,
    AppointmentDataViewComponent,
    DoctorDataViewComponent,
    AvatarComponent,
    TableViewComponent,
    PatientViewComponent,
    DoctorViewComponent,
    ReceptionistViewComponent,
    DepartmentViewComponent,
    AdminViewComponent,
    DoctorAppointmentViewComponent,
    PatientsTableComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    DataViewModule,
    RatingModule,
    ScrollPanelModule,
    CarouselModule,
    MenuModule,
    AvatarModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    FormsModule,
    ToolbarModule
  ],
  exports: [
    LoadingSpinnerComponent,
    DataTableViewComponent,
    TableViewComponent,
    AvatarComponent,
    PatientsTableComponent
  ]
})
export class SharedModule { }
