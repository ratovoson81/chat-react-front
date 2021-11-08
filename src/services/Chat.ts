import { ArgsMessageChat, MessageChat, MessageInput } from "./../api/types";
import { SEND_MESSAGE } from "./../api/mutation";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { GET_CHAT } from "../api/query";
import { setChat } from "../store/Message";
import { ChangeEvent, useState } from "react";

export const useChat = () => {
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const me = useAppSelector((state) => state.user.me);
  const chat = useAppSelector((state) => state.message.chatOpened);

  const [sendMessage] = useMutation(SEND_MESSAGE);
  const dispatch = useAppDispatch();

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

  const [queryChat /*, { called, loading, data }*/] = useLazyQuery(GET_CHAT, {
    onCompleted: ({ getChat }) => {
      getChat.forEach(function (element: MessageChat) {
        if (element.from.id === me.id) {
          element.mine = true;
        } else {
          element.mine = false;
        }
      });
      dispatch(setChat(getChat));
    },
  });

  const getChat = (params: ArgsMessageChat) => {
    queryChat({ variables: { data: params } });
  };

  const send = () => {
    const data: MessageInput = {
      content: form.message,
      idFrom: me.id,
      idTo: selectedUser.id,
      date: new Date(),
    };
    sendMessage({ variables: { data: data } })
      .then((result) => {
        alert(JSON.stringify(result.data.sendMessage));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { send, getChat, selectedUser, chat, handleChange, form };
};
