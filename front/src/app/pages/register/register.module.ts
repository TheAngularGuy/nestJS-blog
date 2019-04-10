import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzI18nService } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';

import { RegisterComponent } from './register.component';


const routes: Routes = [{
  path: '',
  component: RegisterComponent,
}];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    NzI18nService,
  ]
})
export class RegisterModule { }
