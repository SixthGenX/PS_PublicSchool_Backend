import mongoose, { Schema, Document, Types } from "mongoose";
import { BookStatus } from "../utils/enums";

export interface ILibrary extends Document {
  _id: Types.ObjectId;
  bookNumber: number;
  bookTitle: string;
  issuedTo?: Types.ObjectId; // studentId
  bookStatus: BookStatus;
  createdAt: Date;
  updatedAt: Date;
}

const LibrarySchema: Schema = new Schema<ILibrary>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    bookNumber: { type: Number, required: true, unique: true },
    bookTitle: { type: String, required: true },
    issuedTo: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: false,
    },
    bookStatus: {
      type: String,
      enum: Object.values(BookStatus),
      required: true,
      default: BookStatus.AVAILABLE,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ILibrary>("Library", LibrarySchema);
