import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent {
  stockQuotes$: Observable<any>;
  tickerSymbol: string = '';
  closingPrice: number = 0;
  constructor(private stocksService: StocksService) {
    this.stockQuotes$ = this.stocksService.getStockQuotes();
  }
  ngOnInit(): void {
    
    
    // Subscribe to the observable to receive and log the API response
    this.stockQuotes$.subscribe(
      (response) => {
        console.log('Stock Quotes Response:', response.results[0].c);
        this.tickerSymbol = response.ticker;
        this.closingPrice = response.results[0].c;
      },
      (error) => {
        console.error('Error fetching stock quotes:', error);
        // Handle errors here
      }
    );
  }
}
