import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TestType} from "../../../../../data/model/common/TestType";
import {MedicalTestSchedulesService} from "../../../services/medical-test-schedules.service";

@Component({
  selector: 'app-medical-test-schedules-patient',
  templateUrl: './medical-test-schedules-patient.component.html',
  styleUrls: ['./medical-test-schedules-patient.component.scss']
})
export class MedicalTestSchedulesPatientComponent implements OnInit {

  private departmentId: number | undefined;
  private testType: string | undefined;

  constructor(private route: ActivatedRoute,
              private medicalTestScheduleService: MedicalTestSchedulesService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          this.departmentId = params['departmentId'];
          this.testType = params['testType'];
        }
      );
  }
}
