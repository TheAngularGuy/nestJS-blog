import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArticleModel } from 'src/app/models/article.model';

import { CountOwnArticlesAction, GetOwnArticlesAction } from '../state/creator.actions';
import { initialCreatorState } from '../state/creator.reducer';
import { ownArticleCountSelector, ownArticleListSelector } from '../state/creator.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userArticles$: Observable<ArticleModel[]>;
  total$: Observable<number>;
  page = initialCreatorState.page;
  take = initialCreatorState.take;

  constructor(private readonly store: Store<any>) {}

  ngOnInit() {
    this.userArticles$ = this.store.pipe(select(ownArticleListSelector));
    this.total$ = this.store.pipe(select(ownArticleCountSelector));

    this.store.dispatch(new GetOwnArticlesAction({ page: this.page, take: this.take }));
    this.store.dispatch(new CountOwnArticlesAction());
  }

  delete(item: ArticleModel) {}

  changePage(p: number) {}
}
