import { MONGODB_URI } from './../util/secrets';
import logger from './../util/logger';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
// import assert from "assert";

export default async function (): Promise<Db> {
    const url: string = process.env.MONGODB_URI;
    const db_name: string = 'momskitchen';

    const uri = process.env.mongodb_cn || url;
    let client = await MongoClient.connect(uri);
    const db = client.db(db_name);
    return await db;
}
