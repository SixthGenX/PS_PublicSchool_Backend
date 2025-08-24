import { Schema, model, Document, Types } from "mongoose";
import { ClassRangeForResult } from "../utils/enums";
import { IImage } from "./Image";

export interface IDateSheet extends Document {
  _id: string;
  classRange: ClassRangeForResult;
  image: Types.ObjectId | IImage;
  createdAt: Date;
  updatedAt: Date;
}

const DateSheetSchema = new Schema<IDateSheet>(
  {
    classRange: {
      type: String,
      enum: Object.values(ClassRangeForResult),
      unique: true,
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IDateSheet>("DateSheet", DateSheetSchema);
