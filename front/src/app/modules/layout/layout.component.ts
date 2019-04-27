import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';

import { isLoggedInSelector } from '../auth/state/auth.selectors';
import { RequestCategoriesAction } from './state/layout.actions';
import { layoutCategoriesSelector } from './state/layout.selectors';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  isCollapsed = true;
  isLoggedIn$: Observable<boolean>;
  categories$: Observable<CategoryModel[]>;

  constructor(private readonly store: Store<any>) {}

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector);
    this.categories$ = this.store.select(layoutCategoriesSelector);
    this.store.dispatch(new RequestCategoriesAction());
  }

  toggleSideBar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  goToLinkedIn() {
    window.open('https://www.linkedin.com/in/mustapha-aouas-7918a214b/', '_blank');
  }
}
