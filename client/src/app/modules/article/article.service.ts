import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private readonly httpClient: HttpClient) {}

  getCount(mode = ''): Observable<number> {
    return this.httpClient.get(environment.apiRoute + `article${mode}/count`) as any;
  }

  getAll(page: number, take: number, mode = ''): Observable<ArticleModel[]> {
    return this.httpClient
      .get(environment.apiRoute + `article${mode}?page=${page}&take=${take}`)
      .pipe(startWith(Array(+take).fill({ loading: true }))) as any;
  }

  getOne(id: number): Observable<ArticleModel> {
    return this.httpClient.get(environment.apiRoute + `article/${id}`) as any;
  }
}
