import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { specializationDropdownList } from 'src/app/data/model/common/Specialization';
import { Address } from 'src/app/data/model/dto/common/Address';
import { DepartmentRS } from 'src/app/data/model/dto/rs/DepartmentRS';
import { DoctorRS } from 'src/app/data/model/dto/rs/employeeRS/DoctorRS';
import { AppointmentService } from 'src/app/data/services/appointment/appointment.service';
import { DepartmentServiceImpl } from 'src/app/data/services/department/department.service';
import { DoctorServiceImpl } from 'src/app/data/services/doctor/doctor.service';
import { getUserFriendlyAddress } from 'src/app/utils';

interface DropdownData {
  name: string,
  code: string
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public departments?: DepartmentRS[];
  public availableDoctors?: DoctorRS[];

  public dropdownCities: DropdownData[] = [];
  public dropdownDepts: DropdownData[] = [];
  public readonly dropdownSpecializations: DropdownData[] = specializationDropdownList;

  public loadingDepartments = true;
  public loadingDoctors = false;

  public pickedCity = false;
  public pickedDept = false;
  public pickedSpec = false;

  public selectedCity?: DropdownData;
  public selectedDept?: DropdownData;
  public selectedSpec?: DropdownData;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly departmentService: DepartmentServiceImpl,
    private readonly doctorService: DoctorServiceImpl,
    private readonly toastService: ToastService,
    private readonly navigation: NavigationService
  ) {

  }

  ngOnInit(): void {
    this.departmentService.getDepartmentsByCriteria()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: res => {
          if (!!res) {
            this.departments = res;
            this.dropdownCities = Array.from((new Set(res.map(d => d.address.city))).values())
              .map(x => this.mapToDropdownItem(x));
            this.loadingDepartments = false;
          }
        },
        error: (err) => {
          this.toastService.showError("An error has occurred while loading departments data, try to search later");
        }
      })
  }

  public onCitySelect(city: any) {
    this.pickedCity = true;
    if (!!this.departments) {
      this.dropdownDepts = this.departments.filter(dept => dept.address.city === city.value.code)
        .map(dept => this.mapToDropdownItem(`${dept.name} (${this.getFriendlyAddress(dept.address)}, ${dept.address.city})`, dept.id.toString()));
    }
  }

  public getFriendlyAddress(address: Address) {
    return getUserFriendlyAddress(address);
  }

  public disabledDropdown() {
    return !this.pickedCity;
  }

  public disabledSearch() {
    console.log(!this.pickedSpec, !this.pickedDept, !this.pickedSpec && !this.pickedDept)
    return !this.pickedSpec && !this.pickedDept;
  }

  public searchForAvailableAppointments() {
    const params: { [key: string]: string } = {};

    if (!!this.pickedSpec) {
      params['specialization'] = this.selectedSpec!.code;
    }

    if (!!this.pickedDept) {
      params['departmentId'] = this.selectedDept!.code;
    }

    this.navigation.toAppointments(['search'], params);
  }

  private mapToDropdownItem(name: string, code?: string): DropdownData {
    return {
      name: name,
      code: code ?? name
    } as DropdownData
    // if(names.length !== codes.length)
    //   throw new Error("mapToDropdownItem: names and codes arrays have different lengths");

    // for(let i = 0; i < names.length; codes;)
  }
}
