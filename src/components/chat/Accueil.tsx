import { useChat } from "../../services/Chat";
import Chat from "./Chat";
import ListUser from "./ListeUser";
import Welcome from "./Welcome";

export default function Acceuil() {
  const { selectedUser } = useChat();

  return (
    <div className="pt-20 flex flex-row h-full border-4 border-green-500">
      <div className="w-1/4 border border-red-500">
        <div className="border">Recherche</div>
        <ListUser />
      </div>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col border border-blue-500">
        {selectedUser.name ? <Chat /> : <Welcome />}
      </div>
    </div>
  );
}
