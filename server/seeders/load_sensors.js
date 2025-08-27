// is responsible for loading the users into the database
// will be responsible for calling the loads, i.e., load_users, etc.
import fs from 'fs';  // library that allows you to read files
import path from 'path';  // this shows the current route
import csv from 'csv-parser'
import {pool} from '../conexion_db.js';  // we bring the db connection pool

export async function LoadSensorDataBase() {
    const pathFile = path.resolve('server/data/04_sensors.csv')  // here we indicate the address of the sensor csv file
    const sensor = []; // an empty list where the data will be stored   

    return new Promise ((resolve, rejetc) =>{
        fs.createReadStream(pathFile) 
        .pipe(csv()) 

       // this takes care of filling the list above 'sensor' it makes an array of arrays
        .on('data', (row) => {
            sensor.push([
                row.id_sensor,
                row.sensor_type,
                row.sensor_status,
                row.id_maintenance
            ]);
        })

        .on('end', async () => {
            try {
                const sql = 'INSERT INTO sensors (id_sensor,sensor_type,sensor_status,id_maintenance) VALUES ?';
                const [result] = await pool.query(sql, [sensor]);

                console.log(`✅ They were inserted ${result.affectedRows} sensor.`);
                resolve();
            } catch (error) {
                console.error('❌ Error inserting sensor:', error.message);
                rejetc(error);
            }
        })

        .on('error', (err) => {
            console.error('Error reading sensor csv file', err.message)
            rejetc(err)
        });

    })
}
