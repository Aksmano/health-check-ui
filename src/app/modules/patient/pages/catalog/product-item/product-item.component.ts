import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { MedicalOfferItem } from 'src/app/data/model/entities/MedicalOffer';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() offer: MedicalOfferItem = {} as MedicalOfferItem;

  constructor(
    private readonly navigationService: NavigationService
  ) { }

  public redirectToOfferPage() {
    this.navigationService.toPatientsPortal(['catalog', `${this.offer.id}`])
  }
}
