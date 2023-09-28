import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, switchMap, pluck, mergeMap, of, filter, toArray, share } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  private url = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?'
  private apiKey: string = environment.polygonApiKey;
  constructor(private http: HttpClient) {}
  getStockQuotes(): Observable<any> {
    const params = new HttpParams().set('apiKey', this.apiKey);

    return this.http.get(this.url, { params });
  }

}
