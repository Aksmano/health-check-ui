import { OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserInfo } from 'src/app/core/user-info';
import { MainEntityType } from 'src/app/data/model/common/MainEntityType';
import { UserType } from 'src/app/data/model/common/UserType';

export abstract class EntityView {
  protected viewMode: string = '';
  protected entityType: MainEntityType = MainEntityType.Doctor;
  protected id?: string;

  protected operationOngoing = true;

  protected readonly route: ActivatedRoute;

  protected ngUnsubscribe = new Subject();

  constructor(protected readonly toastService: ToastService) {
    this.route = new ActivatedRoute();
  }

  protected queryParamsChanged(params: ParamMap) {
    const mode = params.get('mode');
    const type = params.get('type');
    console.log(params);

    if (!!mode && !!type) {
      this.viewMode = mode;
      this.getEntityType(type);

      if (this.viewMode === 'modify' && !!params.get('id')) {
        this.id = params.get('id') ?? undefined;
        this.operationOngoing = true;
        this.queryParamsModifyMode(params);
      } else if (this.viewMode === 'create') {
        this.operationOngoing = false;
        this.queryParamsCreateMode(params);
      }
    }
  }

  protected getEntityType(type: string) {
    switch (type.toLowerCase()) {
      case MainEntityType.Admin.toLowerCase():
        this.entityType = MainEntityType.Admin;
        break;
      case MainEntityType.Doctor.toLowerCase():
        this.entityType = MainEntityType.Doctor;
        break;
      case MainEntityType.Department.toLowerCase():
        this.entityType = MainEntityType.Department;
        break;
      case MainEntityType.Patient.toLowerCase():
        this.entityType = MainEntityType.Patient;
        break;
      case MainEntityType.Receptionist.toLowerCase():
        this.entityType = MainEntityType.Receptionist;
        break;
      default:
        this.entityType = MainEntityType.Doctor;
        break;
    }
  }

  isSuperadmin() {
    return UserInfo.role === UserType.Superadmin;
  }

  createEntityError() {
    this.toastService.showError(
      "Can't create entity. Check if all fields are correct or try again later."
    );
  }

  createEntitySuccess() {
    this.toastService.showSuccess('Entity has been created successfully!');
  }

  deleteEntityError() {
    this.toastService.showError(
      "Can't delete entity. Check if all fields are correct or try again later."
    );
  }

  deleteEntitySuccess() {
    this.toastService.showSuccess('Entity has been deleted successfully!');
  }

  abstract queryParamsModifyMode(params: ParamMap): void;
  abstract queryParamsCreateMode(params: ParamMap): void;

  abstract createEntity(): void;
  abstract updateEntity(): void;
  abstract deleteEntity(): void;

  abstract navigate(): void;
}
