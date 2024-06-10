import { Res } from "./res";

export interface UserService {
  getMyDetails(id: string): Promise<Res>;
  getMyProject(id: string): Promise<Res>;
}
