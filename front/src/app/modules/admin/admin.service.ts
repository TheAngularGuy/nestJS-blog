import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {
  constructor(private readonly httpClient: HttpClient) {}

  getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get(environment.apiRoute + 'category') as any;
  }

  addCategories(c: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.post(environment.apiRoute + 'category', c) as any;
  }
}
