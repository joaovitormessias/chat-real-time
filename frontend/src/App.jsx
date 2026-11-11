import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // Definindo cor do tema de fundo
  const { theme } = useThemeStore();

  // Verifica se o usuário está logado, toda vez que recarregamos a págica
  useEffect(() => {
    checkAuth(); // Função que vai fazer isso
  }, [checkAuth]);

  console.log({ authUser });

  // Exibe icone loading enquanto estiver carregando a pagina
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme={theme}>
      <Navbar />

      {/* Criando rotas */}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/entrar" />}
        />
        {/* Se o usuário não estiver logado ele será enviado para a página inicial */}
        <Route
          path="/cadastrar"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/entrar"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/configuracoes" element={<SettingsPage />} />
        <Route
          path="/perfil"
          element={authUser ? <ProfilePage /> : <Navigate to="/entrar" />}
        />
      </Routes>
      {/* Notificação do toast*/}
      <Toaster />
    </div>
  );
};

export default App;
