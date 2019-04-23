import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/reducers';
import { LogoutAction } from 'src/app/pages/auth/state/auth.actions';

@Component({
  selector: 'app-logout',
  template: '',
  styles: [''],
})
export class LogoutComponent implements OnInit {
  constructor(private readonly store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LogoutAction({ redirect: true }));
  }
}
