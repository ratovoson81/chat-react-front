import { MessageInput } from "./../api/types";
import { CREATE_GROUPE, SEND_MESSAGE, VIEW_MESSAGE } from "./../api/mutation";
import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { ChangeEvent, useState } from "react";
import { selectGroupe, setExist } from "../store/Groupe";
import { socket } from "../api";

export const useChat = () => {
  const iDselectedGroupe = useAppSelector(
    (state) => state.groupe.idselectedGroupe
  );
  const me = useAppSelector((state) => state.user.me);
  const idSelectedUser = useAppSelector((state) => state.user.idSelectedUser);
  const dispatch = useAppDispatch();

  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const [viewMessage] = useMutation(VIEW_MESSAGE);
  const [createGroupe] = useMutation(CREATE_GROUPE);
  const [form, setForm] = useState({
    message: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const createChat = () => {
    createGroupe({ variables: { data: { users: [me.id, idSelectedUser] } } })
      .then((result) => {
        dispatch(setExist(true));
        dispatch(selectGroupe(result.data.createGroupe.id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const sendMessage = () => {
    const data: MessageInput = {
      content: form.message,
      idFrom: me.id,
      idGroupe: iDselectedGroupe,
      date: new Date(),
    };
    sendMessageMutation({ variables: { data: data } })
      .then((result) => {
        socket.emit("send-message", {
          message: result.data.sendMessage,
          idgroupe: iDselectedGroupe,
        });
        view();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const view = () => {
    viewMessage({
      variables: {
        data: { idGroupe: iDselectedGroupe, idUser: idSelectedUser },
      },
    })
      .then((result) => {
        socket.emit("view-message", {
          groupe: result.data.viewMessage,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    sendMessage,
    handleChange,
    form,
    createChat,
    view,
    idSelectedUser,
  };
};
