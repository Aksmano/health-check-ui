import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { Specialization, specializationDropdownList } from 'src/app/data/model/common/Specialization';
import { DoctorRQ } from 'src/app/data/model/dto/rq/employeeRQ/DoctorRQ';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { EntityView } from '../../entity-view.abstract';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.scss']
})
export class DoctorViewComponent extends EntityView {
  valueRS: DoctorRS = {} as DoctorRS;
  valueRQ: DoctorRQ = {} as DoctorRQ;

  selectedSpec: any;

  readonly specializations = specializationDropdownList;

  constructor(
    private readonly doctorService: DoctorServiceImpl,
    private readonly navigationService: NavigationService,
    override readonly route: ActivatedRoute,
  ) { super(); }

  ngOnInit(): void {
    console.log(this.route, this.navigationService);

    this.route.queryParamMap
      .subscribe(params => {
        this.queryParamsChanged(params)

        if (!!params.get('deptId')) {
          this.valueRQ.departmentId = parseInt(params.get('deptId')!)
        }
      });
  }

  override queryParamsModifyMode(params: ParamMap): void {
    if (!!this.id)
      this.doctorService.getDoctorById(this.id)
        .subscribe({
          next: value => {
            this.valueRS = value;
            this.operationOngoing = false;
            this.selectedSpec = this.specializations.find(spec => spec.name === value.specialization.toString())
          },
          error: () => {
            this.operationOngoing = false;
          },
          complete: () => {
            this.operationOngoing = false;
          }
        });
  }

  override queryParamsCreateMode(params: ParamMap): void {

  }

  createEntity() {
    this.operationOngoing = true;
    this.doctorService.createDoctor(this.valueRQ)
      .subscribe(res => {
        this.valueRQ = {} as DoctorRQ;
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          'mode': 'modify',
          'type': 'doctor',
          'id': res.doctorUUID
        });
      });
  }

  setSpecialization(spec: any) {
    this.valueRQ.specialization = Specialization[parseInt(spec.value.code)];
    console.log(this.valueRQ.specialization);
  }

  updateEntity() {
    // throw new Error('Method not implemented.');
  }

  deleteEntity() {
    this.operationOngoing = true;
    this.doctorService.deleteDoctorById(this.valueRS.doctorUUID)
      .subscribe(res => {
        this.valueRQ = {} as DoctorRQ;
        this.navigationService.navigateInSuperadminPanel(['entity-view'], {
          'mode': 'create',
          'type': 'doctor'
        });
      });
  }

  override navigate(): void {
    // throw new Error('Method not implemented.');
  }
}
