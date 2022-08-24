import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/models/Products';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private api: ApiService, private auth: AuthService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.auth.$loggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.loadProducts();
      }
    });
  }

  loadProducts() {
    this.api.list('products').subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  async openProduct(product: Product) {
    const modal = await this.modalCtrl.create({
      component: ProductItemComponent,
      componentProps: { product: product },
    });
    modal.onDidDismiss().then((result) => {
      if (result.data.Description && result.data.Description !== 'All Vehicles') {
        
      }
    });
    return await modal.present();
  }
}
