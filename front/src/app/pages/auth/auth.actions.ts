import { Action } from '@ngrx/store';
import { UserModel } from 'src/app/models/user.model';


enum AuthActionTypes {
  LoginAction = '[Auth] Login',
  LogoutAction = '[Auth] Logout',
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LoginAction;

  constructor(public payload?: { user: UserModel }) { }
}

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.LogoutAction;

}

export type AuthActions = LoginAction | LogoutAction;
