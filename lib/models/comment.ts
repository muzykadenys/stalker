import clientPromise from "@/lib/mongodb";
import { Comment } from "@/types/mongo";
import { ObjectId } from "mongodb";
import { collectionNames } from "../collection-names";

export class CommentModel {
  static async create(comment: Omit<Comment, "_id">) {
    const client = await clientPromise;
    const db = client.db(collectionNames.db);
    const collection = db.collection<Comment>(
      collectionNames.collections.comment
    );

    const now = new Date();
    const newComment = { ...comment, createdAt: now, updatedAt: now };

    const result = await collection.insertOne(newComment);
    return { ...newComment, _id: result.insertedId.toString() };
  }

  static async createMany(comments: Omit<Comment, "_id">[]) {
    const client = await clientPromise;
    const db = client.db(collectionNames.db);
    const collection = db.collection<Comment>(
      collectionNames.collections.comment
    );

    const now = new Date();
    const commentsWithTimestamps = comments.map((comment) => ({
      ...comment,
      createdAt: now,
      updatedAt: now,
    }));

    const result = await collection.insertMany(commentsWithTimestamps);

    // Return inserted documents with their generated _id
    return result;
  }

  static async getAll() {
    const client = await clientPromise;
    const db = client.db(collectionNames.db);
    const collection = db.collection<Comment>(
      collectionNames.collections.comment
    );

    return collection.find().sort({ createdAt: -1 }).toArray(); // Fetch all comments sorted by creation time
  }

  static async updateRate(id: string, increment: number) {
    const client = await clientPromise;
    const db = client.db(collectionNames.db);
    const collection = db.collection<Comment>(
      collectionNames.collections.comment
    );

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Match by _id
      { $inc: { rate: increment } }, // Increment or decrement rate
      { returnDocument: "after" } // Return the updated document
    );

    // Check if the update operation returned a document
    if (!result) {
      return null; // Explicitly return null if no document was updated
    }

    return result; // Return the updated document
  }
}
