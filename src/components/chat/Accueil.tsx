import { useChat } from "../../services/Chat";
import Chat from "./Chat";
import ListUser from "./ListeUser";
import Welcome from "./Welcome";

export default function Acceuil() {
  const { selectedUser } = useChat();

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3 border">Recherche</div>
      <div>
        <ListUser />
      </div>
      {selectedUser.name ? <Chat /> : <Welcome />}
    </div>
  );
}
