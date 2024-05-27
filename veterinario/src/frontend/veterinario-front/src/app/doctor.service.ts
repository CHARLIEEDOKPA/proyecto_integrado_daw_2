import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {


  private URL = 'http://localhost:8080/doctor';

  constructor(private httpClient: HttpClient) {}

  public getDoctorByToken() {
    return this.httpClient.get<Doctor>(`${this.URL}/token`);
  }

  public getDoctorByRecomendacion(id: number) {
    return this.httpClient.get<Doctor>(`${this.URL}/recomendacion/${id}`);
  }

  getAllDoctors() {
    return this.httpClient.get<Doctor[]>(`${this.URL}/all`);
  }
  editDoctor(doctor: Doctor, ID: number) {
    return this.httpClient.put(`${this.URL}/${ID}`,doctor)
  }
  getDoctorById(ID: number) {
    return this.httpClient.get<Doctor>(`${this.URL}/${ID}`)
  }

  createDoctor(doctor: Doctor) {
    return this.httpClient.post(`http://localhost:8080/auth/register/doctor`,doctor)
  }

  deleteDoctor(id: number) {
    return this.httpClient.delete(`${this.URL}/${id}`)
}
}
