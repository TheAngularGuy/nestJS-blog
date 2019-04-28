import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss'],
})
export class ChangePwdComponent implements OnInit {
  @Input() user: UserModel;
  userForm: FormGroup;

  constructor(private readonly store: Store<any>, private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.userForm = this.fb.group({
      id: [this.user.id, []],
      password: [null, [Validators.required]],
      password1: [null, [Validators.required]],
      password2: [null, [Validators.required]],
    });
  }

  submitForm() {}
}
