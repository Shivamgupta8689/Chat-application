import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socketIO/server.js";
import { io } from "../socketIO/server.js";


export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // check if conversation exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // create new conversation if not exist
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }   

    // create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });


    // push message id to conversation
      conversation.messages.push(newMessage._id);


    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketid = getReceiverSocketId(receiverId);
    if(receiverSocketid){
      io.to(receiverSocketid).emit("newMessage", newMessage)
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in Sending Message: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]); // empty array if no conversation
    }

    const messages = conversation.messages;
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Message getting error: " + error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
