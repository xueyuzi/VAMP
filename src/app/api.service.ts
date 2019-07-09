import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private toastrService: NbToastrService,
    private router: Router) { }

  post(url: string, body: any = {}): Observable<any> {
    return this.http.post(url, body).pipe(
      tap(res => this.handleError(url, res))
    )
  }

  get(url: string, param: any = {}): Observable<any> {
    return this.http.get(url).pipe(
      tap(res => this.handleError(url, res))
    )
  }

  handleError(url: string, res: any) {
    console.log(url + " : ", res);
    if (res.code == "1") {
      this.toastrService.danger(res.msg);
      setTimeout(() => {
        this.router.navigateByUrl("/auth/login");
      }, 1000);
    }
  }
}
