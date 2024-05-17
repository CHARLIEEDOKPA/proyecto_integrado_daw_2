import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Credentials } from './credentials';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private router: Router) {}

  public setTokenToLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  public getTokenFromLocalStorage() {
    let token = localStorage.getItem('token');
    if (token != null) {
      let encodedInfo = token.split('.')[1];
      let object: Credentials = JSON.parse(atob(encodedInfo));
      
      return object.exp < new Date().getTime() ? token : null;
    }

    return null;
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
    localStorage.removeItem('token');
  }

  public removeTokenAndRedirectLogin() {
    this.removeTokenFromLocalStorage();
    this.router.navigate(['login']);
  }
}
