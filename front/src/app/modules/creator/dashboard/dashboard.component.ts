import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';

import { UtilitiesService } from '../../shared/utilities.service';
import { CreatorActionTypes, GetOwnArticlesAction, UpdateArticleActionKO } from '../state/creator.actions';
import { initialCreatorState } from '../state/creator.reducer';
import { ownArticleCountSelector, ownArticleListSelector } from '../state/creator.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  userArticles$: Observable<ArticleModel[]>;
  total$: Observable<number>;
  page = initialCreatorState.page;
  take = initialCreatorState.take;

  constructor(
    private readonly store: Store<any>,
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly utils: UtilitiesService,
  ) {}

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit() {
    this.userArticles$ = this.store.pipe(select(ownArticleListSelector));
    this.total$ = this.store.pipe(select(ownArticleCountSelector));
    this.requestOwnArticles();
  }

  requestOwnArticles() {
    this.store.dispatch(new GetOwnArticlesAction({ page: this.page, take: this.take }));
    this.route.queryParams
      .pipe(
        takeUntil(this.destroyed$),
        throttleTime(500),
      )
      .subscribe(params => {
        this.page = params.page;
        this.store.dispatch(
          new GetOwnArticlesAction({
            page: params.page || this.page,
            take: params.take || this.take,
          }),
        );
      });
    this.actions
      .pipe(ofType(CreatorActionTypes.updateArticleKO))
      .subscribe((action: UpdateArticleActionKO) => {
        this.utils.toastError(action.payload.errorMessage);
      });
  }

  delete(item: ArticleModel) {}

  async changePage(page: number) {
    if (page == this.page) {
      return;
    }
    this.router.navigate([], {
      queryParams: {
        page,
      },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
    this.utils.scrollToTop();
  }
}
