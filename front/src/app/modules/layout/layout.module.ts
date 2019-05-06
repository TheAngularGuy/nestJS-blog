import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { SharedModule } from '../shared/shared.module';
import { InfoComponent } from './wrapper/info/info.component';
import { LayoutComponent } from './wrapper/layout.component';

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
        path: 'my',
        loadChildren: '../auth/auth.module#AuthModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'creator',
        loadChildren: '../creator/creator.module#CreatorModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        loadChildren: '../admin/admin.module#AdminModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'info',
        component: InfoComponent,
      },
      {
        path: '',
        redirectTo: 'article',
      },
    ],
  },
];

@NgModule({
  declarations: [LayoutComponent, InfoComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [AuthGuard],
})
export class LayoutModule {}
