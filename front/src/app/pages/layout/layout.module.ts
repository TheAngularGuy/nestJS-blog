import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { SharedModule } from '../../shared/shared.module';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'article',
        loadChildren: '../article/article.module#ArticleModule'
      },
      {
        path: 'my-account',
        loadChildren: '../user/user.module#UserModule',
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'article'
      }
    ]
  }
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [AuthGuard]
})
export class LayoutModule {}
