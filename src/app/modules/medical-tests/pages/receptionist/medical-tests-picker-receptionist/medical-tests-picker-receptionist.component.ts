import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DepartmentServiceImpl } from "../../../../../data/services/department/department.service";
import { DepartmentRS } from "../../../../../data/model/dto/rs/DepartmentRS";
import { ToastService } from "../../../../../core/services/toast/toast.service";
import { TestType } from "../../../../../data/model/common/TestType";
import { NavigationService } from "../../../../../core/services/navigation/navigation.service";
import { getFriendlyEnumName } from "../../../../../utils";
import { ReceptionistService } from 'src/app/data/services/receptionist/receptionist.service';
import { UserInfo } from 'src/app/core/user-info';
import { UserType } from 'src/app/data/model/common/UserType';

@Component({
  selector: 'app-medical-tests-picker-receptionist',
  templateUrl: './medical-tests-picker-receptionist.component.html',
  styleUrls: ['./medical-tests-picker-receptionist.component.scss']
})
export class MedicalTestsPickerReceptionistComponent implements OnInit, OnDestroy {

  protected departmentId?: number;
  protected department?: DepartmentRS;
  protected types = Object.keys(TestType).filter((item) => {
    return isNaN(Number(item));
  }).map(typeValue => {
    return { value: typeValue }
  });

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly departmentService: DepartmentServiceImpl,
    private readonly toastService: ToastService,
    protected readonly navigationService: NavigationService,
    private readonly receptionistService: ReceptionistService
  ) {
  }

  ngOnInit(): void {
    if (UserInfo.role === UserType.Receptionist && !!UserInfo.profile) {
      this.receptionistService.getDepartmentByReceptionistId(UserInfo.profile.id!)
        .subscribe({
          next: dept => {
            this.departmentId = dept.id;
            this.department = dept;
          },
          error: err => {
            this.toastService.showError('Error during downloading department data, try again later')
          }
        })
    }
  }

  ngOnDestroy(): void {
  }

  getTestTypeName(value: string) {
    return getFriendlyEnumName(value);
  }
}
