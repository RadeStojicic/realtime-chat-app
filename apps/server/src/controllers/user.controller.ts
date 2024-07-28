import { Response } from "express";
import asyncHandler from "../middleware/async";
import User from "../models/user.model";

export const getUsersForSidebar = asyncHandler(async (req, res: Response) => {
  const loggedInUserId = req.user._id;

  const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
    "-password"
  ); // Exclude the logged in user
  res.status(200).json(users);
});
