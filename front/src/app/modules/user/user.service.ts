import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PasswordModel } from 'src/app/models/password.model';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  changePassword(uid: number, passwords: PasswordModel) {
    return this.http.put(environment.apiRoute + `auth/${uid}/password`, passwords);
  }

  editUser(uid: number, user: UserModel) {
    return this.http.put(environment.apiRoute + `user/${uid}`, user);
  }
}
