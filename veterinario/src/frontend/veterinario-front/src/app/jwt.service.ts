import { Injectable } from '@angular/core';
import { Credentials } from './credentials';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  public setTokenToLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  public getTokenFromLocalStorage() {
    return localStorage.getItem('token');
  }

  public returnObjectFromJSON(): Credentials | null {
    let token = this.getTokenFromLocalStorage();
    if (token != null) {
      let encodedInfo = token.split('.')[1];
      let object: Credentials;
      object = JSON.parse(atob(encodedInfo));
      return object;
    }
    return null;
  }

  public removeTokenFromLocalStorage() {
    localStorage.removeItem("token")
  }
}
