import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleModel } from 'src/app/models/article.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class CreatorService {
  constructor(private readonly http: HttpClient) {}

  sendArticle(ob: any): Observable<ArticleModel> {
    return this.http.post(environment.apiRoute + `article`, ob) as any;
  }

  getCount(): Observable<number> {
    return this.http.get(environment.apiRoute + `user/own/articles/count`) as any;
  }

  getArticles(): Observable<ArticleModel[]> {
    return this.http.get(environment.apiRoute + `user/own/articles`) as any;
  }
}
