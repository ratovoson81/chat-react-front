import { SpinnerCircular } from "spinners-react";
import { IMAGE_URL } from "../../api";
import { User } from "../../api/types";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { useChat } from "../../services/Chat";
import { useListUser } from "../../services/ListUser";
import { setSelectedUser } from "../../store/User";

export default function ListUser() {
  useListUser();
  const users = useAppSelector((state) => state.user.users);
  const me = useAppSelector((state) => state.user.me);
  const selectedUser = useAppSelector((state) => state.user.selectedUser);

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
      {users
        .filter((item: User) => item.id !== me.id)
        .map((item: User, i: number) => (
          <div
            key={i}
            onClick={() => selectUser(item)}
            className={`${
              item.id === selectedUser.id && "bg-gray-100"
            } grid grid-cols-5 grid-rows-1 h-16 rounded-xl cursor-pointer`}
          >
            <img
              className="rounded-full col-span-1 m-auto"
              width={55}
              alt=""
              src={IMAGE_URL + item.imageUrl}
            />
            <div className="flex flex-col col-span-3 pl-4 justify-center">
              <div className="font-medium">{item.name}</div>
              <div className="text-gray-500">last message</div>
            </div>
            <div className="flex flex-col col-span-1 justify-center items-end pr-4">
              <div className="">time</div>
            </div>
          </div>
        ))}
    </>
  );
}
