import { Schema, model, Document } from "mongoose";
import { UserRole } from "../utils/enums";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", userSchema);
