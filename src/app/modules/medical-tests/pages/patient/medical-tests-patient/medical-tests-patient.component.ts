import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {MedicalTestsService} from "../../../../../data/services/medical-test/medical-tests.service";
import {MedicalTestRS} from "../../../../../data/model/dto/rs/MedicalTestRS";
import {ToastService} from "../../../../../core/services/toast/toast.service";
import {DepartmentRS} from "../../../../../data/model/dto/rs/DepartmentRS";
import {DepartmentServiceImpl} from "../../../../../data/services/department/department.service";
import {TestStatus} from "../../../../../data/model/common/TestStatus";

@Component({
  selector: 'app-medical-test-patient',
  templateUrl: './medical-tests-patient.component.html',
  styleUrls: ['./medical-tests-patient.component.scss']
})
export class MedicalTestsPatientComponent implements OnInit, OnDestroy {
  protected medicalTest: MedicalTestRS | undefined;
  protected department: DepartmentRS | undefined;
  testSubscription: Subscription | undefined;
  private pathSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,
              private readonly medicalTestService: MedicalTestsService,
              private readonly toastService: ToastService,
              private readonly departmentService: DepartmentServiceImpl) {
  }

  ngOnInit() {
    this.removeSubscriptions()
    this.pathSubscription = this.route.params.subscribe(params => {
      this.testSubscription = this.medicalTestService.getMedicalTestById(params['id'])
        .subscribe(data => {
          this.medicalTest = data;
          console.log(this.medicalTest);
          this.departmentService.getDepartmentById(this.medicalTest.departmentId)
            .subscribe(data => {
              this.department = data
            }, error => {
              this.toastService.showError('Error during fetching department. Try again later.')
            })
        }, error => {
          this.toastService.showError('Error during fetching test. Try again later.')
        })
    });
  }

  ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  private removeSubscriptions(): void {
    if (this.testSubscription) {
      this.testSubscription.unsubscribe();
    }
    if (this.pathSubscription) {
      this.pathSubscription.unsubscribe();
    }
  }

  isNotPerformed() {
    console.log(this.medicalTest)
    return this.medicalTest?.testStatus == TestStatus.NOT_PERFORMED;
  }

  isWaitingForResult() {
    return this.medicalTest?.testStatus == TestStatus.WAITING_FOR_RESULT;
  }

  isDone() {
    return this.medicalTest?.testStatus == TestStatus.DONE;
  }

  getResult() {
    this.medicalTestService.getMedicalTestResult(this.medicalTest?.id!)
      .subscribe(data => {
        const url = window.URL.createObjectURL(data);
        window.open(url);
      })
  }
}
