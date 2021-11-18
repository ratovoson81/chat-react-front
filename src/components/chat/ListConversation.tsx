import { SpinnerCircular } from "spinners-react";
import { IMAGE_URL } from "../../api";
import { Groupe } from "../../api/types";
import { useAppSelector } from "../../Hooks";
import { useListUserAndGroupe } from "../../services/ListUserAndGroupe";
import TimeAgo from "timeago-react";
import FlipMove from "react-flip-move";
import { forwardRef } from "react";

export default function ListConversation() {
  const groupes = useAppSelector((state) => state.groupe.groupes);
  const me = useAppSelector((state) => state.user.me);
  const users = useAppSelector((state) => state.user.users);
  const idselectedGroupe = useAppSelector(
    (state) => state.groupe.idselectedGroupe
  );
  const { selectConversation } = useListUserAndGroupe();

  const List = forwardRef(({ item, user }: any, ref) => (
    <div
      ref={ref as any}
      onClick={() => selectConversation(item)}
      className={`${
        item.id === idselectedGroupe && "bg-gray-100"
      } grid grid-cols-5 grid-rows-1 h-16 rounded-xl cursor-pointer items-center max-w-full`}
    >
      <span className="relative inline-block">
        <img
          className="rounded-full col-span-1 m-auto"
          width={55}
          alt=""
          src={IMAGE_URL + user?.imageUrl}
        />
        {user?.isOnline && (
          <span className="absolute bottom-0.5 right-3 text-xs h-3 w-3 leading-none ring-2 ring-gray-50 transform bg-green-400 rounded-full"></span>
        )}
      </span>
      <div className="flex flex-col col-span-3 pl-4 justify-center">
        <div className="font-medium">{user?.name}</div>
        <div className="text-gray-500 text-xs">
          {item.messages[0]?.author.id === me.id && "Vous: "}
          {item.messages[0] ? item.messages[0]?.content : "vide"}
        </div>
      </div>
      <div className="flex flex-col col-span-1 justify-center items-end pr-4">
        <div className="text-xs">
          <TimeAgo datetime={item.messages[0]?.date} locale="pt_BR" />
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {groupes.length === 0 && (
        <div className="flex justify-center items-center">
          <SpinnerCircular size="40" color="black" />
        </div>
      )}
      <FlipMove>
        {groupes.map((item: Groupe, i: number) => {
          const id = item.users.find((i) => i.user?.id !== me.id)?.user?.id;
          const user = users.find((u) => id === u.id);
          return <List key={item.id} item={item} user={user} />;
        })}
      </FlipMove>
    </>
  );
}
