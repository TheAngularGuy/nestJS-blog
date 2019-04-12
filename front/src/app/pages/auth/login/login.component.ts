import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd';
import { UserModel } from 'src/app/models/user.model';
import { AppState } from 'src/app/ngrx/reducers';
import { LoginAction } from 'src/app/pages/auth/auth.actions';

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
    private readonly store: Store<AppState>
  ) { }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  login(): void {
    if (this.validateForm.invalid) {
      this.message.create('error', 'Form invalid, please complete it then retry.');
      return;
    }
    const u: UserModel = {
      id: 69,
      email: 'm@m.m',
      firstname: 'mustapha',
      lastname: 'aouas',
      isAuthor: false,
      avatar: 'zegpihzegze54gzegizjeg',
      password: 'f6ze4f6z4ef94ze9f',
    };
    this.store.dispatch(new LoginAction({ user: u }));
  }

}
