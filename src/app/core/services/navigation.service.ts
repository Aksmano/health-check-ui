import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.router.events.subscribe((event) => {
      console.log(event);
      
    })
  }

  public toMainPage() {
    this.router.navigate(['/app'])
  }

  public toPatientsPortal() {
    this.router.navigate(['/app/patient']) //, { relativeTo: this.route })
  }

  public toDoctorsPortal() {
    this.router.navigate(['/app/doctor'])
  }

  public toContact() {
    this.router.navigate(['/app/contact'])
  }
}
