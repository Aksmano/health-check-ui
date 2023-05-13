import {Component, OnDestroy, OnInit} from '@angular/core';
import {TestType} from "../../../../../data/model/common/TestType";
import {MedicalTestRS} from "../../../../../data/model/dto/rs/MedicalTestRS";
import {getTypesAsDropdownItem} from "../../../utils/TestTypeUtils";
import {ToastService} from "../../../../../core/services/toast/toast.service";
import {NavigationService} from "../../../../../core/services/navigation/navigation.service";
import {MedicalTestsService} from "../../../../../data/services/medical-test/medical-tests.service";
import {ActivatedRoute} from "@angular/router";
import {TestStatus} from "../../../../../data/model/common/TestStatus";
import {BehaviorSubject} from "rxjs";
import {MedicalTestCriteriaQP} from "../../../qp/medical-test-criteria-qp";

@Component({
  selector: 'app-medical-test-visits-receptionist',
  templateUrl: './medical-tests-visits-receptionist.component.html',
  styleUrls: ['./medical-tests-visits-receptionist.component.scss']
})
export class MedicalTestsVisitsReceptionistComponent implements OnInit, OnDestroy {
  protected selectedTestType: any;
  protected startDate: Date | undefined;
  protected endDate: Date | undefined;
  protected visits: MedicalTestRS[] | undefined;
  public testTypes: any[] | undefined;
  protected departmentId: number | undefined;

  constructor(private readonly toastService: ToastService,
              protected readonly navigationService: NavigationService,
              private readonly medicalTestsService: MedicalTestsService,
              private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.testTypes = getTypesAsDropdownItem();
    this.activatedRoute.params.subscribe(params => {
        this.departmentId = parseInt(params['departmentId']);

        this.medicalTestsService.getMedicalTestsByDepartmentId(this.departmentId).subscribe(data => {
          this.visits = data;
          console.log(this.visits)
        }, error => {
          this.toastService.showError('Error during fetching tests for department.')
        })
      }
    );
  }

  ngOnDestroy(): void {
  }

  getMessageByTestType(testStatus: string): string {
    if (testStatus == TestStatus.DONE.toString()) {
      return 'Done';
    }
    if (testStatus == TestStatus.WAITING_FOR_RESULT.toString()) {
      return 'Waiting for result';
    }
    return 'Not performed';
  }

  getSeverity(testStatus: string): string {
    if (testStatus == TestStatus.DONE.toString()) {
      return 'success';
    }
    if (testStatus == TestStatus.WAITING_FOR_RESULT.toString()) {
      return 'warning';
    }
    return 'danger';
  }

}
