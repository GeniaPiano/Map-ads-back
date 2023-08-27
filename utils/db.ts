import {createPool} from "mysql2/promise";

export const pool = {
    host: 'localhost',
    user: 'root',
    database: 'map-adds',
    namedPlaceholders: true,
    decimalNumbers: true,
}