import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";
import exp from "constants";

const defaultObject = {
    name: '[Test-12345] Test Name',
    description: 'lala',
    url: "http://hello.pl",
    price: 0,
    lat: 9,
    lon: 9,
}


afterAll(async () => {
    await pool.end();
})

test('AdRecord returns data from database for one entry', async()=> {
    const ad = await AdRecord.getOne('abc')
    expect(ad).toBeDefined()
    expect(ad.id).toBe('abc')
    expect(ad.name).toBe('Test')
})

test('AdRecord.getOne returns null from database for unexisting entry.', async()=> {
    const ad = await AdRecord.getOne('---')
    expect(ad).toBeNull();
})

test('AdRecord.findAll returns array of found entries', async()=> {
    const ads = await AdRecord.findAll('')
    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined()
})

test('AdRecord.findAll returns empty array when searching for "a"', async()=> {
 const ads = await AdRecord.findAll('a');
    expect(ads[0].id).toBeDefined()
})

test('AdRecord.findAll returns empty array when searching for something that does not exists.', async()=> {
    const ads = await AdRecord.findAll('-----------------------');
    expect(ads).toEqual([]);
})

test('Insert new data and returns new UUID', async() => {
    const ad = new AdRecord(defaultObject)
    await ad.insert();
    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
})

test('AdRecord.insert inserts data to database', async() => {
    const ad = new AdRecord(defaultObject)
    await ad.insert();
    const foundAd = await AdRecord.getOne(ad.id)

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
})




