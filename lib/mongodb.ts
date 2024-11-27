import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || ""; // Replace with your MongoDB URI
const options = {};

let client: MongoClient;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
const clientPromise: Promise<MongoClient> = global._mongoClientPromise;

export default clientPromise;
