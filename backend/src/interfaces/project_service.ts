import { Project } from "./project";
import { Res } from "./res";

export interface ProjectService {
  createProject(project: Project): Promise<Res>;
  updateProject(id: string, project: Project): Promise<Res>;
  deleteProject(id: string): Promise<Res>;
  getProject(id: string): Promise<Res>;
  getProjects(): Promise<Res>;
}
