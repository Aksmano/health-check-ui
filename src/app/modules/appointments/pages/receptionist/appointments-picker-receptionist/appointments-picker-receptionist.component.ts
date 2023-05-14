import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DepartmentServiceImpl } from "../../../../../data/services/department/department.service";
import { DepartmentRS } from "../../../../../data/model/dto/rs/DepartmentRS";
import { ToastService } from "../../../../../core/services/toast/toast.service";
import { TestType } from "../../../../../data/model/common/TestType";
import { NavigationService } from "../../../../../core/services/navigation/navigation.service";
import { getFriendlyEnumName } from "../../../../../utils";
import { specializationDropdownList } from 'src/app/data/model/common/Specialization';

@Component({
  selector: 'app-appointments-picker-receptionist',
  templateUrl: './appointments-picker-receptionist.component.html',
  styleUrls: ['./appointments-picker-receptionist.component.scss']
})
export class AppointmentsPickerReceptionistComponent implements OnInit, OnDestroy {

  protected departmentId: number = 1257;
  protected department?: DepartmentRS;
  protected specializations = specializationDropdownList;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly departmentService: DepartmentServiceImpl,
    private readonly toastService: ToastService,
    protected readonly navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.departmentService.getDepartmentById(this.departmentId).subscribe({
      next: data => {
        this.department = data;
      }, error: err => {
        this.toastService.showError('Error during downloading department data.')
      }
    })
  }

  ngOnDestroy(): void {
  }

  getTestTypeName(value: string) {
    return getFriendlyEnumName(value);
  }
}