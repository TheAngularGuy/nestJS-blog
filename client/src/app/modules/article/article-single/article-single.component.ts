import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article.model';

import { LoadOneArticleAction } from '../state/article.actions';
import { articleByIdSelector } from '../state/article.selectors';

@Component({
  selector: 'app-article-single',
  templateUrl: './article-single.component.html',
  styleUrls: ['./article-single.component.scss'],
})
export class ArticleSingleComponent implements OnInit {
  article$: Observable<ArticleModel>;
  article: ArticleModel;
  articleBody: any;

  constructor(
    private readonly store: Store<any>,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.article$ = this.store.pipe(
      select(articleByIdSelector, { id }),
      tap(a => {
        this.article = a;
        if (a) {
          this.articleBody = JSON.parse(a.body);
          console.log(this.articleBody);
        }
      }),
    );
    this.store.dispatch(new LoadOneArticleAction({ id }));
  }

  onGoBack() {
    this.router.navigateByUrl('/article/list');
  }
}
