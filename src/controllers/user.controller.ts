import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import {
  userRegisterValidation,
  userLoginValidation,
} from "../validations/user.validator";
import { UserRole } from "../utils/enums";
import { createUserDao, findUserByEmailDao } from "../dao/userDao";
import { createResponse } from "../utils/apiUtils/apiUtils";
import ApplicationError, { ApiCodes } from "../models/apiModel/ApiCode";
import { IUser } from "../models/User";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../utils/appConstant";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userRegisterValidation.validateAsync(req.body);

    const { name, email, password, role } = req.body;

    const existingUser = await findUserByEmailDao(email);
    if (existingUser)
      throw new ApplicationError(ApiCodes.EMAIL_ALREADY_REGISTERED);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: IUser = await createUserDao(
      name,
      email,
      hashedPassword,
      role as UserRole
    );

    const safeUser = {
      ...user,
    } as any;

    delete safeUser.passwordHash;
    delete safeUser.updatedAt;
    delete safeUser.__v;

    res
      .status(ApiCodes.REGISTER_SUCCESS.statusCode)
      .send(createResponse(user, ApiCodes.REGISTER_SUCCESS));
  } catch (err: any) {
    console.error("Got error while registering user", err);
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userLoginValidation.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await findUserByEmailDao(email);

    if (!user) throw new ApplicationError(ApiCodes?.INVALID_CREDENTIALS);

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new ApplicationError(ApiCodes.INVALID_CREDENTIALS);

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as SignOptions);

    res
      .status(ApiCodes.LOGIN_SUCCESS.statusCode)
      .send(
        createResponse(
          { userId: user?._id, accessToken: token },
          ApiCodes.LOGIN_SUCCESS
        )
      );
  } catch (err: any) {
    console.error("Got error while logging in  user", err);
    next(err);
  }
};
