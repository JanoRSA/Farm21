import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Products';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private api: ApiService, private auth: AuthService) { }

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
}
