import mysql from "mysql2/promise"

/// un pool es un sistema que le permite crear muchas conexxions

//con esto ya tenemos la conexion
export const pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    password: "NewStrongPass123!",
    database: "prueba_forlan_coder_cienaga",
    user: "root",
    connectionLimit: 10, 
    waitForConnections: true, 
    queueLimit: 0  
})

async function TestTheConnectionTheDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log('Connection to the db successful')
        connection.release
    } catch (error) {
        console.error('Error connecting to database')
    }
}

TestTheConnectionTheDatabase();  


