import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogoutAction } from 'src/app/ngrx/actions/auth.actions';

import { AuthState } from '../auth.reducer';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private readonly store: Store<AuthState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new LogoutAction());
  }

}
