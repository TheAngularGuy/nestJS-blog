import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';

import { LoadUsersAction } from '../state/admin.actions';
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
    private readonly fb: FormBuilder,
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
    console.log('Debbug log: UserSettingsComponent -> onPageChanged -> page', page);
  }

  onPageSizeChanged(nb: number) {
    console.log('Debbug log: UserSettingsComponent -> onPageSizeChanged -> nb', nb);
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

    this.store.dispatch(
      new LoadUsersAction({
        page: this.page,
        take: this.take,
      }),
    );
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }
}
