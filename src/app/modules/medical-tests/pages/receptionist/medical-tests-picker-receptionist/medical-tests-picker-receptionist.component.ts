import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DepartmentServiceImpl} from "../../../../../data/services/department/department.service";
import {DepartmentRS} from "../../../../../data/model/dto/rs/DepartmentRS";
import {ToastService} from "../../../../../core/services/toast/toast.service";
import {TestType} from "../../../../../data/model/common/TestType";
import {NavigationService} from "../../../../../core/services/navigation/navigation.service";

@Component({
  selector: 'app-medical-tests-picker-receptionist',
  templateUrl: './medical-tests-picker-receptionist.component.html',
  styleUrls: ['./medical-tests-picker-receptionist.component.scss']
})
export class MedicalTestsPickerReceptionistComponent implements OnInit, OnDestroy {

  protected departmentId: number = 910;
  protected department: DepartmentRS | undefined;
  protected types = Object.keys(TestType).filter((item) => {
    return isNaN(Number(item));
  }).map(typeValue => {
    return {value: typeValue}
  });

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly departmentService: DepartmentServiceImpl,
              private readonly toastService: ToastService,
              protected readonly navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.departmentService.getDepartmentById(this.departmentId).subscribe(data => {
      this.department = data;
    }, error => {
      this.toastService.showError('Error during downloading department data.')
    })
  }

  ngOnDestroy(): void {
  }

}
