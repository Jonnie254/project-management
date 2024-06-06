import mssql from "mssql";
import { v4 } from "uuid";
import { User } from "../interfaces/users";
import { sqlConfig } from "../config/sqlconfig";

export class UserService {
  async FetchAllUsers() {
    try {
      let pool = await mssql.connect(sqlConfig);
      let results = (await pool.request().execute("fetchAllUsers")).recordset;

      if (results.length == 0) {
        return {
          success: true,
          message: "No users are registered",
          data: null,
        };
      } else {
        return {
          success: true,
          message: "users found",
          data: results,
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
