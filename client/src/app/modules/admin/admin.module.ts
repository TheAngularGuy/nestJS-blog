import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { AdminService } from './admin.service';
import { CategorySettingsComponent } from './category-settings/category-settings.component';
import { AdminEffects } from './state/admin.effects';
import * as fromAdmin from './state/admin.reducer';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategorySettingsComponent,
  },
  {
    path: 'users',
    component: UserSettingsComponent,
  },
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [CategorySettingsComponent, UserSettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('admin', fromAdmin.reducer),
    EffectsModule.forFeature([AdminEffects]),
    RouterModule.forChild(routes),
  ],
  providers: [AdminService],
})
export class AdminModule {}
