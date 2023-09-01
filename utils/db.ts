import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'map_ads',
    namedPlaceholders: true,
    decimalNumbers: true,
})