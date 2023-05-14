import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Params, Router } from '@angular/router';
import { RoleService } from '../roles/role.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private prevUrl: string;
  private currUrl: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly roleService: RoleService
  ) {
    this.prevUrl = '';
    this.currUrl = this.router.url;
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.prevUrl = this.currUrl;
          this.currUrl = event.url;
          console.log('prevUrl', this.prevUrl);
          console.log('currUrl', this.currUrl);
        }
      })
  }

  public set previousUrl(prevUrl: string) {
    this.prevUrl = prevUrl
  }

  public get previousUrl() {
    return this.prevUrl;
  }

  public set currentUrl(currUrl: string) {
    this.currUrl = currUrl
  }

  public get currentUrl() {
    return this.currUrl;
  }

  public toLocation(path: string[] = [], extras?: NavigationExtras) {
    this.router.navigate([...path], { ...extras, relativeTo: this.route })
  }

  public toAppointments(path: string[] = [], params?: Params) {
    this.router.navigate(['app', 'appointments', ...path], { queryParams: params });
  }

  public toMainPage() {
    this.router.navigate(['/app']);
  }

  public toSuperadminPanel() {
    window.open(`${window.location.origin}/app/admin/superpanel`, '_blank');
  }

  public navigateInSuperadminPanel(path: string[] = [], params: Params) {

    this.router.navigate(['app', 'admin', 'superpanel', ...path], {
      relativeTo: this.route, queryParams: params
    });
  }

  public toPatientsPortal(path: string[] = [], extras?: NavigationExtras) {
    this.router.navigate(['/app/patient', ...path], { ...extras, relativeTo: this.route });
  }

  public toDoctorsPortal(path: string[] = [], extras?: NavigationExtras) {
    this.router.navigate(['/app/doctor', ...path], { ...extras });
  }

  public toMedicalTestsPortal(path: string[] = [], extras?: NavigationExtras) {
    if (this.roleService.hasRoleReceptionist()) {
      this.router.navigate(['/app/medical-tests/receptionist/search', ...path], { ...extras, relativeTo: this.route });
    } else if (this.roleService.hasRoleDoctor()) {
      this.router.navigate(['/app/medical-tests/doctor', ...path], { ...extras, relativeTo: this.route });
    } else if (this.roleService.hasRolePatient()) {
      this.router.navigate(['/app/medical-tests/patient/search', ...path], { ...extras, relativeTo: this.route });
    }
  }

  public toMedicalTestScheduleByDepartment(path: string[] = [], extras?: NavigationExtras) {
    this.router.navigate(['/app/medical-tests/patient/medical-test-schedules', ...path], {
      ...extras,
      relativeTo: this.route
    });
  }

  public toMedicalTestById(testId: number, path: string[] = [], extras?: NavigationExtras) {
    this.router.navigate(['/app/medical-tests/patient/medical-test-details/' + testId, ...path], {
      ...extras,
      relativeTo: this.route
    });
  }

  public toMedicalTestByPatient(patientId: string, path: string[] = [], extras?: NavigationExtras) {
    this.router.navigate(['/app/medical-tests/patient/medical-test-patient/' + patientId, ...path], {
      ...extras,
      relativeTo: this.route
    });
  }

  public toContact() {
    this.router.navigate(['/app/contact']);
  }
}
