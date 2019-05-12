import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';

import { AuthActionTypes, EditUserAction, EditUserActionKO } from '../../../auth/state/auth.actions';
import { UtilitiesService } from '../../../shared/utilities.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @Input() user: UserModel;
  userForm: FormGroup;
  loading$ = new BehaviorSubject(false);
  destroyed$ = new Subject<boolean>();

  constructor(
    private readonly store: Store<any>,
    private readonly actions$: Actions,
    private readonly fb: FormBuilder,
    private readonly utils: UtilitiesService,
  ) {}

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit() {
    this.setForm();
    this.listenToRes();
  }

  setForm() {
    this.userForm = this.fb.group({
      id: [this.user.id, []],
      firstname: [this.user.firstname, [Validators.required]],
      lastname: [this.user.lastname, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      // isAuthor: [this.user.isAuthor, [Validators.required]],
      // password: [this.user.password, [Validators.required]],
      // avatar: [this.user.avatar, [Validators.required]],
    });
  }

  isInputError(field: string) {
    return !this.userForm.get(field).valid && this.userForm.get(field).touched ? 'error' : null;
  }

  submitForm() {
    if (!this.userForm.valid || !this.userForm.dirty) {
      this.utils.toastError('The form is invalid');
      return;
    }
    this.loading$.next(true);
    this.store.dispatch(
      new EditUserAction({
        user: {
          ...this.userForm.value,
        },
      }),
    );
  }
  listenToRes() {
    this.actions$
      .pipe(
        ofType(AuthActionTypes.EditUserKO),
        takeUntil(this.destroyed$),
      )
      .subscribe((action: EditUserActionKO) => this.changeKO(action.payload.errorMessage));
    this.actions$
      .pipe(
        ofType(AuthActionTypes.EditUserOK),
        takeUntil(this.destroyed$),
      )
      .subscribe(() => this.changeOK());
  }

  changeOK() {
    setTimeout(() => {
      this.utils.toastSuccess('Your information have been updated');
      this.loading$.next(false);
    }, 250);
  }

  changeKO(msg: string) {
    setTimeout(() => {
      this.utils.toastError(msg);
      this.loading$.next(false);
    }, 250);
  }
}
