import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserModel } from '../models/user.model';

@Injectable()
export class AuthorService {
  constructor(private readonly httpClient: HttpClient) {}

  getAuthors(): Observable<UserModel[]> {
    return this.httpClient.get(environment.apiRoute + 'user/authors') as any;
  }
}
