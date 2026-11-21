import { BSON, MongoClient } from "mongodb"
import { MONGO_MONGODB_URI } from '$app/env/private';
import { attachDatabasePool } from "@vercel/functions"

export const EJSON = BSON.EJSON

export const mongo_client = new MongoClient(MONGO_MONGODB_URI)
attachDatabasePool(mongo_client)

export const db = mongo_client.db('todo_manager_db')