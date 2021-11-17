import { FC } from "react";
import { IMAGE_URL } from "../../api";
import { useAppSelector } from "../../Hooks";
import { useListUserAndGroupe } from "../../services/ListUserAndGroupe";

type TypeListUser = {
  search: String;
};

const ListUser: FC<TypeListUser> = ({ search }) => {
  const users = useAppSelector((state) => state.user.users);
  const { selectUser } = useListUserAndGroupe();

  return (
    <>
      {users
        .filter((user) =>
          user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        .map((user, i: number) => (
          <div
            key={i}
            onClick={() => selectUser(user)}
            className="hover:bg-gray-100 grid grid-cols-5 grid-rows-1 h-16 rounded-xl cursor-pointer"
          >
            <span className="relative inline-block">
              <img
                className="rounded-full col-span-1 m-auto"
                width={55}
                alt=""
                src={IMAGE_URL + user.imageUrl}
              />
              {user?.IsOnline && (
                <span className="absolute bottom-2 right-3 text-xs h-3 w-3 leading-none ring-2 ring-gray-50  transform bg-green-400 rounded-full"></span>
              )}
            </span>
            <div className="flex flex-col col-span-4 pl-4 justify-center">
              <div className="font-medium">{user.name}</div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ListUser;
