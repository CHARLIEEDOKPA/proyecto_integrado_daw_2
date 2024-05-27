import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Duenyo } from './duenyo';

@Injectable({
  providedIn: 'root',
})
export class DuenyoService {
  

  
  
  constructor(private httpCliente: HttpClient) {}

  private URL = 'http://localhost:8080/duenyo';

  getAllDuenyos() {
    return this.httpCliente.get<Duenyo[]>(`${this.URL}/all`);
  }

  deleteDuenyo(id: number) {
    return this.httpCliente.delete(`${this.URL}/${id}`)
}

  public getDuenyoByToken(): Observable<Duenyo> {
    return this.httpCliente.get<Duenyo>(`${this.URL}/token`);
  }

  public getDuenyoByIdMascota(id: number): Observable<Duenyo> {
    return this.httpCliente.get<Duenyo>(`${this.URL}/mascota/${id}`);
  }

  getDuenyosByPattern(PATTERN: string | null) {
    return this.httpCliente.get<Duenyo[]>(`${this.URL}/find/${PATTERN}`)
}

  getDuenyoByIncidencia(id: number) {
    return this.httpCliente.get<Duenyo>(`${this.URL}/incidencia/${id}`);
  }

  getDuenyoById(ID: number) {
    return this.httpCliente.get<Duenyo>(`${this.URL}/${ID}`);
  }

  editDuenyo(duenyo: Duenyo,id:number) {
    return this.httpCliente.put(`${this.URL}/${id}`,duenyo)
  }

  crearDuenyo(duenyo: Duenyo) {
    return this.httpCliente.post(`http://127.0.0.1:8080/auth/register/duenyo`,duenyo)
}
}
