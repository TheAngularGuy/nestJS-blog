import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';

import { UtilitiesService } from '../../shared/utilities.service';
import {
  CreatorActionTypes,
  DeleteArticleAction,
  DeleteArticleActionOK,
  GetOwnArticlesAction,
  UpdateArticleActionKO,
} from '../state/creator.actions';
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
        this.page = params.page || this.page;
        this.take = params.take || this.take;
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

  delete(item: ArticleModel) {
    this.store.dispatch(
      new DeleteArticleAction({
        id: item.id,
      }),
    );
    this.actions
      .pipe(
        ofType(CreatorActionTypes.deleteArticleOK),
        first(),
        tap((action: DeleteArticleActionOK) => {
          if (action.payload.id == item.id) {
            this.utils.toastSuccess(`Article id:${item.id} was deleted`);
          }
        }),
      )
      .subscribe();
  }

  changePage(page: number) {
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

  changePageSize(take: number) {
    if (take == this.take) {
      return;
    }
    this.router.navigate([], {
      queryParams: {
        take,
      },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }
}
