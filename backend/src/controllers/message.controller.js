import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudnary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async(req, res) => {
    // Vai retornar para a gente os usuários conectados, menos nós mesmos
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Erro no getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
};

export const getMessages = async(req, res) => {
    try {

        // Acessando o ID da requisição
        const { id:userToChatId } = req.params

        // ID do remetente
        const myId = req.user._id;

        // Buscando as mensagens onde o usuário que envio a mensagem é o rementente ou outro usuário é o rementente
        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Erro no getMessages controller: ", error.message);
        res.status(500).json({ message: "Erro interno no servidor"});
    }
};

export const sendMessage = async (req, res) => {
    try {
        // Pegando o texto ou imagem da requisição
        const { text, image } = req.body;
        // Pegando id do destinatário
        const { id: receiverId } = req.params;
        // Pegando id do remetente
        const senderId = req.user._id;

        // Verificando se o usuário está passando uma imagem ou não
        let imageUrl;
        if (image) {
            // Fazendo upload em base64 da imagem para o cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // Criando a mensagem
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        // Salvando no banco de dados
        await newMessage.save();

        // Função em tempo real vem aqui => socket.io
        const receiverSocketId= getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Erro no sendMessage controller: ", error.message);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
};