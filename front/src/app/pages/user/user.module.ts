import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzI18nService } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [NzI18nService]
})
export class UserModule {}
