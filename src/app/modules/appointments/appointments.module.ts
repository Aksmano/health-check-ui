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
import { SharedModule } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';


@NgModule({
  declarations: [
    SearchComponent
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
    SharedModule,
    DividerModule,
    RatingModule,
    ScrollPanelModule,
    CarouselModule,
    DropdownModule,
    KeyFilterModule
  ]
})
export class AppointmentsModule { }
