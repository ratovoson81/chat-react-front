import { MessageInput } from "./../api/types";
import { SEND_MESSAGE } from "./../api/mutation";
import { useMutation } from "@apollo/client";
import { useAppSelector } from "../Hooks";
import { ChangeEvent, useState } from "react";

export const useChat = () => {
  const selectedGroupe = useAppSelector((state) => state.groupe.selectedGroupe);
  const me = useAppSelector((state) => state.user.me);

  const [sendMessageMutation] = useMutation(SEND_MESSAGE);

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

  const sendMessage = () => {
    const data: MessageInput = {
      content: form.message,
      idFrom: me.id,
      idGroupe: selectedGroupe.id,
      date: new Date(),
    };
    sendMessageMutation({ variables: { data: data } })
      .then((result) => {
        alert(JSON.stringify(result.data.sendMessage));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { sendMessage, selectedGroupe, handleChange, form, me };
};
