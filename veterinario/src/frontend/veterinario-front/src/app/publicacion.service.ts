import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publicacion } from './publicacion';
import { PublicacionDto } from './publicacion-dto';
import { Comentario } from './comentario';
import { ComentarioDto } from './comentario-dto';
import { HOST } from './global';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  
  
  private URL = `${HOST}/publicacion`;
  constructor(private httpClient: HttpClient) {}

  like(ID: number) {
    return this.httpClient.post(`${this.URL}/megusta/${ID}`,undefined)
}

  enviarComentario(comentario: Comentario) {
    return this.httpClient.post<ComentarioDto>(`${this.URL}/comentario/add`, comentario);
  }

  getPublicionesByIdDuenyo(ID: number) {
    return this.httpClient.get<PublicacionDto[]>(`${this.URL}/getall/${ID}`);
  }

  getPublicacionById(ID: number) {
    return this.httpClient.get<PublicacionDto>(`${this.URL}/${ID}`);
  }

  addPublicacion(publicacion: Publicacion) {
    return this.httpClient.post(`${this.URL}/add`, publicacion);
  }

  dislike(ID: number) {
    return this.httpClient.post(`${this.URL}/nomegusta/${ID}`,undefined)
}
}
