import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Params, Router } from '@angular/router';
import { UserInfo } from '../../user-info';
import { UserType } from 'src/app/data/model/common/UserType';

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
    let panelType = 'panel';
    if (UserInfo.role === UserType.Superadmin) {
      panelType = 'superpanel'
    }
    window.open(`${window.location.origin}/app/admin/${panelType}`, '_blank');
  }

  public navigateInSuperadminPanel(path: string[] = [], params: Params) {
    let panelType = 'panel';
    if (UserInfo.role === UserType.Superadmin) {
      panelType = 'superpanel'
    }

    this.router.navigate(['app', 'admin', panelType, ...path], {
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
