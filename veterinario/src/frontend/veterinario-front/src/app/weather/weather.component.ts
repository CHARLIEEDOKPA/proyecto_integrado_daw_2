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
    this.locationService.getPosition().then(x => {
      this.weatherService.getWeather(x.lat, x.lng).subscribe(x => this.weather = x)
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
