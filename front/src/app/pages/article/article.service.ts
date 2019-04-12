import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleModel } from 'src/app/models/article.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAll(): Observable<ArticleModel[]> {
    return (this.httpClient.get(environment.apiRoute + 'article') as Observable<ArticleModel[]>);
  }

}
