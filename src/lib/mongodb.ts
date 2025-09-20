import { connect } from 'mongoose';

export async function MongoDB() {
    const server = process.env.MONGODB_SERVER
    const user = process.env.MONGODB_USER
    const password = process.env.MONGODB_PASSWORD
    const port = process.env.MONGODB_PORT
    const database = process.env.MONGODB_DATABASE
    const uri = process.env.MONGODB_URI
    if (uri) {
        await connect(uri)
    } else {
        await connect(`mongodb://${user}:${password}@!${server}:${port}/${database}?authSource=admin`)
    }
}