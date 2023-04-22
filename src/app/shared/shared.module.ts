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

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DataTableViewComponent,
    AppointmentDataViewComponent,
    DoctorDataViewComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    DataViewModule,
    RatingModule,
    ScrollPanelModule,
    CarouselModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    DataTableViewComponent
  ]
})
export class SharedModule { }
