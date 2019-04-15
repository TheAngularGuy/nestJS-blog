import { UserModel } from './user.model';

export interface JwtTokenModel {
  token: string;
  expireDate: number;
  user: UserModel;
}
