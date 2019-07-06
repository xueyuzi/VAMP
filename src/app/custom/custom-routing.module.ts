import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomComponent } from './custom.component';

const routes: Routes = [
  {
    path: "", component: CustomComponent,
    children: [
      {path:"dashboard",loadChildren:()=>import("./dashboard/dashboard.module").then(v=>v.DashboardModule)},
      {path:"grid",loadChildren: ()=>import("./grid/grid.module").then(v=>v.GridModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomRoutingModule { }
