import { FC } from "react";
import { IMAGE_URL } from "../../api";
import { useAppSelector } from "../../Hooks";

type TypeListUser = {
  search: String;
};

const ListUser: FC<TypeListUser> = ({ search }) => {
  const users = useAppSelector((state) => state.user.users);

  return (
    <>
      {users
        .filter((user) =>
          user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        .map((user, i: number) => (
          <div
            key={i}
            //onClick={() => selectConv(item)}
            className="hover:bg-gray-100 grid grid-cols-5 grid-rows-1 h-16 rounded-xl cursor-pointer"
          >
            <img
              className="rounded-full col-span-1 m-auto"
              width={55}
              alt=""
              src={IMAGE_URL + user.imageUrl}
            />
            <div className="flex flex-col col-span-4 pl-4 justify-center">
              <div className="font-medium">{user.name}</div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ListUser;
