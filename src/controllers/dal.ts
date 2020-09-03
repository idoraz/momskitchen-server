import { Db } from 'mongodb';
import mongoose from 'mongoose';
import { MONGODB_URI } from '../util/secrets';

export default async function (): Promise<Db> {
    const uri: string = MONGODB_URI || 'mongodb://127.0.0.1:27017/momskitchen';
    const db = mongoose.connect(uri, {
        useMongoClient: true
    });
    return await db;
}
