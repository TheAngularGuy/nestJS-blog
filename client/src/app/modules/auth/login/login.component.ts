import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthActionTypes, LoginAction, LoginActionKO } from 'src/app/modules/auth/state/auth.actions';
import { AppState } from 'src/app/ngrx/reducers';

import { UtilitiesService } from '../../shared/utilities.service';
import { isLoggedInSelector } from '../state/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  loading$ = new BehaviorSubject(false);
  destroyed$ = new Subject();

  constructor(
    private readonly utils: UtilitiesService,
    private readonly fb: FormBuilder,
    private readonly store: Store<AppState>,
    private readonly Actions$: Actions,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit(): void {
    this.store.select(isLoggedInSelector).subscribe(bool => {
      if (bool) {
        this.router.navigateByUrl(this.route.snapshot.queryParams.referer);
      }
    });
    this.listeToRes();
    this.setForm();
  }

  setForm() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  login(): void {
    if (this.validateForm.invalid) {
      this.utils.toastError('Form invalid, please complete it then retry.');
      return;
    }
    this.loading$.next(true);
    this.store.dispatch(
      new LoginAction({
        form: this.validateForm.value,
        redirect: true,
        redirectTo: this.route.snapshot.queryParams.referer,
      }),
    );
  }

  listeToRes() {
    this.Actions$.pipe(
      takeUntil(this.destroyed$),
      ofType(AuthActionTypes.LoginActionKO),
    ).subscribe((action: LoginActionKO) => {
      setTimeout(() => {
        this.utils.toastError(action.payload.errorMessage);
        this.loading$.next(false);
      }, 250);
    });
  }

  onBack() {
    this.router.navigateByUrl('');
  }
}
