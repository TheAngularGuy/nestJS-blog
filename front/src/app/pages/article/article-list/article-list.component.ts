import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';
import { AppState } from 'src/app/ngrx/reducers';

import { RequestArticlesAction } from '../article.actions';
import { articleListSelector } from '../article.selector';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  articleList$: Observable<ArticleModel[]>;

  constructor(
    private readonly store: Store<AppState>
  ) { }

  ngOnInit() {

    this.articleList$ = this.store.select(articleListSelector).pipe(
      tap((list: ArticleModel[]) => {
        // NOTE: if it's null we request
        if (list === null) { this.store.dispatch(new RequestArticlesAction()); }
      })
    );

  }

}
