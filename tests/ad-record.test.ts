import {AdRecord} from "../records/ad.record";

const defaultObject = {
    name: 'Test Name',
    description: 'lala',
    url: "http://hello.pl",
    price: 0,
    lat: 9,
    lon: 9,
}

test('Can build AdRecord', ()=> {
    const ad = new AdRecord(defaultObject)

    expect(ad.name).toBe('Test Name')
    expect(ad.description).toBe('lala')
});

test('Validates invalid price', ()=> {
    expect(() => new AdRecord({
        ...defaultObject,
        price: -4
    })).toThrow('Price cannot contain less than 0 numbers or more than 10 numbers')
})