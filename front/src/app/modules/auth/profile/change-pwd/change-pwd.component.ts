import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';

import { AuthActionTypes, ChangePasswordAction, ChangePasswordActionKO } from '../../../auth/state/auth.actions';
import { UtilitiesService } from '../../../shared/utilities.service';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss'],
})
export class ChangePwdComponent implements OnInit, OnDestroy {
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
      password: [null, [Validators.required, Validators.minLength(4)]],
      password1: [null, [Validators.required, Validators.minLength(4)]],
      password2: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  isInputError(field: string) {
    return !this.userForm.get(field).valid && this.userForm.get(field).touched ? 'error' : null;
  }

  submitForm() {
    if (this.userForm.value.password1 != this.userForm.value.password2) {
      this.userForm.get('password2').setErrors({ required: true });
      this.utils.toastError('The two passwords does not match');
      return;
    }
    if (!this.userForm.valid || !this.userForm.dirty) {
      this.utils.toastError('The form is invalid');
      return;
    }
    this.loading$.next(true);
    this.store.dispatch(
      new ChangePasswordAction({
        id: this.user.id,
        passwords: {
          ...this.userForm.value,
        },
      }),
    );
  }

  listenToRes() {
    this.actions$
      .pipe(
        ofType(AuthActionTypes.ChangePasswordKO),
        takeUntil(this.destroyed$),
      )
      .subscribe((action: ChangePasswordActionKO) => this.changeKO(action.payload.errorMessage));
    this.actions$
      .pipe(
        ofType(AuthActionTypes.ChangePasswordOK),
        takeUntil(this.destroyed$),
      )
      .subscribe(() => this.changeOK());
  }

  changeOK() {
    setTimeout(() => {
      this.utils.toastSuccess('Password updated');
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
