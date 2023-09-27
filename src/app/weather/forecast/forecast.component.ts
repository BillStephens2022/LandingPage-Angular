import { Component } from '@angular/core';
import { ForecastService } from '../forecast.service';

interface ForecastData {
  dateString: string;
  temp: number;
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent {
  forecastData: ForecastData[] = [];
  constructor(forecastService: ForecastService) {
    forecastService.getForecast().subscribe((forecastData) => {
      this.forecastData = forecastData;
    });
  }
}
