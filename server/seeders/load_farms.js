// is responsible for loading the users into the database
// will be responsible for calling the loads, i.e., load_users, etc.
import fs from 'fs';  // library that allows you to read files
import path from 'path';  // this shows the current route
import csv from 'csv-parser'
import {pool} from '../conexion_db.js';  // we bring the db connection pool

export async function LoadFarmsDataBase() {
    const pathFile = path.resolve('server/data/01_famrs.csv') // here we indicate the address of the corp csv file
    const farms = []; // an empty list where the data will be stored  

    return new Promise ((resolve, rejetc) =>{
        fs.createReadStream(pathFile) 
        .pipe(csv()) 

       // this takes care of filling the list above 'farms' it makes an array of arrays
        .on('data', (row) => {
            farms.push([
                row.id_farm.trim(),
                row.farm_name,
                row.region,
                row.id_crop
            ]);
        })

        .on('end', async () => {
            try {
                const sql = 'INSERT INTO farms (id_farm,farm_name,region,id_crop) VALUES ?';
                const [result] = await pool.query(sql, [farms]);

                console.log(`✅ They were inserted ${result.affectedRows} farms.`);
                resolve(); // Termina exitosamente
            } catch (error) {
                console.error('❌ Error inserting farms:', error.message);
                rejetc(error);
            }
        })

        .on('error', (err) => {
            console.error('Error reading farms csv file', err.message)  // el err.message es para que te diga el error especificamente
            rejetc(err)
        });

    })
}
