import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApplicationError, { ApiCodes } from "../models/apiModel/ApiCode";
import { JWT_SECRET } from "../utils/appConstant";

// Extend Express Request to include user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.token as string;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApplicationError(ApiCodes.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
    };

    if (!decoded || decoded.role !== "ADMIN") {
      throw new ApplicationError(ApiCodes.FORBIDDEN, "User must be an admin");
    }

    // Attach user info to request for further use
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err: any) {
    console.error("Admin middleware error:", err);
    next(
      new ApplicationError(ApiCodes.UNAUTHORIZED, "Invalid or missing token")
    );
  }
};
