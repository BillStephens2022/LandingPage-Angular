import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockListComponent } from './stock-list/stock-list.component';



@NgModule({
  declarations: [
    StockListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StockListComponent
  ]
})
export class StocksModule { }
