// will be responsible for calling the loads, that is, the user_loads, etc.

import { LoadcropsDataBase } from "./load_crops.js";
import { LoadFarmsDataBase } from "./load_farms.js";
import { LoadMaintenanceDataBase } from "./load_maintenance.js";
import { LoadProductionDataBase } from "./load_production.js";
import { LoadSensorDataBase } from "./load_sensors.js";

(async () => {
    try {
        console.log('starting seeders...')

        await LoadcropsDataBase()
        await LoadFarmsDataBase()
        await LoadProductionDataBase()
        await LoadSensorDataBase()
        await LoadMaintenanceDataBase()

        console.log('All seeders executed correctly')
    } catch (error) {
        console.error('Error executing seeders', error.message)
    } finally {
        process.exit();
    }
})();

