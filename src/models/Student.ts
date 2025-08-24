import { Schema, model, Document } from "mongoose";
import { ClassEnum } from "../utils/enums";

export interface IStudent extends Document {
  _id: string;
  name: string;
  class: ClassEnum;
  rollNumber: number;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    class: {
      type: String,
      enum: Object.values(ClassEnum),
      required: true,
    },
    rollNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IStudent>("Student", StudentSchema);
