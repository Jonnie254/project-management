import mssql from "mssql";
import dotenv from "dotenv";

dotenv.config();

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: process.env.MA_SERVER as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

async function test() {
  let pool = await mssql.connect(sqlConfig);
  if (pool.connected) {
    console.log("Connection established ...");
  } else {
    console.log("Error establishing connection");
  }
}
test();
