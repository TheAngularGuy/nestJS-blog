import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';

import * as fromAuth from './auth.reducer';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
}, {
  path: 'logout',
  component: LogoutComponent,
}, {
  path: 'signin',
  component: RegisterComponent
}, {
  path: '',
  redirectTo: 'login'
}];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', fromAuth.authReducer)
  ]
})
export class AuthModule { }
