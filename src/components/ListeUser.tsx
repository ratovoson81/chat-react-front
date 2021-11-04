import { SpinnerCircular } from "spinners-react";
import { User } from "../api/types";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { useChat } from "../services/Chat";
import { useListUser } from "../services/ListUser";
import { setSelectedUser } from "../store/User";

export default function ListUser() {
  useListUser();
  const users = useAppSelector((state) => state.user.users);
  const me = useAppSelector((state) => state.user.me);

  const dispatch = useAppDispatch();
  const { getChat } = useChat();

  const selectUser = (user: User) => {
    dispatch(setSelectedUser(user));
    getChat({ idFrom: me.id, idTo: user.id });
  };

  return (
    <>
      {users.length === 0 && (
        <div className="flex justify-center items-center">
          <SpinnerCircular size="40" color="black" />
        </div>
      )}
      {users.map((item: User, i: number) => (
        <div key={i} onClick={() => selectUser(item)}>
          {item.email}
        </div>
      ))}
    </>
  );
}
