import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { AdminService } from '../admin.service';

@Injectable()
export class AdminEffects {
  constructor(private readonly actions$: Actions, private readonly admService: AdminService) {}

  /* End effects */
}
