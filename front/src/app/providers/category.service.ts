import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {
  constructor(private readonly httpClient: HttpClient) {}

  getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get(environment.apiRoute + 'category') as any;
  }

  addCategories(c: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.post(environment.apiRoute + 'category', c) as any;
  }

  editCategories(c: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.put(environment.apiRoute + 'category/' + c.id, c) as any;
  }

  deleteCategories(c: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.delete(environment.apiRoute + 'category/' + c.id) as any;
  }
}
