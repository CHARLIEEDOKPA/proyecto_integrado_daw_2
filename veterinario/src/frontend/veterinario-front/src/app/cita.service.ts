import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CitaRequest } from './cita-request';
import { Cita } from './cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {


  private URL = "http://localhost:8080/cita"

  constructor(private httpClient:HttpClient) { }



  public sendCita(citaRequest:CitaRequest) {
    return this.httpClient.post(`${this.URL}/add`,citaRequest);
  }

  public getCitasByDuenyo() {
    return this.httpClient.get<Cita[]>(`${this.URL}/get`)
  }
}
