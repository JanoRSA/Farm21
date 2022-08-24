import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductItemComponent } from '../components/product-item/product-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ProductListComponent, ProductItemComponent]
})
export class HomePageModule {}
