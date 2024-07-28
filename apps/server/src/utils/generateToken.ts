import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const handleTokenAndSetCookie = (res: Response, user_id: Types.ObjectId) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET || "", {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOptions);
};

export default handleTokenAndSetCookie;
