import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ArticleComponent } from './article.component';

const routes: Routes = [{
  path: ':id',
  component: ArticleComponent,
}];

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ArticleModule { }
