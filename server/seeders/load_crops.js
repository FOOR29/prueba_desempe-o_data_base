// is responsible for loading the users into the database
// will be responsible for calling the loads, i.e., load_users, etc.
import fs from 'fs';  // library that allows you to read files
import path from 'path';  // this shows the current route
import csv from 'csv-parser'
import {pool} from '../conexion_db.js';  // we bring the db connection pool

export async function LoadcropsDataBase() {
    const pathFile = path.resolve('server/data/02_crops.csv')  // here we indicate the address of the crops csv file
    const crops = []; // an empty list where the data will be stored   

    return new Promise ((resolve, rejetc) =>{
        fs.createReadStream(pathFile) 
        .pipe(csv()) 

       // this takes care of filling the list above 'crops' it makes an array of arrays
        .on('data', (row) => {
            crops.push([
                row.id_crop,
                row.crop_type,
                row.crop_variety,
                row.soil_type,
                row.irrigation_system,
                row.fertelizer_used,
                row.organic
            ]);
        })

        .on('end', async () => {
            try {
                const sql = 'INSERT INTO crops (id_crop,crop_type,crop_variety,soil_type,irrigation_system,fertelizer_used,organic) VALUES ?';
                const [result] = await pool.query(sql, [crops]);

                console.log(`✅ They were inserted ${result.affectedRows} crops.`);
                resolve();
            } catch (error) {
                console.error('❌ Error inserting crops:', error.message);
                rejetc(error);
            }
        })

        .on('error', (err) => {
            console.error('Error reading crops csv file', err.message)
            rejetc(err)
        });

    })
}
