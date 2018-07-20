import logger from "./../util/logger";
import { MongoClient, Db } from "mongodb";
// import assert from "assert";

export default async function (): Promise<Db> {

    const url: string = "mongodb://127.0.0.1:27017";
    const db_name: string = "momskitchen";

    const uri = process.env.mongodb_cn || url;
    let client = await MongoClient.connect(uri);
    const db = client.db(db_name);
    return await db;
};