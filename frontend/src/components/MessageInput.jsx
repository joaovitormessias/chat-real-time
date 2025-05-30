import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";

const MessageInput = () => {
  // Estado para digitar mensagens
  const [text, setText] = useState("");
  // Carrega a preview da mensagem
  const [imagePreview, setImagePreview] = useState(null);
  // Arquivo de entrada
  const fileInputRef = useRef(null);
  // Função para o envio de mensagens
  const { sendMessage } = useChatStore();

  // Manipulando a imagem selecionada
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecione a imagem");
      return;
    }
    // Carrega a imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Removendo a imagem
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  // Enviando a mensagem
  const handleSendMessage = async (e) => {
    // Evita recarregar a pagina
    e.preventDefault();
    // Verifica se é uma imagem
    if (!text.trim() && !imagePreview) return;
    // Faz envio da requisição para a API
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Limpando o formulário
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Falha ao enviar mensagem:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {/* Pré visualização da imagem */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            {/* Botão remover imagem */}
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Formulário para lidar com o envio de mensagem */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          {/* Escondendo o botão */}
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        {/* Botão de enviar */}
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
