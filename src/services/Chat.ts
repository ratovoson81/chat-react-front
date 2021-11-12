import { MessageInput } from "./../api/types";
import { CREATE_GROUPE, SEND_MESSAGE } from "./../api/mutation";
import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { ChangeEvent, useEffect, useState } from "react";
import {
  arrivalMessageAllGroupe,
  setExist,
  setSelectedGroupe,
} from "../store/Groupe";
import { socket } from "../api";

export const useChat = () => {
  const selectedGroupe = useAppSelector((state) => state.groupe.selectedGroupe);
  const me = useAppSelector((state) => state.user.me);
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const dispatch = useAppDispatch();

  const [sendMessageMutation] = useMutation(SEND_MESSAGE);
  const [createGroupe] = useMutation(CREATE_GROUPE);
  const [form, setForm] = useState({
    message: "",
  });

  useEffect(() => {
    socket.on("ok", (data) => {
      dispatch(arrivalMessageAllGroupe(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const createChat = () => {
    createGroupe({ variables: { data: { users: [me.id, selectedUser.id] } } })
      .then((result) => {
        dispatch(setExist(true));
        dispatch(setSelectedGroupe(result.data.createGroupe));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const sendMessage = () => {
    const data: MessageInput = {
      content: form.message,
      idFrom: me.id,
      idGroupe: selectedGroupe.id,
      date: new Date(),
    };
    sendMessageMutation({ variables: { data: data } })
      .then((result) => {
        socket.emit("add", {
          message: result.data.sendMessage,
          idgroupe: selectedGroupe.id,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { sendMessage, selectedGroupe, handleChange, form, me, createChat };
};
