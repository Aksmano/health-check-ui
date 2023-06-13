import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import {
  Specialization,
  specializationDropdownList,
} from 'src/app/data/model/common/Specialization';
import { DoctorRQ } from 'src/app/data/model/dto/rq/employeeRQ/DoctorRQ';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { EntityView } from '../../entity-view.abstract';
import { UserInfo } from 'src/app/core/user-info';
import { UserType } from 'src/app/data/model/common/UserType';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.scss'],
})
export class DoctorViewComponent extends EntityView {
  valueRS: DoctorRS = {} as DoctorRS;
  valueRQ: DoctorRQ = {} as DoctorRQ;

  readonly specializations = specializationDropdownList;

  selectedSpec: any = this.specializations[0];

  constructor(
    private readonly doctorService: DoctorServiceImpl,
    private readonly navigationService: NavigationService,
    override readonly route: ActivatedRoute,
    override readonly toastService: ToastService
  ) {
    super(toastService);
  }

  ngOnInit(): void {
    // console.log(this.route, this.navigationService);

    this.route.queryParamMap.subscribe((params) => {
      this.queryParamsChanged(params);

      if (!!params.get('deptId')) {
        this.valueRQ.departmentId = parseInt(params.get('deptId')!);
      } else if (UserInfo.role === UserType.Admin && !!UserInfo.deptId) {
        this.valueRQ.departmentId = UserInfo.deptId;
      }
    });
  }

  override queryParamsModifyMode(params: ParamMap): void {
    if (!!this.id)
      this.doctorService.getDoctorById(this.id).subscribe({
        next: (value) => {
          this.valueRS = value;
          this.operationOngoing = false;
          this.selectedSpec = this.specializations.find(
            (spec) => spec.code === value.specialization.toString()
          );
        },
        error: () => {
          this.operationOngoing = false;
        },
        complete: () => {
          this.operationOngoing = false;
        },
      });
  }

  override queryParamsCreateMode(params: ParamMap): void {}

  createEntity() {
    this.operationOngoing = true;
    this.valueRQ.specialization = this.selectedSpec.code;
    this.doctorService.createDoctor(this.valueRQ).subscribe({
      next: (res) => {
        this.valueRQ = {} as DoctorRQ;
        this.createEntitySuccess();
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          mode: 'modify',
          type: 'doctor',
          id: res.doctorUUID,
        });
      },
      error: (err) => {
        this.operationOngoing = false;
        this.createEntityError();
      },
    });
  }

  setSpecialization(spec: any) {
    this.valueRQ.specialization = spec.value.code;
    console.log(this.valueRQ.specialization);
  }

  updateEntity() {
    // throw new Error('Method not implemented.');
  }

  deleteEntity() {
    this.operationOngoing = true;
    this.doctorService.deleteDoctorById(this.valueRS.doctorUUID).subscribe({
      next: (res) => {
        this.valueRQ = {} as DoctorRQ;
        this.deleteEntitySuccess()
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          mode: 'create',
          type: 'doctor',
        });
      },
      error: (err) => {
        this.operationOngoing = false;
        this.deleteEntityError();
      },
    });
  }

  override navigate(): void {
    // throw new Error('Method not implemented.');
  }
}
