import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule }   from '@angular/forms';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { DataViewModule } from 'primeng/dataview';
import { ProductItemComponent } from './pages/catalog/product-item/product-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    CatalogComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ButtonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    AutoCompleteModule,
    DataViewModule,
    SharedModule
  ]
})
export class PatientModule { }
