import {Component, OnDestroy, OnInit} from '@angular/core';
import {MedicalTestRS} from "../../../../../data/model/dto/rs/MedicalTestRS";
import {DepartmentRS} from "../../../../../data/model/dto/rs/DepartmentRS";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MedicalTestsService} from "../../../../../data/services/medical-test/medical-tests.service";
import {ToastService} from "../../../../../core/services/toast/toast.service";
import {DepartmentServiceImpl} from "../../../../../data/services/department/department.service";
import {NavigationService} from "../../../../../core/services/navigation/navigation.service";
import {Address} from "../../../../../data/model/dto/common/Address";
import {getFriendlyEnumName, getUserFriendlyAddress} from "../../../../../utils";
import {TestStatus} from "../../../../../data/model/common/TestStatus";

@Component({
  selector: 'app-medical-test-receptionist',
  templateUrl: './medical-tests-receptionist.component.html',
  styleUrls: ['./medical-tests-receptionist.component.scss']
})
export class MedicalTestsReceptionistComponent implements OnInit, OnDestroy {
  protected medicalTest: MedicalTestRS | undefined
  protected department: DepartmentRS | undefined;
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

  uploadedFiles: any[] = [];

  uploadResult(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onFileUploadClicked(event: { files: Blob[] }) {
    console.log(event.files[0]);
    this.medicalTestService.addResult(this.medicalTest?.id!, event.files[0])
      .subscribe(data => {
        this.toastService.showSuccess('File uploaded successfully.')
        window.location.reload();
      }, error => {
        this.toastService.showError('Error during uploading file.')
      })
  }
}
