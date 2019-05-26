import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';
import { AppState } from 'src/app/ngrx/reducers';

import { UtilitiesService } from '../../shared/utilities.service';
import { ArticleActionTypes, LoadArticlesAction, LoadArticlesActionKO } from '../state/article.actions';
import { initialArticleState } from '../state/article.reducer';
import {
  articleCountSelector,
  articleListSelector,
  articlePageSelector,
  articleTakeSelector,
} from '../state/article.selectors';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  articleList$: Observable<ArticleModel[]>;
  page: number;
  page$: Observable<number>;
  take: number;
  take$: Observable<number>;
  max$: Observable<number>;
  mode: string; // * category or author

  constructor(
    private readonly store: Store<AppState>,
    private readonly actions: Actions,
    private readonly utils: UtilitiesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.page$ = this.store.select(articlePageSelector).pipe(tap(p => (this.page = p)));
    this.take$ = this.store.select(articleTakeSelector).pipe(tap(t => (this.take = t)));
    this.max$ = this.store.select(articleCountSelector);
    this.articleList$ = this.store.select(articleListSelector);
    this.requestData();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  requestData() {
    this.route.queryParams
      .pipe(
        takeUntil(this.destroyed$),
        throttleTime(500),
      )
      .subscribe(params => {
        this.mode = params.mode;
        this.store.dispatch(
          new LoadArticlesAction({
            mode: params.mode ? '/' + params.mode + '/' + params.id : '',
            page: params.page || initialArticleState.page,
            take: params.take || initialArticleState.take,
          }),
        );
      });
    this.actions
      .pipe(ofType(ArticleActionTypes.LoadArticlesKO))
      .subscribe((action: LoadArticlesActionKO) => {
        this.utils.toastError(action.payload.errorMessage);
      });
  }

  async changePage(page: number) {
    if (page == this.page) {
      return;
    }
    this.router.navigate([''], {
      queryParams: {
        page,
      },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
    this.utils.scrollToTop();
  }

  parseBody(str: string) {
    if (!str) {
      return { blocks: [] };
    }
    return JSON.parse(str);
  }
}
