const dotenv = require("dotenv")
const mysql = require("mysql")
dotenv.config()

const sql_host_name = process.env.SQL_HOST_NAME
const sql_user = process.env.SQL_USER
const sql_password = process.env.SQL_PASSWORD
const sql_port = process.env.SQL_PORT
console.log(`${sql_host_name} ${sql_user} ${sql_password} ${sql_password} ${sql_port}
}}`)
const sql_connection = mysql.createConnection({
    host: sql_host_name,
    user: sql_user,
    password: sql_password,
    port: sql_port,
    database: "my_db"
})
sql_connection.connect(err=> {
    if(err){
        console.log(`Could not connect: ${err}`)
    } else{
        console.log(`Connected`)
        // const sql = "DROP TABLE recommend"
        const sql = "CREATE TABLE recommend (email VARCHAR(255), username VARCHAR(255), track JSON)"
        sql_connection.query(sql, (err, result)=>{
            if (err){
                console.log(`Error in creating table: ${err}`)
            } else {
                console.log(`Table created`)
            }
        })
    }
})