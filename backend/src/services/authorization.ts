import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../interfaces/user";
import { Auth } from "../interfaces/auth";
import { Res } from "../interfaces/res";
import { user_login } from "../interfaces/user_login";
import Connection from "../helpers/dbhelper";
import { user_details } from "../interfaces/user_details";

export class Authorization implements Auth {
  async login(login: user_login): Promise<Res> {
    try {
      let user = (
        await Connection.execute("check_email", {
          email: login.email,
        })
      ).recordset;
      if (user.length < 1) {
        return {
          success: false,
          message: "Invalid email or password",
          data: null,
        };
      }
      let hashed_password = user[0].password;
      let passwordsMatch = bcrypt.compareSync(login.password, hashed_password);
      if (!passwordsMatch) {
        return {
          success: false,
          message: "Invalid email or password",
          data: null,
        };
      }
      let rest = {
        id: user[0].id,
      };
      const token = jwt.sign(rest, process.env.JWT_SECRET as string, {
        expiresIn: "15m",
      });
      return {
        success: true,
        message: "Logged in successfully",
        data: { role: user[0].role, token },
      };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async register(user: User): Promise<Res> {
    try {
      user.password = bcrypt.hashSync(user.password as string, 6);

      let results = (
        await Connection.execute("register", {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        })
      ).rowsAffected;

      if (results[0] < 1) {
        return {
          success: false,
          message: "Failed to create account",
          data: null,
        };
      }
      let rest = {
        id: user.id,
      };

      const token = jwt.sign(rest, process.env.JWT_SECRET as string, {
        expiresIn: "15m",
      });
      return {
        success: true,
        message: "Account successfully created",
        data: { role: user.role, token },
      };
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

  async updateDetails(userDetails: user_details): Promise<Res> {
    try {
      let results = (
        await Connection.execute("update_details", {
          id: userDetails.id,
          name: userDetails.name,
          email: userDetails.email,
        })
      ).rowsAffected;

      if ((results[0] = 1)) {
        return {
          success: true,
          message: "Account details updated",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "Failed to update account details",
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

  async updatePassword(
    id: string,
    oldPassword: string,
    password: string
  ): Promise<Res> {
    try {
      let user = (
        await Connection.execute("get_password", {
          id: id,
        })
      ).recordset;
      if (user.length < 1) {
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }
      let passwordsMatch = bcrypt.compareSync(oldPassword, user[0].password);
      if (!passwordsMatch) {
        return {
          success: false,
          message: "Invalid password",
          data: null,
        };
      }
      let hashed_password = bcrypt.hashSync(password, 6);
      let results = (
        await Connection.execute("update_password", {
          id: id,
          password: hashed_password,
        })
      ).rowsAffected;
      if (results[0] < 1) {
        return {
          success: false,
          message: "Failed to update password",
          data: null,
        };
      }
      return {
        success: true,
        message: "Password updated",
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "An error occurred",
        data: null,
      };
    }
  }

  async updateForgotPassword(id: string, password: string): Promise<Res> {
    try {
      let hashed_password = bcrypt.hashSync(password, 6);

      let results = (
        await Connection.execute("update_password", {
          id: id,
          password: hashed_password,
        })
      ).rowsAffected;

      if ((results[0] = 1)) {
        return {
          success: true,
          message: "Password updated",
          data: null,
        };
      } else {
        return {
          success: false,
          message: "Failed to update password",
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
