import ListUser from "./ListeUser";

export default function Acceuil() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-3 border">Recherche</div>
      <div>
        <ListUser />
      </div>
      <div className="col-span-2 border">Discussion</div>
    </div>
  );
}
