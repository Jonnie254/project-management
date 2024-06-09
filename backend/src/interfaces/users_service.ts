import { Res } from "./res";

export interface UsersService {
  getUser(id: string): Promise<Res>;
  getUserByEmail(email: string): Promise<Res>;
  getUsers(): Promise<Res>;
  getAssigned(): Promise<Res>;
  getUnassigned(): Promise<Res>;
}
