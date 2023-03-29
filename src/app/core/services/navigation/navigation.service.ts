import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  public toMainPage() {
    this.router.navigate(['/app'])
  }

  public toPatientsPortal(path: string[] = [], extras?: NavigationExtras) {
    this.router.navigate(['/app/patient', ...path], { ...extras, relativeTo: this.route })
  }

  public toDoctorsPortal(path: string[] = [], extras?: NavigationExtras) {
    this.router.navigate(['/app/doctor', ...path], { ...extras })
  }

  public toContact() {
    this.router.navigate(['/app/contact'])
  }
}
