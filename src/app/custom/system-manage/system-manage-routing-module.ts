import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from "./menu/menu.component";
import {RoleComponent} from "./role/role.component";
import {UserComponent} from "./user/user.component";
import { DeptComponent } from './dept/dept.component';

const routes: Routes = [
  {path:"menu",component:MenuComponent},
  {path:"role",component:RoleComponent},
  {path:"user",component:UserComponent},
  {path:"dept",component:DeptComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemManageRoutingModule { }
