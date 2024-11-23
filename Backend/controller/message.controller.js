import Converstation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId } from "../SocketIO/server.js";
import { io } from "../SocketIO/server.js";



export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id; // Current logged-in user

        let conversation = await Converstation.findOne({
            members: { $all: [senderId, reciverId] },
        }); 

        if (!conversation) {
            conversation = await Converstation.create({
                members: [senderId, reciverId],
            });
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save both the conversation and the new message simultaneously
        await Promise.all([conversation.save(), newMessage.save()]);

        const recieverSocketId=getRecieverSocketId(reciverId)
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage)

        }

//         const senderSocketId = getRecieverSocketId(senderId);
// if (senderSocketId) {
//     io.to(senderSocketId).emit("newMessage", newMessage); // Send to sender
// }

        // Send the newMessage directly to the frontend
        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


//another controller function to fetch the data from DB

export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id;

        let conversation = await Converstation.findOne({
            members: { $all: [senderId, chatUser] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]); // Return an empty array if no conversation is found
        }

        const messages = conversation.messages; // Retrieve the actual messages
        res.status(200).json(messages); // Send the flattened messages array
    } catch (error) {
        console.log("Error in getMessage:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
