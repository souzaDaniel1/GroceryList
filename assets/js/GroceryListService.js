import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@3.0.2/dist/dexie.mjs';

let db;

export default class GroceryListService {
    constructor() {
        this.initializeDB();
    }

    initializeDB() {
        db = new Dexie('groceryDB');

        db.version(1).stores({
            products: '++id,product,checked'
        });
        db.on('populate', async () => {
            await db.products.bulkPut([
                { product: 'Tomatoes', checked: false },
                { product: 'Onions', checked: false },
                { product: 'Coffee', checked: false },
                { product: 'Whole milk', checked: false }
            ]);
        });
    }

    save(product) {
        return db.products.put(product);
    }

    getAll() {
        return db.products.toArray();
    }

    get(id) {
        return db.products.get(id);
    }

    delete(id) {
        return db.products.delete(id);
    }

    deleteAll()
    {
        return db.products.clear();
    }
}

