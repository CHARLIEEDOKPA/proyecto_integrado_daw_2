import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecomendacionRequest } from './recomendacion-request';
import { Recomendacion } from './recomendacion';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {


private URL = `http://127.0.0.1:8080/recomendacion`

  constructor(private httpClient:HttpClient) { }


  public sendRecomendacion(recomendacionRequest:RecomendacionRequest) {
    return this.httpClient.post(`${this.URL}/add`,recomendacionRequest)
  }

  public getRecomendacionesByDuenyo() {
    return this.httpClient.get<Recomendacion[]>(`${this.URL}/get/duenyo`)
  }

  public readRecomendacion(id:number) {
    return this.httpClient.post(`${this.URL}/read/${id}`,undefined)
  }
}
