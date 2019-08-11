import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenModel } from 'src/app/models/jwt.token.model';
import { PasswordModel } from 'src/app/models/password.model';
import { RegisterDto } from 'src/app/models/register.dto';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  register(registerForm: RegisterDto): Observable<JwtTokenModel> {
    return this.httpClient.post(environment.apiRoute + 'auth/signin', registerForm) as any;
  }

  login(loginForm: { email: string; password: string }): Observable<JwtTokenModel> {
    return this.httpClient.post(environment.apiRoute + 'auth/login', loginForm) as any;
  }

  changePassword(uid: number, passwords: PasswordModel) {
    return this.httpClient.put(environment.apiRoute + `auth/${uid}/password`, passwords);
  }

  editUser(uid: number, user: UserModel) {
    return this.httpClient.put(environment.apiRoute + `user/${uid}`, user);
  }
}
