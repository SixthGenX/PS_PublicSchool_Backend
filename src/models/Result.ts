import mongoose, { Schema, Document, Types } from "mongoose";
import { ClassEnum, ResultStatus } from "../utils/enums";

export interface IResult extends Document {
  _id: Types.ObjectId;
  class: ClassEnum;
  studentId: Types.ObjectId;
  status: ResultStatus;
}

const ResultSchema: Schema = new Schema<IResult>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    class: {
      type: String,
      enum: Object.values(ClassEnum),
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ResultStatus),
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IResult>("Result", ResultSchema);
