import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from './global';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  


  constructor(private httpClient: HttpClient) { }


  addSubAdmin(value: any) {
    return this.httpClient.post(`${HOST}/auth/register/subadministrador`,value)
}
}
