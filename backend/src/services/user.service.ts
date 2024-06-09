import Connection from "../helpers/dbhelper";
import { Res } from "../interfaces/res";

export class UserServices {
  async getMyDetails(id: string): Promise<Res> {
    try {
      const response = (await Connection.execute("get_my_details", { id: id }))
        .recordset;
      if (response.length < 1) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }
      return {
        success: true,
        message: "User found",
        data: response[0],
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
