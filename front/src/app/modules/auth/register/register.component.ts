import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UploadFile } from 'ng-zorro-antd';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { first, takeUntil, tap } from 'rxjs/operators';

import { RegisterAction } from '../state/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  loading$ = new BehaviorSubject<boolean>(false);
  validateForm: FormGroup;
  fileList: UploadFile[] = [];

  constructor(
    private readonly store: Store<any>,
    private readonly actions: Actions,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {}

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password2: [null, [Validators.required, (c: FormControl) => this.password2Validator(c)]],
    });
    this.validatePassword2();
  }

  password2Validator(c: FormControl) {
    if (!this.validateForm) {
      return null;
    }
    return c.value == this.validateForm.get('password').value
      ? null
      : {
          password2: {
            valid: false,
          },
        };
  }

  /**
   * since passord2 validity depends on pass1 we need to trigger the
   * password2 validity check every time pass1 value changes :)
   */
  validatePassword2() {
    this.validateForm
      .get('password')
      .valueChanges.pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          this.validateForm.get('password2').updateValueAndValidity();
        }),
      )
      .subscribe();
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = [file];
    console.log(this.fileList);
    return false;
    // tslint:disable-next-line:semicolon
  };

  async submitForm() {
    let avatar: string;
    if (!this.validateForm.valid) {
      return;
    }
    this.loading$.next(true);
    if (this.fileList.length) {
      avatar = await this.getBase64(this.fileList[0] as any)
        .pipe(first())
        .toPromise();
    }
    this.store.dispatch(
      new RegisterAction({
        form: {
          ...this.validateForm.value,
          avatar,
        },
      }),
    );
  }

  getBase64(file: Blob): Observable<string> {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return Observable.create((obs: Observer<string>) => {
      reader.onload = () => {
        obs.next(reader.result as string);
        obs.complete();
      };
      reader.onerror = error => {
        obs.error('Error: ' + error);
      };
    });
  }

  onBack() {
    this.router.navigateByUrl('/auth');
  }
}
