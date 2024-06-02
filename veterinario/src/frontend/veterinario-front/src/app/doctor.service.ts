import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from './doctor';
import { HOST } from './global';


@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  


  private URL = `${HOST}/doctor`;

  constructor(private httpClient: HttpClient) {}

  public getDoctorByToken() {
    return this.httpClient.get<Doctor>(`${this.URL}/token`);
  }

  public getDoctorByRecomendacion(id: number) {
    return this.httpClient.get<Doctor>(`${this.URL}/recomendacion/${id}`);
  }

  resetPassword(email: string) {
    let emailRequest:any = {
      email : email
    }
    return this.httpClient.post(`${HOST}/auth/password/reset`,emailRequest)
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
    return this.httpClient.post(`${HOST}/auth/register/doctor`,doctor)
  }

  deleteDoctor(id: number) {
    return this.httpClient.delete(`${this.URL}/${id}`)
}
}
