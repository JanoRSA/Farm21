import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/models/Products';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product = null;
  @Input() isNew = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  save() {
    this.modalCtrl.dismiss(this.product);
  }

  cancel() {
    this.modalCtrl.dismiss(null);
  }
}
