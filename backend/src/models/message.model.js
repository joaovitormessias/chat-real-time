import mongoose from "mongoose";

// Criando o esquema
const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image:{
            type: String,
        },
    },
    { timestamps: true }
);

// Criando o modelo
const Message = mongoose.model("Message", messageSchema);

export default Message;