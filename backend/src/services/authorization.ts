import mssql from "mssql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
import { user_login } from "../interfaces/users";
import { sqlConfig } from "../config/sqlconfig";

export class authorization {
  async Login(Login: user_login) {
    try {
      let pool = await mssql.connect(sqlConfig);

      let user = (
        await pool
          .request()
          .input("email", Login.email)
          .input("password", Login.password)
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

        let PasswordMatch = bcrypt.compareSync(Login.password, hashedpassword);

        if (PasswordMatch) {
          let { name, password, ...rest } = user[0];

          let token = jwt.sign(rest, process.env.SECRET_KEY as string, {
            expiresIn: "2h",
          });
          return {
            success: true,
            message: "Logged in successfully",
            data: token,
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
}
