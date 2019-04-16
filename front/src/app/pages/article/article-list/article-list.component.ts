import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, take, tap } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';
import { AppState } from 'src/app/ngrx/reducers';

import { RequestArticlesAction } from '../article.actions';
import { articleCountSelector, articleListSelector, articlePageSelector, articleTakeSelector } from '../article.selector';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnInit {
  articleList$: Observable<ArticleModel[]>;
  page$: Observable<number>;
  take$: Observable<number>;
  max$: Observable<number>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit() {
    this.page$ = this.store.select(articlePageSelector);
    this.take$ = this.store.select(articleTakeSelector);
    this.max$ = this.store.select(articleCountSelector);
    this.articleList$ = this.store.select(articleListSelector).pipe(
      tap((list: ArticleModel[]) => {
        // * if it's null we request
        if (list == null) {
          this.store.dispatch(new RequestArticlesAction({ page: 1, take: 5 }));
        }
      })
    );
  }

  async changePage(page: number) {
    console.log(`page: ${page}`);
    document.getElementById('content').scroll(0, 0); // TODO: maybe put this in a utilities service
    this.store.dispatch(
      new RequestArticlesAction({
        page,
        take: await this.take$.pipe(first()).toPromise()
      })
    );
  }
}
