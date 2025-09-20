import { connect } from 'mongoose';

export async function MongoDB() {
    const server = process.env.MONGO_DB_SERVER
    const user = process.env.MONGO_DB_USER
    const password = process.env.MONGO_DB_PASSWORD
    const port = process.env.MONGO_DB_PORT
    const database = process.env.MONGO_DB_DATABASE
    await connect(`mongodb://${user}:${password}@!${server}:${port}/${database}?authSource=admin`)
}