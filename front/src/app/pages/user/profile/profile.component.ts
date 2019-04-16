import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';

import { userSelector } from '../../auth/auth.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  user$: Observable<UserModel>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.user$ = this.store.select(userSelector);
  }
}
