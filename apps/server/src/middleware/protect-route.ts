import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import asyncHandler from "./async";

const protectRoute = asyncHandler(
  async (req, res: Response, next: NextFunction) => {
    const auth_token = req.cookies.jwt;

    if (!auth_token) {
      res.status(401).json({ message: "Not authorized, no token." });
    }

    const decoded = jwt.verify(
      auth_token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    if (!decoded) {
      res.status(401).json({ message: "Not authorized, token failed." });
    }

    const user = await User.findById(decoded.user_id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  }
);

export default protectRoute;
