import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private prevUrl: string;
  private currUrl: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
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

  public set previousUrl(prevUrl: string) { this.prevUrl = prevUrl }
  public get previousUrl() { return this.prevUrl; }

  public set currentUrl(currUrl: string) { this.currUrl = currUrl }
  public get currentUrl() { return this.currUrl; }

  public toLocation(path: string[] = [], extras?: NavigationExtras) {
    this.router.navigate([...path], { ...extras, relativeTo: this.route })
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

  public toContact() {
    this.router.navigate(['/app/contact']);
  }
}
