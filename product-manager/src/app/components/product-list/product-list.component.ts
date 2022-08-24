import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  private unsubscribe = new Subject();

  products: Product[] = [];

  constructor(
    private api: ApiService, 
    private auth: AuthService, 
    private modalCtrl: ModalController, 
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.auth.$loggedIn.pipe(takeUntil(this.unsubscribe)).subscribe(loggedIn => {
      if (loggedIn) {
        this.loadProducts();
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadProducts() {
    this.api.get('products').pipe(takeUntil(this.unsubscribe)).subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  async openProduct(product: Product, isNew = false) {
    const modal = await this.modalCtrl.create({
      component: ProductItemComponent,
      componentProps: { product: product, isNew: isNew },
    });
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const product = <Product>result.data;
        if (product.id) {
          this.api.put('products/' + product.id, product).pipe(takeUntil(this.unsubscribe)).subscribe(product => {});
        } else {
          this.api.post('products', product).pipe(takeUntil(this.unsubscribe)).subscribe(product => {
            if (product) {
              this.products.push(<Product>product);
            }
          });
        }     
      }
    });
    return await modal.present();
  }
  
  async removeProduct(product: Product) {
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete ${product.name}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.api.delete('products/' + product.id).pipe(takeUntil(this.unsubscribe)).subscribe(product => {
              this.loadProducts();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  addNewProduct() {
    let newProduct = new Product();
    newProduct.stock_id = 1;
    this.openProduct(newProduct, true);
  }
}
