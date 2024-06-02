import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Duenyo } from './duenyo';
import { HOST } from './global';


@Injectable({
  providedIn: 'root',
})
export class DuenyoService {
 

  
  
  constructor(private httpCliente: HttpClient) {}

  private URL = `${HOST}/duenyo`;

  resetPassword(email: string) {
    let emailRequest:any = {
      email : email
    }
    return this.httpCliente.post(`${HOST}/auth/password/reset`,emailRequest)
  }
  

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
    return this.httpCliente.post(`${HOST}/auth/register/duenyo`,duenyo)
}
}
