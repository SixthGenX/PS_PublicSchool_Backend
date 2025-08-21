import { UserModel } from "../models/User";
import { IUser } from "../models/User";

export const findUserByEmailDao = async (
  email: string
): Promise<IUser | null> => {
  return await UserModel.findOne({ email });
};

export const createUserDao = async (
  name: string,
  email: string,
  passwordHash: string,
  role: string
): Promise<IUser> => {
  const user = await UserModel.create({
    name,
    email,
    passwordHash,
    role,
  });
  return user;
};
