import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  isAuthenticated(): boolean {
    var token: string = localStorage.getItem("token")
    if (token != null) {
      return true;
    }
    return false;
  }
  login(user: any) {
    var formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("validateCode", user.validateCode);
    formData.append("rememberMe", user.rememberMe);
    return this.api.post("/login", formData).pipe(
      tap((res) => res.code == 0 && localStorage.setItem("token", "token"))
    );
  }

  logout() {
    localStorage.setItem("token", null);
  }
}
