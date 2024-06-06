import mssql from "mssql";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";
import lodash from "lodash";
import { User } from "../interfaces/users";
import { sqlConfig } from "../config/sqlconfig";

export class UserService {
  async RegisterUser(users: User) {
    try {
      let pool = await mssql.connect(sqlConfig);

      let User_id = v4();
      let hashedpassword = bcrypt.hashSync(users.password as string, 6);

      if (pool.connected) {
        let Emailexists = (await pool.request().execute("checkEmail"))
          .recordset;

        if (!lodash.isEmpty(Emailexists)) {
          return {
            success: false,
            message: "Email is in use",
            data: null,
          };
        }
        let results = (
          await pool
            .request()
            .input("id", mssql.VarChar, User_id)
            .input("name", users.name)
            .input("email", users.email)
            .input("password", hashedpassword)
            .execute("RegisterUser")
        ).rowsAffected;

        if ((results[0] = 1)) {
          return {
            success: true,
            message: "Account successfully created",
            data: null,
          };
        } else {
          return {
            success: false,
            message: "Failed to create account",
            data: null,
          };
        }
      } else {
        return {
          success: false,
          message: "Unable to Connect",
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
