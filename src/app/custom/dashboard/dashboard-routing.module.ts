import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardEditorComponent } from './dashboard-editor.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "view/:id", component: DashboardViewComponent
      },
      {
        path: "editor/:id", component: DashboardEditorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
