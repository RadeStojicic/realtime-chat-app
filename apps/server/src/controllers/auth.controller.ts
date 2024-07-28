import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import asyncHandler from "../middleware/async";
import User from "../models/user.model";
import handleTokenAndSetCookie from "../utils/generateToken";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  const user = await User.findOne({ username });

  if (user) {
    return res
      .status(400)
      .json({ message: "User with this username already exists." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const profilePic = `https://avatar.iran.liara.run/username?username=${username}`;

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    profilePicture: profilePic,
  });

  if (newUser) {
    handleTokenAndSetCookie(res, newUser._id);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
    });
  } else {
    res.status(400).json({ message: "Invalid user data." });
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const isMatch = await bcrypt.compare(password, user?.password || "");

  if (!user) {
    return res.status(400).json({ message: "User does not exist." });
  }

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password." });
  }

  handleTokenAndSetCookie(res, user._id);
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
  });
});

export const logout = asyncHandler((req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out" });
});
