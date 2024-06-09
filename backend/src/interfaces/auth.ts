import { Res } from "./res";
import { User } from "./user";
import { user_details } from "./user_details";
import { user_login } from "./user_login";

export interface Auth {
  login(login: user_login): Promise<Res>;
  register(user: User): Promise<Res>;
  updateDetails(userDetails: user_details): Promise<Res>;
  updatePassword(
    id: string,
    password: string,
    oldPassword: string
  ): Promise<Res>;
  updateForgotPassword(id: string, password: string): Promise<Res>;
}
