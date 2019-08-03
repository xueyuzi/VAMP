import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthService, NbAuthResult } from '@nebular/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls:["login.component.scss"]
})
export class LoginComponent {
  user: any = {
    rememberMe: false
  };
  codeSrc:string = "/captcha/captchaImage?type=math&s=";
  errors: string[];
  constructor(private service: NbAuthService, private router: Router, private authService: AuthService) {

  }
  changeCode(){
    this.codeSrc +=Math.random()
  }
  login() {
    console.log("submit")
    this.authService.login(this.user).subscribe(res => {
      console.log(res);
      if (res.code == 0) {
        console.log("login success")
        this.router.navigateByUrl("/custom");
      } else {
        this.errors = res.msg;
        this.changeCode();
      }
    })
  }
}