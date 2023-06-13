import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentServiceImpl } from '../../../../../data/services/department/department.service';
import { DepartmentRS } from '../../../../../data/model/dto/rs/DepartmentRS';
import { ToastService } from '../../../../../core/services/toast/toast.service';
import { TestType } from '../../../../../data/model/common/TestType';
import { NavigationService } from '../../../../../core/services/navigation/navigation.service';
import { getFriendlyEnumName } from '../../../../../utils';
import { specializationDropdownList } from 'src/app/data/model/common/Specialization';
import { ReceptionistService } from 'src/app/data/services/receptionist/receptionist.service';
import { UserInfo } from 'src/app/core/user-info';

@Component({
  selector: 'app-appointments-picker-receptionist',
  templateUrl: './appointments-picker-receptionist.component.html',
  styleUrls: ['./appointments-picker-receptionist.component.scss'],
})
export class AppointmentsPickerReceptionistComponent
  implements OnInit, OnDestroy
{
  protected departmentId?: number;
  protected department?: DepartmentRS;
  protected specializations = specializationDropdownList;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    // private readonly departmentService: DepartmentServiceImpl,
    private readonly receptionistService: ReceptionistService,
    private readonly toastService: ToastService,
    protected readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.receptionistService
      .getDepartmentByReceptionistId(UserInfo.profile?.id!)
      .subscribe({
        next: (data) => {
          this.department = data;
          this.departmentId = data.id;
        },
        error: (err) => {
          this.toastService.showError(
            'Error during downloading department data.'
          );
        },
      });
  }

  ngOnDestroy(): void {}

  getTestTypeName(value: string) {
    return getFriendlyEnumName(value);
  }
}
