import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    var token: string = localStorage.getItem("token")
    if (token != null) {
      return true;
    }
    return false;
  }
  login(token: string) {
    localStorage.setItem("token", token);
  }
  
  logout() {
    localStorage.setItem("token", null);
  }
}
