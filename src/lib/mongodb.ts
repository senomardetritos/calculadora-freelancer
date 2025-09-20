import { connect } from 'mongoose';

export async function MongoDB() {
    await connect('mongodb://admin:123456@localhost:27017/mongo-dev?authSource=admin')
}