import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './auth/logout/logout.component';
import { EmptyComponent } from './empty.component';

const routes: Routes = [
  {
    path: 'custom',
    loadChildren: () => import("./custom/custom.module").then((v) => v.CustomModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    loadChildren: () => import("./auth/auth.module").then(v => v.AuthModule)
  },
  { path: 'test', component: EmptyComponent },
  { path: '', redirectTo: 'custom', pathMatch: 'full' },
  { path: '**', redirectTo: 'custom' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
