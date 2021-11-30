import { FC } from "react";
import { useAppSelector } from "../../Hooks";
import { useListUserAndGroupe } from "../../services/ListUserAndGroupe";
import Avatar from "../public/Avatar";
import Name from "../public/Name";

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
            className="hover:bg-gray-100 grid grid-cols-5 grid-rows-1 h-16 rounded-xl cursor-pointer items-center max-w-full"
          >
            <div className="flex justify-center ">
              <Avatar imageUrl={user?.imageUrl} isOnline={user?.isOnline} />
            </div>
            <div className="flex flex-col col-span-4 pl-4 justify-center">
              <Name name={user.name} />
            </div>
          </div>
        ))}
    </>
  );
};

export default ListUser;
