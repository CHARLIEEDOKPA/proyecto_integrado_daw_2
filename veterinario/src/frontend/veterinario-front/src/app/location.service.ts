import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient:HttpClient) { }

  getLocation(): Observable<GeolocationPosition> {
    return Observable.create((observer: { next: (arg0: GeolocationPosition) => void; complete: () => void; error: (arg0: string | GeolocationPositionError) => void; }) => {
        if(window.navigator && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    observer.next(position);
                    observer.complete();
                },
                (error) => observer.error(error)
            );
        } else {
            observer.error('Unsupported Browser');
        }
    });
}

}
