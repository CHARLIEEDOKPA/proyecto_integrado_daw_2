import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecomendacionDto } from './recomendacion-dto';
import { RecomendacionRequest } from './recomendacion-request';

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
    return this.httpClient.get<RecomendacionDto[]>(`${this.URL}/get/duenyo`)
  }

  public readRecomendacion(id:number) {
    return this.httpClient.post(`${this.URL}/read/${id}`,undefined)
  }

  getRecomendacionById(ID: number) {
    return this.httpClient.get<RecomendacionDto>(`${this.URL}/${ID}`)
}
}
