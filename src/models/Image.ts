import { Schema, model, Document } from "mongoose";
import { ImageType } from "../utils/enums";

export interface IImage extends Document {
  _id: string;
  image: Buffer;
  type: ImageType;
  mimeType: string;
  size: number;
  originalName: string;
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema<IImage>(
  {
    image: {
      type: Buffer,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ImageType),
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IImage>("Image", ImageSchema);
