import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private authService:AuthService) { }

  ngOnInit() {
    this.http.post("/user/logout",{}).subscribe(v=>{
      setTimeout(() => {
        return this.router.navigateByUrl("/auth");
      }, 0);
      this.authService.logout();
    });
  }

}
