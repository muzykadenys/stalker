import { ObjectId } from "mongodb";

export interface Comment {
  _id?: ObjectId; // MongoDB assigns an _id field automatically
  text: string;
  rate: number;
}
