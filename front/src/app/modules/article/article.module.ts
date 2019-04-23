import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzI18nService } from 'ng-zorro-antd';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleSingleComponent } from './article-single/article-single.component';
import { ArticleService } from './article.service';
import { ArticleEffects } from './state/article.effects';
import * as fromArticle from './state/article.reducer';

const routes: Routes = [
  {
    path: 'list',
    component: ArticleListComponent,
  },
  {
    path: 'list/:id',
    component: ArticleSingleComponent,
  },
  {
    path: '',
    redirectTo: 'list',
  },
];

@NgModule({
  declarations: [ArticleListComponent, ArticleSingleComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('article', fromArticle.reducer),
    EffectsModule.forFeature([ArticleEffects]),
  ],
  providers: [ArticleService, NzI18nService],
})
export class ArticleModule {}
