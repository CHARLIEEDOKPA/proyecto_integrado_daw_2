import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpCliente:HttpClient) { }

  login(login:any) {
    return this.httpCliente.post("http://localhost:8080/auth/login",login);
  }
}
