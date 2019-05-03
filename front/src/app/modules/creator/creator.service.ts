import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleModel } from 'src/app/models/article.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class CreatorService {
  constructor(private readonly http: HttpClient) {}

  changePassword(ob: any): Observable<ArticleModel> {
    return this.http.post(environment.apiRoute + `article`, ob) as any;
  }
}
