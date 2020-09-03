import logger from "./../util/logger";
import { MongoClient, Db, MongoClientOptions } from "mongodb";
import mongoose from "mongoose";
// import assert from "assert";

export default async function (): Promise<Db> {

    const url: string = "mongodb://127.0.0.1:27017";
    const db_name: string = "momskitchen";
    const uri = process.env.MONGODB_URI || url;

    var db = mongoose.connect(uri, {
        useMongoClient: true,
    });
    return await db;
};