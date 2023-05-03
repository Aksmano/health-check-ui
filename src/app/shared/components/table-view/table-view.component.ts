import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { UserType } from 'src/app/data/model/common/UserType';

export enum TableViewType {
  Doctor = 'Doctor',
  Patient = 'Patient',
  Receptionist = 'Receptionist',
  Admin = 'Admin',
  Department = 'Department'
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit{
  @Input() public viewType: TableViewType = TableViewType.Doctor;
  @Input() public values: any[] = [];
  @Input() public loadingValues: boolean = false;
  @Input() public rows: number = 0;
  @Input() public paginator: boolean = false;
  @Input() public classNames: string = '';

  public getRows = () => this.rows > 0 ? this.rows : 1000;

  constructor(
    private readonly navigationService: NavigationService,
    private readonly keycloak: KeycloakService
  ) {
    console.log(this.values)
  }
  ngOnInit(): void {
    if(this.viewType === TableViewType.Department && !this.keycloak.isUserInRole(UserType.Superadmin)) {
      this.navigationService.navigateInSuperadminPanel([], {});
    }
    console.log(this.values);
  }
}
