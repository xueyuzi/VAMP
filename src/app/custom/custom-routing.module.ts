import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomComponent } from './custom.component';
import { UserComponent } from './system-manage/user/user.component';
import { MenuComponent } from './system-manage/menu/menu.component';


const routes: Routes = [
  {
    path: "", component: CustomComponent,
    children: [
      { path: "dashboard", loadChildren: () => import("./dashboard/dashboard.module").then(v => v.DashboardModule) },
      { path: "user", component: UserComponent },
      { path: "menus", component: MenuComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomRoutingModule { }
