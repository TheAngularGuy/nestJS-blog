import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import { JwtTokenModel } from 'src/app/models/jwt.token.model';
import { AppState } from 'src/app/ngrx/reducers';
import { LoginAction } from 'src/app/pages/auth/auth.actions';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private readonly message: NzMessageService,
    private readonly fb: FormBuilder,
    private readonly store: Store<AppState>,
    private readonly authService: AuthService
  ) {}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  login(): void {
    if (this.validateForm.invalid) {
      this.message.create('error', 'Form invalid, please complete it then retry.');
      return;
    }
    this.authService
      .login(this.validateForm.value)
      .pipe() // ! take only first maybe
      .subscribe(
        (jwtToken: JwtTokenModel) => {
          this.store.dispatch(new LoginAction({ jwtToken }));
        },
        (err: any) => {
          console.error(err);
          this.message.create('error', 'Bad email or password.');
        }
      );
  }
}