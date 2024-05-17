import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IncidenciaRequest } from './incidencia-request';
import { Incidencia } from './incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  constructor(private httpClient:HttpClient) { }

  private URL = "http://localhost:8080/incidencia"

  public getIncidenciasByMascota(id_mascota:number) {
    return this.httpClient.get<Incidencia[]>(`${this.URL}/mascota/2`)
  }

  public sendIncidencia(incidenciaRequest:IncidenciaRequest) {
    return this.httpClient.post(`${this.URL}/add`,incidenciaRequest)
  }

  public readIncidencia(id:number) {
    return this.httpClient.post(`${this.URL}/read/${id}`,undefined)
  }

  public getIncidenciaById(id:number) {
    return this.httpClient.get<Incidencia>(`${this.URL}/${id}`)
  }

  public getIncidenciasByDoctor() {
    return this.httpClient.get<Incidencia[]>(`${this.URL}/doctor`)
  }
}
