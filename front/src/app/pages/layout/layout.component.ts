import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ngrx/reducers';

import { isLoggedInSelector } from '../auth/auth.selectors';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store.select(isLoggedInSelector);
  }

  toggleSideBar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  goToLinkedIn() {
    window.open('https://www.linkedin.com/in/mustapha-aouas-7918a214b/', '_blank');
  }

  goToHome() {

  }

}
