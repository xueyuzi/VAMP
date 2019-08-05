import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, debounceTime } from 'rxjs/operators';
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
      debounceTime(500),
      tap(res => this.handleResponse(url, res)),
    )
  }

  get(url: string, param: any = {}): Observable<any> {
    return this.http.get(url).pipe(
      tap(res => this.handleResponse(url, res)),
      catchError(err => this.handleResponse("", err)),
    )
  }

  handleResponse(url: string, res: any = {}) {
    try {
      console.log(url + " : ", res);
      if (res.code == "500" || res.code == "504") {
        this.toastrService.danger("error", res.msg);
      }
      if (res.code == "1") {
        this.toastrService.danger("error", res.msg);
        setTimeout(() => {
          this.router.navigateByUrl("/auth/login");
        }, 1000);
      }
      if (res.code == "0") {
        this.toastrService.success("success", res.msg);
      }
    } catch (e) { }
    return res;
  }

  transToFormData(data) {
    let formData = new FormData();
    Object.keys(data).forEach(
      k => {
        formData.set(k, data[k]);
      }
    )
    return formData;
  }
}
