import { LogoutComponent } from './auth/logout/logout.component';
import { LoginComponent } from './auth/login/login.component';
import { NbAuthComponent } from '@nebular/auth';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'custom',
    loadChildren: () => import("./custom/custom.module")
      .then(m => m.CustomModule),
    canActivate: [AuthGuard]
  },
  {
    path: "auth", component: NbAuthComponent, children: [
      { path: "login", component: LoginComponent },
      { path: "logout", component: LogoutComponent }
    ]
  },
  { path: '', redirectTo: 'custom', pathMatch: 'full' },
  { path: '**', redirectTo: 'custom' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
