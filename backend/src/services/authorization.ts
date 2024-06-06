import mssql from "mssql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
import { sqlConfig } from "../config/sqlconfig";
import { User, user_login } from "../interfaces/users";

export class Authorization {
  async login(login: user_login) {
    try {
      let pool = await mssql.connect(sqlConfig);

      let user = (
        await pool
          .request()
          .input("email", login.email)
          .input("password", login.password)
          .execute("logins")
      ).recordset;

      if (user.length < 1) {
        return {
          success: false,
          message: "User doesn't exist",
          data: null,
        };
      } else {
        let hashedpassword = user[0].password;

        let PasswordMatch = bcrypt.compareSync(login.password, hashedpassword);

        if (PasswordMatch) {
          let { name, password, ...rest } = user[0];

          jwt.sign(rest, process.env.SECRET_KEY as string, {
            expiresIn: "2h",
          });
          return {
            success: true,
            message: "Logged in successfully",
            data: null,
          };
        } else {
          return {
            success: false,
            message: "Incorrect password",
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

  async RegisterUser(user: User) {
    try {
      let pool = await mssql.connect(sqlConfig);
      let hashedpassword = bcrypt.hashSync(user.password as string, 6);

      if (pool.connected) {
        let results = (
          await pool
            .request()
            .input("id", user.id)
            .input("name", user.name)
            .input("email", user.email)
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
    } catch (error: any) {
      if (error.message.includes("Violation of UNIQUE KEY constraint")) {
        return {
          success: false,
          message: "Email is in use",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "An error occurred",
          data: null,
        };
      }
    }
  }
}
