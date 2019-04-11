import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleSingleComponent } from './article-single/article-single.component';


const routes: Routes = [{
  path: 'list',
  component: ArticleListComponent,
}, {
  path: ':id',
  component: ArticleSingleComponent,
}, {
  path: '',
  redirectTo: 'list'
}];

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleSingleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ArticleModule { }
