import mssql from "mssql";
<<<<<<< HEAD
import { Projects } from "../interfaces/projects";
import { sqlConfig } from "../config/sqlconfig";
=======
import lodash from "lodash";
import { Project } from "../interfaces/project";
import { ProjectService } from "../interfaces/project_service";
import { Res } from "../interfaces/res";
import Connection from "../helpers/dbhelper";
import { RequestError } from "mssql";
>>>>>>> adbbaf2908af5ff9cbc853a6f35ed5ece0462ab8

export class projectServices implements ProjectService {
  async createProject(project: Project): Promise<Res> {
    try {
      let results = (
<<<<<<< HEAD
        await pool.request()
          .input("id", mssql.VarChar(255), project.id)
          .input("name", mssql.VarChar(255), project.name)
          .input("description", mssql.VarChar(255), project.description)
          .input("end_date", mssql.DateTime2, project.end_date)
          .input("users_id", mssql.VarChar(255), project.users_id)
          .input("created_at", mssql.DateTime2, project.created_at)
          .input("updated_at", mssql.DateTime2, project.updated_at)
          .execute("createProject")
=======
        await Connection.execute("create_project", {
          id: project.id,
          name: project.name,
          description: project.description,
          end_date: project.end_date,
          user_id: project.user_id,
          created_at: project.created_at,
          updated_at: project.updated_at,
        })
>>>>>>> adbbaf2908af5ff9cbc853a6f35ed5ece0462ab8
      ).rowsAffected;

      if (results[0] === 1) {
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
<<<<<<< HEAD
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: "Server error",
        data: null,
      };
    }
  }

  async updateProject(project_id: string, project: Projects) {
    try {
      let pool = await mssql.connect(sqlConfig);
      let ProjectExists = (
        await pool.request()
          .input("id", mssql.VarChar(255), project_id)
          .execute("selectOne")
      ).recordset;

      if (ProjectExists.length === 0) {
=======
    } catch (error: any) {
      if (
        error.message.includes(
          'The INSERT statement conflicted with the FOREIGN KEY constraint "FK_UserID"'
        )
      ) {
>>>>>>> adbbaf2908af5ff9cbc853a6f35ed5ece0462ab8
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
<<<<<<< HEAD
      }
      if (project.users_id && project.users_id.trim() !== '') {
        let UserExists = (
          await pool.request()
            .input("id", mssql.VarChar(255), project.users_id.trim())
            .execute("selectOne")  
        ).recordset;

        if (UserExists.length === 0) {
          return {
            success: false,
            message: "Invalid user ID",
            data: null,
          };
        }
      }

      let results = (
        await pool.request()
          .input("id", mssql.VarChar(255), project_id)
          .input("name", mssql.VarChar(255), project.name )
          .input("description", mssql.VarChar(255), project.description )
          .input("end_date", mssql.DateTime2, project.end_date || new Date())
          .input("users_id", mssql.VarChar(255), project.users_id ? project.users_id.trim() : null)
          .input("created_at", mssql.DateTime2, project.created_at || new Date())
          .input("updated_at", mssql.DateTime2, project.updated_at || new Date())
          .execute("updateProject")
      ).rowsAffected;

      if (results[0] < 1) {
        return {
          success: false,
          message: "Error while updating",
          data: null,
        };
      } else {
        return {
          success: true,
          message: "Project updated successfully",
          data: null,
        };
      }
    } catch (error) {
=======
      }

>>>>>>> adbbaf2908af5ff9cbc853a6f35ed5ece0462ab8
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
        success:true,
        message:"Suuccessful",
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
<<<<<<< HEAD
      let pool = await mssql.connect(sqlConfig);
      let response = (
        await pool.request()
          .input("id", mssql.VarChar(255), project_id)
          .execute("selectOne")
      ).recordset;
=======
      let response = (await Connection.execute("get_project", { id: id }))
        .recordset;
>>>>>>> adbbaf2908af5ff9cbc853a6f35ed5ece0462ab8

      if (response.length < 1) {
        return {
          success: false,
<<<<<<< HEAD
          message: "No projects found",
=======
          message: "Project not found",
>>>>>>> adbbaf2908af5ff9cbc853a6f35ed5ece0462ab8
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

<<<<<<< HEAD
  async deleteProjects(project_id: string) {
    try {
      let pool = await mssql.connect(sqlConfig);

      const result = await pool.request()
        .input("id", mssql.VarChar(255), project_id)
        .execute("deleteProject");
      
    
      if (result.rowsAffected[0] === 0) {
        return {
          success: false,
          message: "Project not found",
          data: null,
        };
      }
=======
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
>>>>>>> adbbaf2908af5ff9cbc853a6f35ed5ece0462ab8
      return {
        success: true,
        message: "Project deleted successfully",
        data: null,
      };
    } catch (error) {
      console.error("Error deleting project:", error); // Added logging for debugging
      return {
        success: false,
        message: "An error occurred",
        data: null,
      }
    }
  }
}
