import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokenModel } from 'src/app/models/jwt.token.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  login(loginForm: { email: string; password: string }): Observable<JwtTokenModel> {
    return this.httpClient.post(environment.apiRoute + 'auth/login', loginForm) as any;
  }
}
