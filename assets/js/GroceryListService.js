import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@3.0.2/dist/dexie.mjs';

let db;

export default class GroceryListService {
    constructor() {
        this.initializeDB();
        console.log("Passing here")
    }

    initializeDB() {
        db = new Dexie('groceryDB');

        db.version(1).stores({
            products: '++id,product,checked'
        });
        console.log("Passing here1")
        db.on('populate', async () => {
            await db.products.bulkPut([
                { product: 'Tomatoes', checked: false },
                { product: 'Onions', checked: false },
                { product: 'Coffee', checked: false },
                { product: 'Whole milk', checked: false }
            ]);
        });
    }

    getAll() {
        return db.products.toArray();
    }
}

