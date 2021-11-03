import { useAppSelector } from "../Hooks";

export default function Chat() {
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  return (
    <div className="col-span-2 border">Discussion {selectedUser.name}</div>
  );
}
