import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudnary.js";

// Lógica de cadastro do meu usuário
export const cadastro = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Verificando se os campos estão preenchidos corretamente
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos bobão" });
    }

    // Verificando se a senha é menor que 6 dígitos
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "A senha deve ter pelo menos 6 dígitos jumento." });
    }
    // Validando email
    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: "Esse email já existe doido." });

    // Fazendo hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cadastrando novo usuário
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // Gerar um token de autenticação
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Dados inválidos." });
    }
  } catch (error) {
    console.log("Erro no cadastrar controller", error.message);
    res.status(500).json({ message: "Erro interno no Servidor" });
  }
};

// Lógica de login do usuário
export const entrar = async (req, res) => {
  // Obtendo o email e senha da request
  const { email, password } = req.body;
  try {
    // Verificando se o usuário existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email ou senha não coincidem" });
    }

    // Validando senha
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Email ou senha não coincidem" });
    }

    // Gerando token de acesso
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Erro no  entrar controller", error.message);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

// Lógica de logout do usuário
export const sair = (req, res) => {
  // Limpando cookies
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Saída realizada com exito" });
  } catch (error) {
    console.log("Erro no sair controller", error.message);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

// Atualizar foto de perfil
export const updateProfile = async (req, res) => {
  try {
    // Verificando o usuário
    const { profilePic } = req.body;
    const userId = req.user._id;

    // Avisando que é necessário uma foto de perfil
    if (!profilePic) {
      return res.status(400).json({ message: "É preciso uma foto de perfil" });
    }

    // Fazendo o upload da foto para o cloudnary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Armazenando alteração no BD
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Deu merda pra atualizar a foto", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

// Checa se o usuário está auntenticado
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Erro no checkAuth controller", error.message);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};
