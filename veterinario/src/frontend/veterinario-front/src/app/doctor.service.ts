import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private URL = "http://localhost:8080/doctor"

  constructor(private httpClient:HttpClient) { }

  public getDoctorByToken() {
    return this.httpClient.get<Doctor>(`${this.URL}/token`)
  }

  public getDoctorByRecomendacion(id:number) {
    return this.httpClient.get<Doctor>(`${this.URL}/recomendacion/${id}`)
  }

}
