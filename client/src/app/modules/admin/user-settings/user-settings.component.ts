import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap, throttleTime } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';

import { UtilitiesService } from '../../shared/utilities.service';
import {
  AdminActionTypes,
  LoadUsersAction,
  LoadUsersActionKO,
  SetAdminUserAction,
  SetAuthorUserAction,
} from '../state/admin.actions';
import { initialAdminState } from '../state/admin.reducer';
import { usersCountSelector, usersSelector } from '../state/admin.selectors';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  destroyed$: Subject<boolean>;
  isAllDisplayDataChecked = false;
  isIndeterminate = false; // * i'll use this in the canDeactivate guard

  total$: Observable<number>;
  users$: Observable<UserModel[]>;
  users: UserModel[];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  page = initialAdminState.page;
  take = initialAdminState.take;

  constructor(
    private readonly store: Store<any>,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly utils: UtilitiesService,
    private readonly actions: Actions,
  ) {}

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.users.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      !this.isAllDisplayDataChecked && this.users.some(item => this.mapOfCheckedId[item.id]);
    this.numberOfChecked = this.users.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  checkAllToggle(value: boolean): void {
    this.users.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  onPageChanged(page: number) {
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

  onPageSizeChanged(take: number) {
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

  ngOnInit(): void {
    this.destroyed$ = new Subject();
    this.users$ = this.store.pipe(
      takeUntil(this.destroyed$),
      select(usersSelector),
      tap(list => (this.users = list)),
    );
    this.total$ = this.store.pipe(
      takeUntil(this.destroyed$),
      select(usersCountSelector),
    );

    this.requestData();
  }

  requestData() {
    this.store.dispatch(
      new LoadUsersAction({
        page: this.page,
        take: this.take,
      }),
    );
    this.route.queryParams
      .pipe(
        takeUntil(this.destroyed$),
        throttleTime(500),
      )
      .subscribe(params => {
        this.page = params.page || this.page;
        this.take = params.take || this.take;
        this.store.dispatch(
          new LoadUsersAction({
            page: this.page,
            take: this.take,
          }),
        );
      });
    this.actions.pipe(ofType(AdminActionTypes.LoadUsersKO)).subscribe((action: LoadUsersActionKO) => {
      this.utils.toastError(action.payload.errorMessage);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  setUserAdmin(item: UserModel) {
    this.store.dispatch(
      new SetAdminUserAction({
        user: { ...item, isAdmin: !item.isAdmin },
      }),
    );
  }

  setUserAuthor(item: UserModel) {
    this.store.dispatch(
      new SetAuthorUserAction({
        user: { ...item, isAuthor: !item.isAuthor },
      }),
    );
  }

  setCheckedAsAuthors() {
    const usersToAuthr = this.users.filter(el => this.mapOfCheckedId[el.id]);
    for (const u of usersToAuthr) {
      this.setUserAuthor(u);
    }
  }

  setCheckedAsAdmins() {
    const usersToAdm = this.users.filter(el => this.mapOfCheckedId[el.id]);
    for (const u of usersToAdm) {
      this.setUserAdmin(u);
    }
  }
}
