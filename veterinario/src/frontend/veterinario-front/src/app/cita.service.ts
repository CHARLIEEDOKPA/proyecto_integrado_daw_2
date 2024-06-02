import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CitaRequest } from './cita-request';
import { Cita } from './cita';
import { HOST } from './global';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private URL = `${HOST}/cita`;

  constructor(private httpClient: HttpClient) {}

  public sendCita(citaRequest: CitaRequest) {
    return this.httpClient.post(`${this.URL}/add`, citaRequest);
  }

  public getCitas() {
    return this.httpClient.get<Cita[]>(`${this.URL}/get`);
  }
}
