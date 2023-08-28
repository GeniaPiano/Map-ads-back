import {createPool} from "mysql2/promise";

export const pool = {
    host: 'localhost',
    user: 'root',
    database: 'map_ads',
    namedPlaceholders: true,
    decimalNumbers: true,
}