export interface UserModel {
  id: number;
  email: string;
  avatar?: string;
  password?: string;
  firstname: string;
  lastname: string;
  isAuthor: boolean;
  isAdmin: boolean;
}
