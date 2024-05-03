import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  public setTokenToLocalStorage(token:string) {
    localStorage.setItem("token", token)
  }

}
