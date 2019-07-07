import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import {ThemeModule} from "../@theme/theme.module";

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule
  ]
})
export class AuthModule { }
