import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Observable,
  map,
  tap,
  switchMap,
  pluck,
  mergeMap,
  of,
  filter,
  toArray,
  share,
  throwError,
  catchError,
  retry
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey: string = environment.openWeatherApiKey;
  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}
  getForecast() {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'imperial')
          .set('appid', this.apiKey);
      }),
      switchMap((params) =>
        this.http.get<OpenWeatherResponse>(this.url, { params })
      ),
      pluck('list'),
      mergeMap((value) => of(...value)),
      filter((value, index) => index % 8 === 0),
      map((value) => {
        return {
          dateString: value.dt_txt,
          temp: value.main.temp,
        };
      }),
      toArray(),
      share()
    );
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      console.log('trying to get location...');
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      retry(2),
      tap(() => {
        this.notificationsService.addSuccess('Got your location!');
      }, 
        catchError((err) => {
          // #1 handle the error
          this.notificationsService.addError('Failed to get your location!');
          // #2 return a new Observable
          // alternative code is return throwError(err), however it is now deprecated.
          return new Observable(observer => {
            observer.error(err);
          });
        
        })
      )
    );
  }
}
