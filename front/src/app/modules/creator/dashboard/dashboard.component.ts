import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArticleModel } from 'src/app/models/article.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userArticles$: Observable<ArticleModel[]>;

  constructor() {}

  ngOnInit() {
    this.userArticles$ = of([]);
  }

  delete(item: ArticleModel) {}

  changePage(p: number) {}
}
