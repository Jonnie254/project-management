import mssql from "mssql";
import lodash from "lodash";
import { Project } from "../interfaces/project";
import { ProjectService } from "../interfaces/project_service";
import { Res } from "../interfaces/res";
import Connection from "../helpers/dbhelper";
import { RequestError } from "mssql";

export class projectServices implements ProjectService {
  async createProject(project: Project): Promise<Res> {
    try {
      let results = (
        await Connection.execute("create_project", {
          id: project.id,
          name: project.name,
          description: project.description,
          end_date: project.end_date,
          user_id: project.user_id,
          created_at: project.created_at,
          updated_at: project.updated_at,
        })
      ).rowsAffected;

      if (results[0] == 1) {
        return {
          success: true,
          message: "Project created successfully",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "Error while creating project",
          data: null,
        };
      }
    } catch (error: any) {
      if (
        error.message.includes(
          'The INSERT statement conflicted with the FOREIGN KEY constraint "FK_UserID"'
        )
      ) {
        return {
          success: false,
          message: "User does not exist",
          data: null,
        };
      } else if (error.message.includes("Violation of UNIQUE KEY constraint")) {
        return {
          success: false,
          message: "User has already been assigned a project",
          data: null,
        };
      }

      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async updateProject(id: string, project: Project): Promise<Res> {
    try {
      let result = (await Connection.execute("get_project", { id: id }))
        .recordset;

      if (result.length < 1) {
        return {
          success: false,
          message: "Project not found",
          data: null,
        };
      }
      let results = (
        await Connection.execute("update_project", {
          id: project.id,
          name: project.name,
          description: project.description,
          end_date: project.end_date,
          user_id: project.user_id,
          updated_at: project.updated_at,
        })
      ).rowsAffected;

      if (results[0] < 1) {
        return {
          success: false,
          message: "Error while updating",
          data: null,
        };
      }
      return {
        success: true,
        message: "Project Updated successfully",
        data: null,
      };
    } catch (error: any) {
      if (
        error.message.includes(
          'The UPDATE statement conflicted with the FOREIGN KEY constraint "FK_UserID'
        )
      ) {
        return {
          success: false,
          message: "Assigned user does not exist",
          data: null,
        };
      } else if (error.message.includes("Violation of UNIQUE KEY constraint")) {
        return {
          success: false,
          message: "User has already been assigned a project",
          data: null,
        };
      }

      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async getProjects(): Promise<Res> {
    try {
      let response = (await Connection.execute("get_projects", {})).recordset;

      if (response.length < 1) {
        return {
          success: true,
          message: "No projects available",
          data: null,
        };
      }
      return {
        success: true,
        message: "Projects found",
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async getProject(id: string): Promise<Res> {
    try {
      let response = (await Connection.execute("get_project", { id: id }))
        .recordset;

      if (response.length < 1) {
        return {
          success: false,
          message: "Project not found",
          data: null,
        };
      } else {
        return {
          success: true,
          message: "Project found",
          data: response[0],
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async deleteProject(id: string): Promise<Res> {
    try {
      const existsResponse = (
        await Connection.execute("get_project", { id: id })
      ).recordset;

      if (existsResponse.length < 1) {
        return {
          success: false,
          message: "Project does not exist",
          data: null,
        };
      }
      const deletedResponse = (
        await Connection.execute("delete_project", { id: id })
      ).rowsAffected;
      if (deletedResponse[0] < 1) {
        return {
          success: false,
          message: "Error while deleting",
          data: null,
        };
      }
      return {
        success: true,
        message: "Project deleted successfully",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async getMyProject(user_id: string): Promise<Res> {
    try {
      let response = (
        await Connection.execute("get_my_project", { user_id: user_id })
      ).recordset;

      if (response.length < 1) {
        return {
          success: true,
          message: "No project available",
          data: null,
        };
      }
      return {
        success: true,
        message: "Project found",
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }
}
