import mongoose, { Schema, Document, Types } from "mongoose";
import { ClassEnum, ResultStatus } from "../utils/enums";

export interface IResult extends Document {
  _id: Types.ObjectId;
  class: ClassEnum;
  rollNumber: number;          
  studentId: Types.ObjectId;
  status: ResultStatus;
  marks: number;               // 🔹 Added
}

const ResultSchema: Schema = new Schema<IResult>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    class: {
      type: String,
      enum: Object.values(ClassEnum),
      required: true,
    },
    rollNumber: {              
      type: Number,
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
    marks: {                   // 🔹 Added
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IResult>("Result", ResultSchema);













// import mongoose, { Schema, Document, Types } from "mongoose";
// import { ClassEnum, ResultStatus } from "../utils/enums";

// export interface IResult extends Document {
//   _id: Types.ObjectId;
//   class: ClassEnum;
//   rollNumber: number;          
//   studentId: Types.ObjectId;
//   status: ResultStatus;
//   marks: number;               // 🔹 Added
// }

// const ResultSchema: Schema = new Schema<IResult>(
//   {
//     _id: { type: Schema.Types.ObjectId, auto: true },
//     class: {
//       type: String,
//       enum: Object.values(ClassEnum),
//       required: true,
//     },
//     rollNumber: {              
//       type: Number,
//       required: true,
//     },
//     studentId: {
//       type: Schema.Types.ObjectId,
//       ref: "Student",
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: Object.values(ResultStatus),
//       required: true,
//     },
//     marks: {                   // 🔹 Added
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IResult>("Result", ResultSchema);