// is responsible for loading the users into the database
// will be responsible for calling the loads, i.e., load_users, etc.
import fs from 'fs';  // library that allows you to read files
import path from 'path';  // this shows the current route
import csv from 'csv-parser'
import {pool} from '../conexion_db.js';  // we bring the db connection pool

export async function LoadProductionDataBase() {
    const pathFile = path.resolve('server/data/03_productions.csv')  // here we indicate the address of the producticon csv file
    const producticon = []; // an empty list where the data will be stored   

    return new Promise ((resolve, rejetc) =>{
        fs.createReadStream(pathFile) 
        .pipe(csv()) 

       // this takes care of filling the list above 'producticon' it makes an array of arrays
        .on('data', (row) => {
            producticon.push([
                row.id_production,
                row.production,
                row.date_time
            ]);
        })

        .on('end', async () => {
            try {
                const sql = 'INSERT INTO productions (id_production,production,date_time) VALUES ?';
                const [result] = await pool.query(sql, [producticon]);

                console.log(`✅ They were inserted ${result.affectedRows} producticon.`);
                resolve();
            } catch (error) {
                console.error('❌ Error inserting producticon:', error.message);
                rejetc(error);
            }
        })

        .on('error', (err) => {
            console.error('Error reading producticon csv file', err.message)
            rejetc(err)
        });

    })
}
