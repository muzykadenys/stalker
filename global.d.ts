// global.d.ts
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined; // Declare the _mongoClientPromise on global
}

export {};
