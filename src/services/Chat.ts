import { ArgsMessageChat, MessageInput } from "./../api/types";
import { SEND_MESSAGE } from "./../api/mutation";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { GET_CHAT } from "../api/query";
import { setChat } from "../store/Message";

export const useChat = () => {
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const me = useAppSelector((state) => state.user.me);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const dispatch = useAppDispatch();

  const [queryChat /*, { called, loading, data }*/] = useLazyQuery(GET_CHAT, {
    onCompleted: (data) => {
      dispatch(setChat(data.getChat));
    },
  });

  const getChat = (params: ArgsMessageChat) => {
    queryChat({ variables: { data: params } });
  };

  const send = (value: string) => {
    const data: MessageInput = {
      content: value,
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

  return { send, getChat };
};
