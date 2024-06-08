import mssql from "mssql";
import { User } from "../interfaces/user";
import { UserService } from "../interfaces/user_service";
import { Res } from "../interfaces/res";
import Connection from "../helpers/dbhelper";

export class UserServices implements UserService {
  async getUser(id: string): Promise<Res> {
    try {
      const response = (await Connection.execute("get_user", { id: id }))
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

  async getUserByEmail(email: string): Promise<Res> {
    try {
      const response = (
        await Connection.execute("get_user_email", { email: email })
      ).recordset;
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

  async getUsers(): Promise<Res> {
    try {
      const response = (await Connection.execute("get_users", {})).recordset;
      return {
        success: true,
        message: "Users found",
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

  async getAssigned(): Promise<Res> {
    try {
      const response = (await Connection.execute("get_assigned", {})).recordset;
      if (response.length < 1) {
        return {
          success: false,
          message: "No assigned users found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Assigned users found",
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

  async getUnassigned(): Promise<Res> {
    try {
      const response = (await Connection.execute("get_unassigned", {}))
        .recordset;
      if (response.length < 1) {
        return {
          success: false,
          message: "No unassigned users found",
          data: null,
        };
      }
      return {
        success: true,
        message: "Unassigned users found",
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
