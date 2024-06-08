import mssql from "mssql";
import { Projects } from "../interfaces/projects";
import { sqlConfig } from "../config/sqlconfig";

export class projectServices {
  async createProject(project: Projects) {
    try {
      let pool = await mssql.connect(sqlConfig);

      let results = (
        await pool.request()
          .input("id", mssql.VarChar(255), project.id)
          .input("name", mssql.VarChar(255), project.name)
          .input("description", mssql.VarChar(255), project.description)
          .input("end_date", mssql.DateTime2, project.end_date)
          .input("users_id", mssql.VarChar(255), project.users_id)
          .input("created_at", mssql.DateTime2, project.created_at)
          .input("updated_at", mssql.DateTime2, project.updated_at)
          .execute("createProject")
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
        return {
          success: false,
          message: "Project not found",
          data: null,
        };
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
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async fetchProjects() {
    try {
      let pool = await mssql.connect(sqlConfig);

      let response = (await pool.request().execute("fetchProjects")).recordset;

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

  async fetchProject(project_id: string) {
    try {
      let pool = await mssql.connect(sqlConfig);
      let response = (
        await pool.request()
          .input("id", mssql.VarChar(255), project_id)
          .execute("selectOne")
      ).recordset;

      if (response.length < 1) {
        return {
          success: false,
          message: "No projects found",
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
