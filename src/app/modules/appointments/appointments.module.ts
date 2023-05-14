import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SearchComponent } from './pages/search/search.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SharedModule } from "../../shared/shared.module";
import { SearchTableComponent } from './pages/search-table/search-table.component';
import { DoctorsScheduleDetailsComponent } from './pages/doctors-schedule-details/doctors-schedule-details.component';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    SearchComponent,
    SearchTableComponent,
    DoctorsScheduleDetailsComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    ButtonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    AutoCompleteModule,
    DataViewModule,
    DividerModule,
    RatingModule,
    ScrollPanelModule,
    CarouselModule,
    DropdownModule,
    KeyFilterModule,
    SharedModule,
    DialogModule
  ]
})
export class AppointmentsModule { }
