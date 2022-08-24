import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Products';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product = null;

  constructor() { }

  ngOnInit() {}

  save() {

  }

  cancel() {
    
  }
}
