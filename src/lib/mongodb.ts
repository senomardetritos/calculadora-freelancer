import { connect, Mongoose } from 'mongoose';

let cachedConnection: Mongoose;

export async function MongoDB() {
    if (cachedConnection) {
        return cachedConnection;
    }
    const server = process.env.MONGODB_SERVER
    const user = process.env.MONGODB_USER
    const password = process.env.MONGODB_PASSWORD
    const port = process.env.MONGODB_PORT
    const database = process.env.MONGODB_DATABASE
    const uri = process.env.CALCULADORA_FREELANCER_MONGODB_URI
    const opts = {
        bufferCommands: false,
    }
    if (uri) {
        cachedConnection = await connect(uri, opts)
    } else {
        cachedConnection = await connect(`mongodb://${user}:${password}@${server}:${port}/${database}?authSource=admin`)
    }
    return cachedConnection
}