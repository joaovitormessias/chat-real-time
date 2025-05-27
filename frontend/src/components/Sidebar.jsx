import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  // Lista contendo os usuários onlines
  const { onlineUsers } = useAuthStore();

  // Função que busca os usuários
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Filtrando apenas os usuários onlines
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        {/* Exibindo os contatos do usuário */}
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contatos</span>
        </div>
        {/* TODO: Alterar filtro online*/}
        
      </div>
      {/* Quando clicamos na conversa com o usuário alteramos background */}
      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            {/* Exibindo os usuários online */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.jpg"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {/* Ícone verde quando o usuário está online */}
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* Info usuário -visível apenas em telas maiores */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            Nenhum usuáio online
          </div>
        )} */}
      </div>
    </aside>
  );
};
export default Sidebar;
