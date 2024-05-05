import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from './mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {


  private URL = `http://localhost:8080/mascota`

  constructor(private httpClient:HttpClient) { }
  

  public getMascotas(): Observable<Mascota[]> {
    return this.httpClient.get<Mascota[]>(`${this.URL}/get`)
  }
}
