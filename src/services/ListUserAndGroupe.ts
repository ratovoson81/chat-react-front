import { useChat } from "./Chat";
import { ArgsGetGroupePerUser, User } from "./../api/types";
import { useLazyQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { ALL_USERS, GET_All_GROUPE_BY_USER } from "../api/query";
import { Groupe } from "../api/types";
import { selectGroupe, setAllGroupe, setExist } from "../store/Groupe";
import { setAllUsers, setSelectedUser } from "../store/User";
import { useAppDispatch, useAppSelector } from "../Hooks";

type returnQuery = {
  getGroupeByMultipleUsers: Groupe[];
};

export const useListUserAndGroupe = () => {
  const dispatch = useAppDispatch();
  const { setHasMore } = useChat();
  const me = useAppSelector((state) => state.user.me);
  const [form, setForm] = useState({
    search: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const selectConversation = (groupe: Groupe) => {
    dispatch(setExist(true));
    dispatch(selectGroupe(groupe.id));
    dispatch(
      setSelectedUser(groupe.users.find((u) => u.userId !== me.id)?.user?.id)
    );
  };

  const selectUser = (user: User) => {
    const data: ArgsGetGroupePerUser = { ids: [me.id, user.id], skip: 0 };
    checkGroupeExist({
      variables: { data: data },
    });
    dispatch(setSelectedUser(user.id));
  };

  const [getGroupeByMultipleUsers /*, { called, loading, data }*/] =
    useLazyQuery(GET_All_GROUPE_BY_USER, {
      onCompleted: ({ getGroupeByMultipleUsers }) => {
        dispatch(setAllGroupe(getGroupeByMultipleUsers));
      },
    });

  const [checkGroupeExist /*, { called, loading, data }*/] = useLazyQuery(
    GET_All_GROUPE_BY_USER,
    {
      onCompleted: ({ getGroupeByMultipleUsers }: returnQuery) => {
        if (getGroupeByMultipleUsers.length) {
          dispatch(selectGroupe(getGroupeByMultipleUsers[0].id));
          dispatch(setExist(true));
        } else {
          dispatch(setExist(false));
          setHasMore(false);
          dispatch(selectGroupe(-1));
        }
      },
    }
  );

  const [allUsers /*, { called, loading, data }*/] = useLazyQuery(ALL_USERS, {
    onCompleted: ({ allUsers }) => {
      dispatch(setAllUsers(allUsers));
    },
  });

  useEffect(() => {
    allUsers();
    if (me) {
      const data: ArgsGetGroupePerUser = {
        ids: [me.id],
        skip: 0,
      };
      getGroupeByMultipleUsers({
        variables: { data: data },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  return { form, handleChange, selectConversation, selectUser };
};
