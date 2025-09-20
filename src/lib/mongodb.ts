import { connect } from 'mongoose';

export async function MongoDB() {
    const server = process.env.MONGO_DB_SERVER
    const user = process.env.MONGO_DB_USER
    const password = process.env.MONGO_DB_PASSWORD
    const port = process.env.MONGO_DB_PORT
    const database = process.env.MONGO_DB_DATABASE
    const app_name = process.env.MONGO_DB_APP_NAME
    if (app_name) {
        await connect(`mongodb+srv://${user}:${password}@${server}/?retryWrites=true&w=majority&appName=${app_name}`)
    } else {
        await connect(`mongodb://${user}:${password}@!${server}:${port}/${database}?authSource=admin`)
    }
}