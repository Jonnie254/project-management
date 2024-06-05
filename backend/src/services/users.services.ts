import mssql from 'mssql';
import {v4} from 'uuid';
import bcrypt from 'bcryptjs';
import lodash from 'lodash';
import {User} from '../interfaces/users';
import {sqlConfig} from '../config/sqlconfig';

export class UserService{
    async RegisterUser (users:User){
        let pool = await mssql.connect(sqlConfig)

        let User_id = v4()
        let hashedpassword = bcrypt.hashSync(users.password, 6)

        if(pool.connected){

            let Emailexists=(await pool.request().execute('checkEmail')).recordset

            if (!lodash.isEmpty(Emailexists)){
                return {
                    error:"Email is in use"
                }
            }
            let results =(await pool.request()
            .input("id", mssql.VarChar, User_id)
            .input("name", users.name)
            .input("email", users.email)
            .input("password", hashedpassword)
            .execute("RegisterUser")).rowsAffected

            if(results[0] = 1){
                return{
                    message:"Account successfully created"
                }
         }else{
                return{
                    error:"Failed to create account"
                }
             }
        }else{
                    return{
                        error:"Unable to Connect"
                 }
            }
        }
        async FetchAllUsers(){
            let pool = await mssql.connect(sqlConfig)
            let results = (await pool.request().execute("fetchAllUsers")).recordset

            if(results.length == 0){
                return{
                    message:"No users are registered"
             }
         }else{
                return{
                    users: results
             }
        }
    }
}

