import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { LayoutService } from './layout.service';
import { LayoutEffects } from './state/layout.effects';
import * as fromLayout from './state/layout.reducer';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'article',
        loadChildren: '../article/article.module#ArticleModule',
      },
      {
        path: 'my-account',
        loadChildren: '../user/user.module#UserModule',
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'article',
      },
    ],
  },
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('layout', fromLayout.reducer),
    EffectsModule.forFeature([LayoutEffects]),
  ],
  providers: [AuthGuard, LayoutService],
})
export class LayoutModule {}
