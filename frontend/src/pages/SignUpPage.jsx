import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  // Estado dos botões: senha, email e nome. Inicialmente todos strings
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  // Criando função para validar o formulário
  const validateForm = () => {
    // Verificando se o campo do nome está preenchido
    if (!formData.fullName.trim())
      return toast.error("Faltou colocar o nome meu chapa");
    // Verificando se o campo do email está preenchido
    if (!formData.email.trim())
      return toast.error("Faltou colocar o email meu aliado");
    // Validando verificação com regex
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Email ta errado patrão");
    // Verificando se o campo da senha está preenchido
    if (!formData.password) return toast.error("Coloca a senha jumento");
    // Verificando se a senha tem pelo menos 6 caracteres
    if (formData.password.length < 6)
      return toast.error(
        "A senha tem que ser pelo menos melhor que a sua situação financeira"
      );

    return true;
  };

  // Lidando o envio de informações
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  // UI
  return (
    <div className="main-h-screen grid lg:grid-cols-2">
      {/* Lado esquerdo do formulário */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Crie sua conta</h1>
              <p className="text-base-content/60">
                Comece com uma conta gratuita
              </p>
            </div>
          </div>
          {/* FORMULARIO */}
          {/* Campo usuário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nome completo</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Ricardo Annes"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Campo email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Campo senha */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Senha</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Botão de Criar conta */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Carregando...
                </>
              ) : (
                "Criar Conta"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Já possui uma conta?{" "}
              <Link to="/entrar" className="link link-primary">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Lado direito */}
      <AuthImagePattern
        title="Faça parte da nossa comunidade"
        subtitle="Conecte-se com seus amigos, compartilhe momentos e mantenha contato com outras capivaras"
      />
    </div>
  );
};

export default SignUpPage;
