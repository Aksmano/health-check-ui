import { Component, Input } from '@angular/core';
import { MedicalOfferItem } from 'src/app/data/model/entities/MedicalOffer';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() offerItem: MedicalOfferItem = {} as MedicalOfferItem;
}
