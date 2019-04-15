import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleModel } from 'src/app/models/article.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(page = 1, take = 25): Observable<ArticleModel[]> {
    return this.httpClient.get(
      environment.apiRoute + `article?page=${page}&take=${take}`
    ) as Observable<ArticleModel[]>;
  }
}
