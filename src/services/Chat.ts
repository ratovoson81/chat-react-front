import {
  ArgsGetGroupeById,
  ArgsMessageView,
  MessageInput,
} from "./../api/types";
import { CREATE_GROUPE, SEND_MESSAGE, VIEW_MESSAGE } from "./../api/mutation";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { ChangeEvent, useState } from "react";
import { changeMessage, moreMessage, selectGroupe } from "../store/Groupe";
import { socket } from "../api";
import { GET_GROUPE_BY_ID } from "../api/query";

export const useChat = () => {
  const iDselectedGroupe = useAppSelector(
    (state) => state.groupe.idselectedGroupe
  );
  const me = useAppSelector((state) => state.user.me);
  const idSelectedUser = useAppSelector((state) => state.user.idSelectedUser);
  const dispatch = useAppDispatch();

  const [sendMessageMutation, { loading }] = useMutation(SEND_MESSAGE);
  const [viewMessage] = useMutation(VIEW_MESSAGE);
  const [createGroupe] = useMutation(CREATE_GROUPE);
  const [hasMore, setHasMore] = useState(false);
  const groupe = useAppSelector((state) =>
    state.groupe.groupes.find((g) => g.id === iDselectedGroupe)
  );

  const [GetOneGroupeById] = useLazyQuery(GET_GROUPE_BY_ID, {
    onCompleted: ({ getOneGroupeById }) => {
      dispatch(moreMessage(getOneGroupeById));
      setHasMore(getOneGroupeById.messages.length < 20 ? false : true);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    dispatch(changeMessage({ idGroupe: iDselectedGroupe, value: value }));
    socket.emit("typing", {
      sender: me.id,
      receive: idSelectedUser,
      text: value,
      idGroupe: iDselectedGroupe,
    });
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    dispatch(
      changeMessage({ idGroupe: iDselectedGroupe, value: emojiObject.emoji })
    );
  };

  const createChat = () => {
    createGroupe({ variables: { data: { users: [me.id, idSelectedUser] } } })
      .then((result) => {
        dispatch(selectGroupe(result.data.createGroupe.id));
        socket.emit("create-chat", { data: result.data.createGroupe });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const sendMessage = () => {
    const data: MessageInput = {
      content: groupe?.text as string,
      idFrom: me.id,
      idGroupe: iDselectedGroupe,
      date: new Date(),
    };
    socket.emit("typing", {
      sender: me.id,
      receive: idSelectedUser,
      text: "",
      idGroupe: iDselectedGroupe,
    });
    view();
    sendMessageMutation({ variables: { data: data } })
      .then((result) => {
        socket.emit("send-message", {
          message: result.data.sendMessage,
          idgroupe: iDselectedGroupe,
        });
        dispatch(changeMessage({ idGroupe: iDselectedGroupe, value: "" }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const view = () => {
    const data: ArgsMessageView = {
      idGroupe: iDselectedGroupe,
      idUser: idSelectedUser,
      skip: groupe?.messages.length as number,
    };
    viewMessage({
      variables: {
        data: data,
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

  function addMoreMessage() {
    console.log("end of reach");
    const args: ArgsGetGroupeById = {
      idGroupe: iDselectedGroupe,
      skip: groupe?.messages.length as number,
    };
    GetOneGroupeById({ variables: { data: args } });
  }

  return {
    sendMessage,
    handleChange,
    createChat,
    view,
    idSelectedUser,
    addMoreMessage,
    loading,
    hasMore,
    setHasMore,
    onEmojiClick,
  };
};
