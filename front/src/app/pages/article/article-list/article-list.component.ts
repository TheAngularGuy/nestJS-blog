import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, take, tap } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';
import { AppState } from 'src/app/ngrx/reducers';

import { RequestArticlesAction } from '../article.actions';
import { articleCountSelector, articleListSelector, articlePageSelector, articleTakeSelector } from '../article.selector';

const DEFAULT_PAGE = 1;
const DEFAULT_TAKE = 5;

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  articleList$: Observable<ArticleModel[]>;
  page$: Observable<number>;
  take$: Observable<number>;
  max$: Observable<number>;

  constructor(private readonly store: Store<AppState>, private readonly route: ActivatedRoute) {}

  ngOnInit() {
    console.log('pppppppp');

    this.page$ = this.store.select(articlePageSelector);
    this.take$ = this.store.select(articleTakeSelector);
    this.max$ = this.store.select(articleCountSelector);
    this.articleList$ = this.store.pipe(
      select(articleListSelector),
      tap((list: ArticleModel[]) => {
        // * if it's null we request
        if (list == null) {
          console.log('Debbug log: ArticleListComponent -> ngOnInit -> list', list);
          this.store.dispatch(
            new RequestArticlesAction({
              page: this.route.snapshot.queryParams.page || DEFAULT_PAGE,
              take: this.route.snapshot.queryParams.take || DEFAULT_TAKE,
            }),
          );
        }
      }),
    );

    this.articleList$.subscribe();
  }

  async changePage(page: number) {
    document.getElementById('content').scroll(0, 0); // TODO: maybe put this in a utilities service
    this.store.dispatch(
      new RequestArticlesAction({
        page,
        take: (await this.take$.pipe(first()).toPromise()) || DEFAULT_TAKE,
      }),
    );
  }
}
