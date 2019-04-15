import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzI18nService } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';

import { AuthEffects } from './auth.effects';
import * as fromAuth from './auth.reducer';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'signin',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'login'
  }
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthService, NzI18nService]
})
export class AuthModule {}
