import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/error";
import {v4 as uuid} from 'uuid'
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";


type AdRecordResults = [AdEntity[], FieldPacket[]]

export class AdRecord implements AdEntity {

   public id: string;
   public name: string;
   public description: string;
   public price: number;
   public url: string;
   public lat: number;
   public lon: number;

    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length > 100)  {
            throw new ValidationError('Name is required and must contain at most 100 chars')
        }

        if (obj.description.length > 1024){
            throw new ValidationError('Description cannot contain more than 1000 chars')
        }

        if(obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Price cannot contain less than 0 numbers or more than 10 numbers')
        }

        //@todo sprawdzdić czy link istnieje
       if (!obj.url || obj.url.length > 100) {
           throw new ValidationError('The link cannot be empty and cannot contain more than 100 chars')
       }

       if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
           throw new ValidationError('Cannot find location of ad.')
       }


        this.id = obj.id
        this.name = obj.name;
        this.description = obj.description;
        this.url = obj.url;
        this.price = obj.price;
        this.lon = obj.lon;
        this.lat = obj.lat
    }

    static async getOne(id: string): Promise<AdRecord | null> {
     const [results] =  await pool.execute("SELECT * FROM `ads` WHERE `id` = :id ", {
            id: id,
        }) as AdRecordResults;
     return results.length === 0 ? null :  new AdRecord(results[0])

    }

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;
        return results.map(result => {
            const {
                id, lat, lon,
            } = result;
            return {
                id, lat, lon,
            };
        });
    }

    // static async findAll(name: string): Promise<SimpleAdEntity[]> {
    //     if (name === '') {
    //         const [allAds] = await pool.execute("SELECT * ROM `ads`") as AdRecordResults
    //         return allAds.map(result => {
    //             const {id, lat, lon} = result;
    //             return {id, lat, lon}
    //         });
    //     } else {
    //         const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
    //             search: `%${name}%`,
    //         }) as AdRecordResults;
    //
    //         return results.map(result => {
    //             const {id, lat, lon} = result;
    //             return {id, lat, lon}
    //         });
    //     }
    // }



    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid()
        } else {
            throw new Error('Cannot insert something that is already inserted')
        }

        await pool.execute("INSERT INTO `ads`(`id`, `name`, `description`, `lat`, `lon`, `price`, `url`) VALUES(:id, :name, :description, :url, :lat, :lon, :price)", this)
    }
}