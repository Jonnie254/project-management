import mssql from "mssql";
import lodash, { result } from "lodash";
import { Projects } from "../interfaces/projects";
import { v4 } from "uuid";
import { sqlConfig } from "../config/sqlconfig";

export class projectServices {
  async createProject(project: Projects) {
    try {
      let pool = await mssql.connect(sqlConfig);

      let results = await (
        await pool
          .request()
          .input("id", v4())
          .input("name", project.project_name)
          .input("description", project.description)
          .input("end_date", project.end_date)
          .input("created_at", project.created_at)
          .input("updated_at", project.updated_at)
          .execute("createProject")
      ).rowsAffected;

      console.log(results);

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
    } catch (error) {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async updateProject(project_id: string, project: Projects) {
    try {
      let pool = await mssql.connect(sqlConfig);

      let ProjectExists = await (
        await pool.request().execute("updatequery")
      ).recordset;

      console.log(ProjectExists);

      if (lodash.isEmpty(ProjectExists)) {
        return {
          success: false,
          message: "Project not found",
          data: null,
        };
      } else {
        let results = (
          await pool
            .request()
            .input("id", ProjectExists[0].id)
            .input("name", project.project_name)
            .input("description", project.description)
            .input("end_date", project.end_date)
            .input("updated_at", project.updated_at)
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
            message: "Project Updated successfully",
            data: null,
          };
        }
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

  async fetchProject(project_id: string) {
    try {
      let pool = await mssql.connect(sqlConfig);
      let response = (await pool.request().execute("selectOne")).recordset;

      if (response.length < 1) {
        return {
          success: false,
          message: "No projects Found",
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

  async deleteProject(project_id: string) {
    try {
      let pool = await mssql.connect(sqlConfig);
      let response = (await pool.request().execute("deleteProject")).recordset;

      if (response.length < 1) {
        return {
          success: false,
          message: "Project not Found",
          data: null,
        };
      } else {
        await pool.request().execute("deleteProject");
        return {
          success: true,
          message: "Project deleted successfully",
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
}
