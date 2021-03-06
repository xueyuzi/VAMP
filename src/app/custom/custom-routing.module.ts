import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomComponent } from './custom.component';

const routes: Routes = [
  {
    path: "", component: CustomComponent,
    children: [
      { path: "dashboard", loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule) },
      { path: "system", loadChildren: () => import("./system-manage/system-manage.module").then(m => m.SystemManageModule) },
      { path: "data", loadChildren: () => import("./data-manage/data-manage.module").then(m => m.DataManageModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomRoutingModule { }
