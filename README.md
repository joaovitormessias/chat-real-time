CapiChat é um aplicativo de **bate-papo em tempo real** onde usuários podem trocar mensagens e enviar imagens. Criado como projeto de aprendizado, ele simula uma rede social simples com comunicação entre usuários e upload de fotos, utilizando **MERN stack (MongoDB, Express, React e Node.js)** e **Socket.IO**.

---

## 🚀 Objetivo

Este projeto foi desenvolvido com fins educacionais, explorando conceitos como:
- Comunicação em tempo real com WebSockets
- Upload e exibição de imagens via Cloudinary
- Autenticação com JWT e cookies
- Boas práticas com REST APIs, Zustand e componentes reutilizáveis em React

---

## 🛠️ Tecnologias utilizadas

### 🔙 Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) (v5)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Socket.IO](https://socket.io/)
- [Cloudinary](https://cloudinary.com/)
- [JWT](https://jwt.io/)
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

### 🔜 Frontend
- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- [React Router DOM](https://reactrouter.com/)
- [React Hot Toast](https://react-hot-toast.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [DaisyUI](https://daisyui.com/)

---

## 📷 Funcionalidades

- Login e cadastro de usuários com autenticação via JWT
- Upload e atualização de foto de perfil
- Envio de mensagens em tempo real
- Upload de imagens via base64 com preview
- Lista de usuários online com Socket.IO
- Tela de perfil com edição de imagem

---

## 🧩 Como rodar o projeto localmente

### 📋 Pré-requisitos
- Node.js 18+
- MongoDB Atlas (ou local)
- Conta no [Cloudinary](https://cloudinary.com/)
- Vite (já incluso como dependência)

---

### 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/capichat.git
cd capichat 
``` 

2. Configure as variáveis de ambiente:
- Crie um ```.env``` dentro de ```backend/``` com as variáveis:

```bash
PORTA=5001
MONGODB_URI=seu_mongo_uri
JWT_SECRET=seu_segredo
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=sua_api_secret
```
3. Instale as dependências:
```bash
cd frontend && npm install
cd ../backend && npm install
```
4. Rode o frontend e o backend:
```bash
# Em dois terminais separados:
npm run dev --prefix frontend
npm run dev --prefix backend
```
- Acesse: ```http://localhost:5173```

### 👨‍💻 Autores
- @joaovitormessias — Desenvolvimento, documentação e design
