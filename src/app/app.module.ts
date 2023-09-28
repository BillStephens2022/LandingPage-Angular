import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { WeatherModule } from './weather/weather.module';
import { StocksModule } from './stocks/stocks.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherModule,
    StocksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
