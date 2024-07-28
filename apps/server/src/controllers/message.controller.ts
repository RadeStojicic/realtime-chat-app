import { Response } from "express";
import asyncHandler from "../middleware/async";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

export const sendMessage = asyncHandler(async (req, res: Response) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  let conversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      members: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  await Promise.all([conversation.save(), newMessage.save()]);

  res.status(201).json({ newMessage });
});

export const getMessages = asyncHandler(async (req, res: Response) => {
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  }).populate("messages");

  if (!conversation) {
    return res.status(200).json([]);
  }

  res.status(200).json(conversation.messages);
});
