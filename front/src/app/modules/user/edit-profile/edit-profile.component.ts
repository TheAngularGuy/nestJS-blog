import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() user: UserModel;
  userForm: FormGroup;

  constructor(private readonly store: Store<any>, private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.userForm = this.fb.group({
      id: [this.user.id, []],
      firstname: [this.user.firstname, [Validators.required]],
      lastname: [this.user.lastname, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      isAuthor: [this.user.isAuthor, [Validators.required]],
      password: [this.user.password, [Validators.required]],
      avatar: [this.user.avatar, [Validators.required]],
    });
  }

  submitForm() {}
}
