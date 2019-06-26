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

const routes: Routes = [
  { path: 'custom', loadChildren: 'app/custom/custom.module#CustomModule',},
  {
    path: 'auth',
    component: NbAuthComponent,
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
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
