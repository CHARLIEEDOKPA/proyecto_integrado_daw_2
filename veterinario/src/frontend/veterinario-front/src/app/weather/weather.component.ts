import { LocationService } from './../location.service';
import { Component, OnInit, inject } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  private weatherService = inject(WeatherService);
  private locationService = inject(LocationService)
  weather!: Weather;

  ngOnInit(): void {
    this.locationService.getLocation().subscribe(x => {
      let latitud = x.coords.latitude
      let longitud = x.coords.longitude
      console.log(latitud)
      this.weatherService.getWeather(latitud,longitud).subscribe(x => console.log(x), error => {
        console.log(error)
      })
    })
  }

  getCondition() {
    return this.weather.current.condition.text;
  }

  getTemperatura() {
    return this.weather.current.temp_c;
  }

  getTexto() {
    let condicion = this.getCondition();
    switch (condicion) {
      case 'Soleado':
        return 'Buen día para pasear con algunas de tus mascotas';
      case 'Parcialmente Nublado':
        return 'Aunque este nublado puedes pasear cuando quieres algunas de tus mascota';
      case 'Lluvioso':
        return 'No es buen momento para pasear';
      case 'Noche despejada':
        return 'XDDDDD';
      default:
        return '';
    }
  }

  getImage() {
    return this.weather.current.condition.icon;
  }
}
