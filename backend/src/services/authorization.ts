import mssql from 'mssql'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
import { login_dets } from '../interfaces/users'
import { sqlConfig } from '../config/sqlconfig'

export class  authorization{
    async Login(Login: login_dets){
        let pool = await mssql.connect(sqlConfig)

        let user = (await pool.request()
        .input("email", Login.email)
        .input("password", Login.password)
        .execute("logins")).recordset

        if(UserActivation.length <1){
            return{
                error:"User doesn't exist"
            }
        }else{
            let hashedpassword=user[0].password


            let PasswordMatch = bcrypt.compareSync(Login.password, hashedpassword)

            if(PasswordMatch){
                let {name, password, ...rest} = user[0]

                let token = jwt.sign(rest, process.env.SECRET_KEY as string,{
                    expiresIn: '2h'
                })
                return{
                    message:"Logged in successfully",
                    token
                }
                
            }else{
                return{
                    error: "Incorrect password"
                }
            }
        }
    }

}