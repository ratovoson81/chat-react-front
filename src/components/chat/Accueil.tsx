import { useChat } from "../../services/Chat";
import Chat from "./Chat";
import ListUser from "./ListeUser";
import Welcome from "./Welcome";

export default function Acceuil() {
  const { selectedUser } = useChat();

  return (
    <div className="pt-20 flex flex-row h-full">
      <div className="w-1/4">
        <div>Recherche</div>
        <ListUser />
      </div>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col">
        {selectedUser.name ? <Chat /> : <Welcome />}
      </div>
    </div>
  );
}
