import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicalTestRS } from "../../../../../data/model/dto/rs/MedicalTestRS";
import { MedicalTestsService } from "../../../../../data/services/medical-test/medical-tests.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ToastService } from "../../../../../core/services/toast/toast.service";
import { NavigationService } from "../../../../../core/services/navigation/navigation.service";
import { TestStatus } from "../../../../../data/model/common/TestStatus";
import { getFriendlyEnumName } from 'src/app/utils';

@Component({
  selector: 'app-medical-tests-all-patient',
  templateUrl: './medical-tests-all-patient.component.html',
  styleUrls: ['./medical-tests-all-patient.component.scss']
})
export class MedicalTestsAllPatientComponent implements OnInit, OnDestroy {

  protected medicalTests: MedicalTestRS[] | undefined;

  private pathSubscription: Subscription | undefined;
  private testsSubscription: Subscription | undefined;

  constructor(protected medicalTestsService: MedicalTestsService,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.removeSubscriptions()
    this.pathSubscription = this.route.params.subscribe(params => {
      this.testsSubscription = this.medicalTestsService.getAllByPatientId(params['id']).subscribe(data => {
        this.medicalTests = data;
        this.medicalTests = this.medicalTests.sort((a, b) => {
          return new Date(b.testDateTime).getTime() - new Date(a.testDateTime).getTime()
        })
        console.log(this.medicalTests)
      }, error => {
        this.toastService.showError('Error during downloading tests. Try again later.')
      })
    });
  }

  getFriendlyEnum(text: string) {
    return getFriendlyEnumName(text);
  }

  ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  removeSubscriptions(): void {
    if (this.pathSubscription) {
      this.pathSubscription.unsubscribe();
    }
    if (this.testsSubscription) {
      this.testsSubscription.unsubscribe();
    }
  }

  goToTest(id: number): void {
    this.navigationService.toMedicalTestById(id);
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
