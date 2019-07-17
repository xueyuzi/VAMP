import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import {ThemeModule} from "../../@theme/theme.module";

import {SystemManageRoutingModule} from "./system-manage-routing-module"
@NgModule({
  declarations: [
    MenuComponent,
    RoleComponent,
    UserComponent
  ],
  providers:[
  ],
  imports: [
    CommonModule,
    SystemManageRoutingModule,
    ThemeModule
  ]
})
export class SystemManageModule { }
