import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {
  constructor(private readonly httpClient: HttpClient) {}

  getCount(): Observable<number> {
    return this.httpClient.get(environment.apiRoute + 'user/count') as any;
  }

  getUsers(page: number, take: number): Observable<UserModel[]> {
    return this.httpClient.get(environment.apiRoute + `user?page=${page}&take=${take}`) as any;
  }

  editUser(u: UserModel): Observable<UserModel> {
    return this.httpClient.put(environment.apiRoute + 'user/' + u.id, u) as any;
  }
}
