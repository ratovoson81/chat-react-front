import { MessageInput } from "./../api/types";
import { SEND_MESSAGE } from "./../api/mutation";
import { useMutation } from "@apollo/client";
import { useAppSelector } from "../Hooks";

export const useChat = () => {
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const me = useAppSelector((state) => state.user.me);
  const [sendMessage] = useMutation(SEND_MESSAGE);

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

  return { send };
};
