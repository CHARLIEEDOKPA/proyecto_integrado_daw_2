import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  private API_KEY = "b042f8cc620f4aa3a33184338240805"
  private URL = "http://api.weatherapi.com/v1/forecast.json"
  private LANGUAGE = 'es'
  

  constructor(private httpClient:HttpClient) { }

  public getWeather(latitud:any, longitud:any) {
    return this.httpClient.get<Weather>(`${this.URL}?key=${this.API_KEY}&q=${latitud},${longitud}&lang=${this.LANGUAGE}`)
  }
}
