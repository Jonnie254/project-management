import mssql from 'mssql'
import lodash, { result } from 'lodash'
import { Projects } from '../interfaces/projects'
import { v4 } from 'uuid'
import { sqlConfig } from '../config/sqlconfig'

export class projectServices{

    async createProject(project:Projects){
        let pool = await mssql.connect(sqlConfig)

        let results = await( await pool.request()
        .input("id", v4())
        .input("name", project.project_name)
        .input("description", project.description)
        .input("end_date", project.end_date)
        .input("created_at", project.created_at)
        .input("updated_at",project.updated_at)
        .execute("createProject")).rowsAffected

         console.log(results);

         if(results[0]==1){
            return{
             message:"Project created successfully"
            }
        }else{
             return{
             error:"Error while creating project"
             }
         }
    }

    async updateProjects(project_id:string, project: Projects){
        let pool = await mssql.connect(sqlConfig)

        let ProjectExists = await(await pool.request().execute("updatequery")).recordset

        console.log(ProjectExists);
        
        if(lodash.isEmpty(ProjectExists)){
            return{
                error:"Project not found"
            }
        }else{
            let results = (await pool.request()
        .input("id", ProjectExists[0].id)
        .input("name", project.project_name)
        .input("description", project.description)
        .input("end_date", project.end_date)
        .input("updated_at",project.updated_at)
        .execute("updateProject")).rowsAffected

        if (results[0] <1){
            return{
                error:"Error while updating"
            }
        }else{
            return{
                message: "Project Updated successfully"
            }
        };

        }
    }

    async fetchProjects(){
        let pool = await mssql.connect(sqlConfig)

        let response = (await pool.request().execute("fetchProjects")).recordset
        return{
            projects: response
        }
    }

    async fetchOneProject(project_id:string){
        let pool = await mssql.connect(sqlConfig)
        let response = (await pool.request().execute("selectOne")).recordset

        if (response.length < 1){
            return {
                message: "No projects Found"
            }
        }else{
            return{
                projects: response[0]
            }
        }
        
    }

async deletProject(project_id:string){
    let pool = await mssql.connect(sqlConfig)
    let response = (await pool.request(). execute("deleteProject")).recordset

    if (response.length<1){
        return{
            message: "Project not Found"
        }
    }else{
        await pool.request().execute("deleteProject")
        return{
            message:"Project deleted successfully"
        }
    }
}

}