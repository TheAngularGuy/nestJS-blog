import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {
  constructor(private readonly httpClient: HttpClient) {}

  getUsers(): Observable<UserModel[]> {
    return this.httpClient.get(environment.apiRoute + 'user') as any;
  }

  getCount(): Observable<number> {
    return this.httpClient.get(environment.apiRoute + 'user/count') as any;
  }
}
