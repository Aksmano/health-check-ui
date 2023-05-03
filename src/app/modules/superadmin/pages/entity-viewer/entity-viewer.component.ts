import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { MainEntityType } from 'src/app/data/model/common/MainEntityType';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { ReceptionistService } from 'src/app/data/services/receptionist/receptionist.service';

@Component({
  selector: 'app-entity-viewer',
  templateUrl: './entity-viewer.component.html',
  styleUrls: ['./entity-viewer.component.scss']
})
export class EntityViewerComponent {
  viewValue: any = {};

  currentType: string | null = MainEntityType.Doctor;
  currentMode: string | null = '';
  currentId: string | null = '';
  readonly viewType = MainEntityType;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute
  ) {
    this.route.queryParamMap
      .subscribe(params => {
        const mode = params.get('mode');
        const type = params.get('type');
        const id = params.get('id');

        if (mode === 'create') {
          this.currentMode = mode;

          switch (type?.toLowerCase()) {
            case MainEntityType.Department.toLowerCase():
              this.currentType = MainEntityType.Department;
              console.log(this.currentType);
              break;
            case MainEntityType.Patient.toLowerCase():
              this.currentType = MainEntityType.Patient;
              break;
            case MainEntityType.Doctor.toLowerCase():
              this.currentType = MainEntityType.Doctor;
              break;
            case MainEntityType.Receptionist.toLowerCase():
              this.currentType = MainEntityType.Receptionist;
              break;
            case MainEntityType.Admin.toLowerCase():
              this.currentType = MainEntityType.Admin;
              break;
          }
        } else if (mode === 'modify') {
          if (!id) {
            this.navigationService.navigateInSuperadminPanel([], {});
            return;
          } else {
            this.currentMode = mode;
            this.currentId = id;

            switch (type?.toLowerCase()) {
              case MainEntityType.Department.toLowerCase():
                this.currentType = MainEntityType.Department;
                break;
              case MainEntityType.Patient.toLowerCase():
                this.currentType = MainEntityType.Patient;
                break;
              case MainEntityType.Doctor.toLowerCase():
                this.currentType = MainEntityType.Doctor;
                break;
              case MainEntityType.Receptionist.toLowerCase():
                this.currentType = MainEntityType.Receptionist;
                break;
              case MainEntityType.Admin.toLowerCase():
                this.currentType = MainEntityType.Admin;
                break;
            }
          }
        }
      })
  }

  navigate(view: string) {
    const params: Params = {
      'mode': 'create',
      'type': view,
    };

    this.navigationService.navigateInSuperadminPanel(['entity-view'], params);
  }

  getCurrentButtonStyle(view: string) {
    return this.currentType === view
      ? 'bg-teal-500 text-white'
      : 'text-700 transition-colors transition-duration-100 hover:bg-teal-300 hover:text-50';
  }
}
