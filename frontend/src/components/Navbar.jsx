import { useAuthStore } from "../store/useAuthStore"
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
const Navbar = () => {

  // O que mostrar caso o usuário estiver logado
  const { logout, authUser } = useAuthStore();
  // O que mostrar caso o usário não estiver logado
  return (
     <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Icone CapiChat */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">CapiChat</h1>
            </Link>
          </div>
          {/* Icone Configurações */}
          <div className="flex items-center gap-2">
            <Link
              to={"/configuracoes"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Configurações</span>
            </Link>
            {/* Icone do perfil, só fica visível se o usuário estiver logado */}
            {authUser && (
              <>
                <Link to={"/perfil"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Perfil</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar