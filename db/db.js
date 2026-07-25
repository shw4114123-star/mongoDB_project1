import { MongoClient } from "mongodb";
import "dotenv/config"
import dns from "node:dns";
dns.setServers(["10.177.225.124"]);

const MONGO_URL = process.env.MONGO_URL

const connection = new MongoClient(MONGO_URL)

try {
    await connection.connect()
    console.log("db connected.");
} catch (error) {
    console.error(error);
    process.exit(1)
}

const db = connection.db("scoreTracker")
export const momo = db.collection("atlasTeshbord")