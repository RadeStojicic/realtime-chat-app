import { Response } from "express";
import asyncHandler from "../middleware/async";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import { getReceiverSocketId, io } from "../socket/socket";

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

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json({ newMessage });
});

export const getMessages = asyncHandler(async (req, res: Response) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    members: { $all: [senderId, userToChatId] },
  }).populate("messages");

  if (!conversation) {
    return res.status(200).json([]);
  }

  res.status(200).json(conversation.messages);
});
