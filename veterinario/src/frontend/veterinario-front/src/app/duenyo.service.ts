import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Duenyo } from './duenyo';

@Injectable({
  providedIn: 'root'
})
export class DuenyoService {
 

  constructor(private httpCliente:HttpClient) { }

  private URL = 'http://localhost:8080/duenyo'

  public getDuenyoByToken():Observable<Duenyo> {
    return this.httpCliente.get<Duenyo>(`${this.URL}/token`)
  }

  public getDuenyoByIdMascota(id:number):Observable<Duenyo> {
    return this.httpCliente.get<Duenyo>(`${this.URL}/mascota/${id}`)
  }

  getDuenyoByIncidencia(id: number) {
    return this.httpCliente.get<Duenyo>(`${this.URL}/incidencia/${id}`)
  }

}
