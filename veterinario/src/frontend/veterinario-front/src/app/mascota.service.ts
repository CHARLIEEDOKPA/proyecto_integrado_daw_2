import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from './mascota';
import { MascotaRequest } from './mascota-request';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  


  private URL = `http://localhost:8080/mascota`

  constructor(private httpClient:HttpClient) { }
  

  public getMascotas(): Observable<Mascota[]> {
    return this.httpClient.get<Mascota[]>(`${this.URL}/get`)
  }

  public getMascota(id:number):Observable<Mascota> {
    return this.httpClient.get<Mascota>(`${this.URL}/${id}`)
  }

  public editMascota(mascota:Mascota) {
    return this.httpClient.put(`${this.URL}/${mascota.id}`,mascota)
  }

  public addMascota(mascota:MascotaRequest){
    return this.httpClient.post(`${this.URL}/add`,mascota)
  }

  deleteMascota(id: number) {
    return this.httpClient.delete(`${this.URL}/${id}`)
}
}
