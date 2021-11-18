import { useEffect } from "react";
import { socket, wsClient } from "../../api";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { useListUserAndGroupe } from "../../services/ListUserAndGroupe";
import {
  arrivalMessageAllGroupe,
  sortGroupeByDate,
  viewMessage,
} from "../../store/Groupe";
import { setIsOnline } from "../../store/User";
import Chat from "./Chat";
import ListConversation from "./ListConversation";
import ListUser from "./ListUser";
import Welcome from "./Welcome";

export default function Acceuil() {
  const dispatch = useAppDispatch();
  const idSelectedUser = useAppSelector((state) => state.user.idSelectedUser);
  const { form, handleChange } = useListUserAndGroupe();

  useEffect(() => {
    socket.on("update-status-user", (data) => {
      dispatch(setIsOnline(data));
    });

    socket.on("arrival-view-message", (data) => {
      dispatch(viewMessage(data));
    });

    socket.on("arrival-message", (data) => {
      dispatch(arrivalMessageAllGroupe(data));
      setTimeout(function () {
        dispatch(sortGroupeByDate());
      }, 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsClient]);

  return (
    <div className="pt-16 flex flex-row h-full">
      <div className="w-96">
        <div className="flex relative m-2">
          <input
            className="border-2 border-primary bg-red transition h-10 px-5 pr-16 rounded-full focus:outline-none w-full text-black"
            type="search"
            name="search"
            placeholder="Recherche"
            autoComplete="off"
            onChange={handleChange}
            value={form.search}
          />
          <button type="submit" className="absolute right-2 top-3 mr-4">
            <svg
              className="text-gray-400 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              //xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              //style="enable-background:new 0 0 56.966 56.966;"
              //xml:space="preserve"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
        <div className="text-gray-400 flex justify-center">
          {form.search ? "Résultat de " + form.search : ""}
        </div>
        <div className="m-2">
          {form.search ? (
            <ListUser search={form.search} />
          ) : (
            <ListConversation />
          )}
        </div>
      </div>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col">
        {idSelectedUser > -1 ? <Chat /> : <Welcome />}
      </div>
    </div>
  );
}
