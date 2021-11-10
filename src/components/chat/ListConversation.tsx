import moment from "moment";
import { SpinnerCircular } from "spinners-react";
import { IMAGE_URL } from "../../api";
import { Groupe } from "../../api/types";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { setSelectedGroupe } from "../../store/Groupe";

export default function ListConversation() {
  const groupes = useAppSelector((state) => state.groupe.groupes);
  const me = useAppSelector((state) => state.user.me);
  const selectedGroupe = useAppSelector((state) => state.groupe.selectedGroupe);

  const dispatch = useAppDispatch();

  const selectConv = (groupe: Groupe) => {
    dispatch(setSelectedGroupe(groupe));
  };

  return (
    <>
      {groupes.length === 0 && (
        <div className="flex justify-center items-center">
          <SpinnerCircular size="40" color="black" />
        </div>
      )}
      {groupes
        .filter((item: Groupe) => item.id !== me.id)
        .map((item: Groupe, i: number) => (
          <div
            key={i}
            onClick={() => selectConv(item)}
            className={`${
              item.id === selectedGroupe.id && "bg-gray-100"
            } grid grid-cols-5 grid-rows-1 h-16 rounded-xl cursor-pointer`}
          >
            <img
              className="rounded-full col-span-1 m-auto"
              width={55}
              alt=""
              src={
                IMAGE_URL +
                item.users.find((i) => i.user?.id !== me.id)?.user?.imageUrl
              }
            />
            <div className="flex flex-col col-span-3 pl-4 justify-center">
              <div className="font-medium">
                {item.users.find((i) => i.user?.id !== me.id)?.user?.name}
              </div>
              <div className="text-gray-500">
                {item.messages[0] ? item.messages[0]?.content : "vide"}
              </div>
            </div>
            <div className="flex flex-col col-span-1 justify-center items-end pr-4">
              <div className="text-xs">
                {item.messages[0] &&
                  moment(new Date(item.messages[0]?.date), "YYYYMMDD").fromNow(
                    true
                  )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
