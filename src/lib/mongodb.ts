import { attachDatabasePool } from '@vercel/functions';
import { MongoClient } from "mongodb";

export async function MongoDB() {
    const server = process.env.MONGODB_SERVER
    const user = process.env.MONGODB_USER
    const password = process.env.MONGODB_PASSWORD
    const port = process.env.MONGODB_PORT
    const database = process.env.MONGODB_DATABASE
    const uri = process.env.CALCULADORA_FREELANCER_MONGODB_URI
    
    if (uri) {
        const client = new MongoClient(uri);
        attachDatabasePool(client);
    } else {
        const url = `mongodb://${user}:${password}@!${server}:${port}/${database}?authSource=admin`
        const client = new MongoClient(url);
        attachDatabasePool(client);
    }
}