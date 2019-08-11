import { UserEntity } from '../user/user.entity';

export class JwtToken {
  token: string;
  expireDate: number;
  user?: UserEntity;
}
