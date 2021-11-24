import { SpinnerDotted } from "spinners-react";
import { IMAGE_URL } from "../../api";
import { Groupe, Message, User } from "../../api/types";
import { useAppSelector } from "../../Hooks";
import { useListUserAndGroupe } from "../../services/ListUserAndGroupe";
import TimeAgo from "timeago-react";
import FlipMove from "react-flip-move";
import { forwardRef } from "react";

type TList = {
  item: Groupe;
  user?: User;
};

export default function ListConversation() {
  const groupes = useAppSelector((state) => state.groupe.groupes);
  const me = useAppSelector((state) => state.user.me);
  const users = useAppSelector((state) => state.user.users);
  const idselectedGroupe = useAppSelector(
    (state) => state.groupe.idselectedGroupe
  );
  const { selectConversation } = useListUserAndGroupe();

  const List = forwardRef(({ item, user }: TList, ref) => (
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
        <div
          className={`"text-gray-500 text-xs ${
            !item.messages[0]?.view &&
            item.messages[0]?.author.id !== me.id &&
            "font-bold"
          }`}
        >
          {item.messages[0]?.author.id === me.id && "Vous: "}
          {item.messages[0] ? item.messages[0]?.content : "vide"}
        </div>
      </div>
      <div className="flex flex-col col-span-1 justify-center items-end space-y-2">
        <div className="text-xs pr-4">
          <TimeAgo datetime={item.messages[0]?.date} locale="pt_BR" />
        </div>
        {!item.messages[0]?.view && item.messages[0].author.id !== me.id ? (
          <div className="text-xs h-4 w-4 leading-none ring-2 ring-red-400 text-center transform bg-red-400 rounded-full mr-3 text-white flex flex-col justify-center">
            <span>
              {
                item?.messages?.filter(
                  (m: Message) => m.view === false && m.author.id !== me.id
                ).length
              }
            </span>
          </div>
        ) : (
          <span className="text-xs pr-4">
            {/*item.messages[0]?.view &&
              item.messages[0].author.id === me.id &&
            `Vu: ${moment(item.messages[0].viewAt).format("LT")}`*/}
            {item.messages[0]?.view && item.messages[0].author.id === me.id && (
              <img
                src={IMAGE_URL + user?.imageUrl}
                alt=""
                width={18}
                className="rounded-full"
              />
            )}
          </span>
        )}
      </div>
    </div>
  ));

  return (
    <>
      {groupes.length === 0 && (
        <div className="flex justify-center items-center">
          <SpinnerDotted size="40" color="purple" />
        </div>
      )}
      <FlipMove enterAnimation="fade">
        {groupes.map((item: Groupe, i: number) => {
          const id = item.users.find((i) => i.user?.id !== me.id)?.user?.id;
          const user = users.find((u) => id === u.id);
          return <List key={item.id} item={item} user={user} />;
        })}
      </FlipMove>
    </>
  );
}
