import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MedicalTestsRoutingModule} from './medical-tests-routing.module';
import {
  MedicalTestsSearchPatientComponent
} from './pages/patient/medical-tests-search-patient/medical-tests-search-patient.component';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {
  MedicalTestsSchedulesPatientComponent
} from './pages/patient/medical-tests-schedules-patient/medical-tests-schedules-patient.component';
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {CarouselModule} from "primeng/carousel";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {DialogModule} from "primeng/dialog";
import {MedicalTestsPatientComponent} from './pages/patient/medical-tests-patient/medical-tests-patient.component';
import {TimelineModule} from "primeng/timeline";
import {CardModule} from "primeng/card";
import {
  MedicalTestsAllPatientComponent
} from './pages/patient/medical-tests-all-patient/medical-tests-all-patient.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {TagModule} from "primeng/tag";
import {
  MedicalTestsInsertSchedulesReceptionistComponent
} from './pages/receptionist/medical-tests-insert-schedules-receptionist/medical-tests-insert-schedules-receptionist.component';
import {
  MedicalTestsCreateVisitReceptionistComponent
} from './pages/receptionist/medical-tests-create-visit-receptionist/medical-tests-create-visit-receptionist.component';
import {
  MedicalTestsVisitsReceptionistComponent
} from './pages/receptionist/medical-tests-visits-receptionist/medical-tests-visits-receptionist.component';
import {
  MedicalTestsReceptionistComponent
} from './pages/receptionist/medical-tests-receptionist/medical-tests-receptionist.component';
import {
  MedicalTestsPickerReceptionistComponent
} from './pages/receptionist/medical-tests-picker-receptionist/medical-tests-picker-receptionist.component';
import {CalendarModule} from "primeng/calendar";
import {PaginatorModule} from "primeng/paginator";
import {FileUploadModule} from "primeng/fileupload";

@NgModule({
  declarations: [
    MedicalTestsSearchPatientComponent,
    MedicalTestsSchedulesPatientComponent,
    MedicalTestsPatientComponent,
    MedicalTestsAllPatientComponent,
    MedicalTestsInsertSchedulesReceptionistComponent,
    MedicalTestsCreateVisitReceptionistComponent,
    MedicalTestsVisitsReceptionistComponent,
    MedicalTestsReceptionistComponent,
    MedicalTestsPickerReceptionistComponent,
  ],
    imports: [
        CommonModule,
        MedicalTestsRoutingModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        TableModule,
        ToolbarModule,
        CarouselModule,
        ScrollPanelModule,
        DialogModule,
        TimelineModule,
        CardModule,
        TagModule,
        SharedModule,
        CalendarModule,
        PaginatorModule,
        FileUploadModule
    ]
})
export class MedicalTestsModule {
}
