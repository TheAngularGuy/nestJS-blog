import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutAction } from 'src/app/ngrx/actions/auth.actions';
import { AppState } from 'src/app/ngrx/reducers';

@Component({
  selector: 'app-logout',
  template: '',
  styles: ['']
})
export class LogoutComponent implements OnInit {

  constructor(
    private readonly store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new LogoutAction());
  }

}
