// is responsible for loading the users into the database
// will be responsible for calling the loads, i.e., load_users, etc.
import fs from 'fs';  // library that allows you to read files
import path from 'path';  // this shows the current route
import csv from 'csv-parser'
import {pool} from '../conexion_db.js';  // we bring the db connection pool

export async function LoadMaintenanceDataBase() {
    const pathFile = path.resolve('server/data/05_maintenance.csv')  // here we indicate the address of the maintenance csv file
    const maintenance = []; // an empty list where the data will be stored   

    return new Promise ((resolve, rejetc) =>{
        fs.createReadStream(pathFile) 
        .pipe(csv()) 

       // this takes care of filling the list above 'maintenance' it makes an array of arrays
        .on('data', (row) => {
            maintenance.push([
                row.id_maintenance,
                row.maintenance_date,
                row.worth
            ]);
        })

        .on('end', async () => {
            try {
                const sql = 'INSERT INTO productions (id_maintenance,maintenance_date,worth) VALUES ?';
                const [result] = await pool.query(sql, [maintenance]);

                console.log(`✅ They were inserted ${result.affectedRows} maintenance.`);
                resolve();
            } catch (error) {
                console.error('❌ Error inserting maintenance:', error.message);
                rejetc(error);
            }
        })

        .on('error', (err) => {
            console.error('Error reading maintenance csv file', err.message)
            rejetc(err)
        });

    })
}
