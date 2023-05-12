import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {MedicalTestsService} from "../../../../../data/services/medical-test/medical-tests.service";
import {MedicalTestRS} from "../../../../../data/model/dto/rs/MedicalTestRS";
import {ToastService} from "../../../../../core/services/toast/toast.service";
import {DepartmentRS} from "../../../../../data/model/dto/rs/DepartmentRS";
import {DepartmentServiceImpl} from "../../../../../data/services/department/department.service";
import {TestStatus} from "../../../../../data/model/common/TestStatus";
import {NavigationService} from "../../../../../core/services/navigation/navigation.service";
import {TestType} from 'src/app/data/model/common/TestType';
import {Address} from 'src/app/data/model/dto/common/Address';
import {getFriendlyEnumName, getUserFriendlyAddress} from 'src/app/utils';

@Component({
  selector: 'app-medical-test-patient',
  templateUrl: './medical-tests-patient.component.html',
  styleUrls: ['./medical-tests-patient.component.scss']
})
export class MedicalTestsPatientComponent implements OnInit, OnDestroy {
  protected medicalTest: MedicalTestRS | undefined
  protected department: DepartmentRS | undefined;
  // protected medicalTest: MedicalTestRS | undefined = {
  //   departmentId: 910,
  //   departmentName: "Oddzial na wybickiego",
  //   id: 150,
  //   medicalTestResultId: 214,
  //   patientUUID: "787b112f-0689-48fb-af11-7ca5674f363e",
  //   testDateTime: new Date("2023-05-11T08:30:00"),
  //   testStatus: TestStatus.NOT_PERFORMED,
  //   type: TestType.AUDIOMETRY
  // };
  // protected department: DepartmentRS | undefined = { "id": 910, "name": "Oddzial na wybickiego", "address": { "country": "PL", "city": "Krakow", "street": "Wybickiego", "houseNumber": "56", "apartmentNumber": "106", "postalCode": "12-123", "post": "Krakow Lobzow", "county": "krakowski", "province": "Malopolskie" } };
  protected showDateVisible: boolean = false;
  testSubscription: Subscription | undefined;
  private pathSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,
              private readonly medicalTestService: MedicalTestsService,
              private readonly toastService: ToastService,
              private readonly departmentService: DepartmentServiceImpl,
              private readonly navigationService: NavigationService) {
  }

  ngOnInit() {
    this.removeSubscriptions()
    this.pathSubscription = this.route.params.subscribe(params => {
      this.testSubscription = this.medicalTestService.getMedicalTestById(params['id'])
        .subscribe({
          next: data => {
            this.medicalTest = data;
            this.medicalTest.testDateTime = new Date(this.medicalTest.testDateTime);
            console.log(this.medicalTest);
            this.departmentService.getDepartmentById(this.medicalTest.departmentId)
              .subscribe({
                next: data => {
                  this.department = data
                },
                error: err => {
                  this.toastService.showError('Error during fetching department. Try again later.')
                }
              })
          },
          error: err => {
            this.toastService.showError('Error during fetching test. Try again later.')
          }
        })
    });
  }

  ngOnDestroy(): void {
    this.removeSubscriptions();
  }


  public getFriendlyAddress(address: Address) {
    return `${getUserFriendlyAddress(address)}, ${address.city}`;
  }

  public getEnumValueName(constEnumValue: string) {
    return getFriendlyEnumName(constEnumValue);
  }

  public linkToGoogleMaps(address: Address) {
    const baseUrl = "https://www.google.com/maps/search/";  //wybickiego+14+krakow
    const linkEnd = getUserFriendlyAddress(address).replace('/', '+').replace(' ', '+') + '+' + address.city;

    return new URL(baseUrl + linkEnd);
  }

  public friendlyDateTime(date: Date) {
    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
  }

  public tabColor(testStatus: TestStatus) {
    switch (testStatus) {
      case TestStatus.DONE:
        return "success";
      case TestStatus.NOT_PERFORMED:
        return "info";
      case TestStatus.WAITING_FOR_RESULT:
        return "warning";
    }
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
      }, error => {
        this.toastService.showError('Error during fetching results.')
      })
  }

  deleteMedicalTest() {
    this.medicalTestService.deleteMedicalTest(this.medicalTest?.id!)
      .subscribe(data => {
        this.toastService.showSuccess('Deleted successfully.')
        setTimeout(() => {
          this.navigationService.toMedicalTestsPortal();
        }, 1000);
      }, error => {
        this.toastService.showError('Error during deleting test. Try again later.')
      })
  }
}
