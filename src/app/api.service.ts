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
  httpOptions = {
    headers: new HttpHeaders({
      'Cookie': 'JSESSIONID=2386ca54-e3a2-4248-943e-bcf47dff6854; userpermissions=true; PHPSESSID=bespaja45kca6bsbm1guuss37l; YII_CSRF_TOKEN=Q1p5bURXaElRTnd6S1BYV013S244cmlNNW9YdUVhTk2CQ_ng8OVfETI5KJbPd8oyqx7R-e-dmLvwRSRPpyRs_A%3D%3D',
      'Authorization': 'my-auth-token'
    })
  }
  constructor(private http: HttpClient, private toastrService: NbToastrService,
    private router: Router) { }

  post(url: string, body: any = {}): Observable<any> {
    return this.http.post(url, body, this.httpOptions).pipe(
      tap(res => this.handleError(url, res))
    )
  }

  get(url: string, param: any = {}): Observable<any> {
    return this.http.get(url, this.httpOptions).pipe(
      tap(res => this.handleError(url, res))
    )
  }

  handleError(url: string, res: any) {
    console.error(url + " : ", res);
    if (res.code == "1") {
      this.toastrService.danger(res.msg);
      setTimeout(() => {
        this.router.navigateByUrl("/auth/login");
      }, 1000);
    }
  }
}
