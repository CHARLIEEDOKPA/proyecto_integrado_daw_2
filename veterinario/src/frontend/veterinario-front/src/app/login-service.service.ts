import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from './global';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpCliente:HttpClient) { }

  login(login:any) {
    return this.httpCliente.post(`${HOST}/auth/login`,login);
  }

  changePassword(password:any) {
    return this.httpCliente.post(`${HOST}/auth/password/change`,password)
  }
}
