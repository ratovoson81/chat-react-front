import { User } from "./../api/types";
import { useLazyQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { ALL_USERS, GET_All_GROUPE_BY_USER } from "../api/query";
import { Groupe } from "../api/types";
import { setAllGroupe, setExist, setSelectedGroupe } from "../store/Groupe";
import { setAllUsers, setSelectedUser } from "../store/User";
import { useAppDispatch, useAppSelector } from "../Hooks";

export const useListUserAndGroupe = () => {
  const dispatch = useAppDispatch();
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
    dispatch(setSelectedGroupe(groupe));
    dispatch(
      setSelectedUser(groupe.users.find((u) => u.userId !== me.id)?.user)
    );
    dispatch(setExist(true));
  };

  const selectUser = (user: User) => {
    checkGroupeExist({ variables: { data: { ids: [me.id, user.id] } } });
    dispatch(setSelectedUser(user));
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
      onCompleted: ({ getGroupeByMultipleUsers }) => {
        if (getGroupeByMultipleUsers.length) {
          dispatch(setSelectedGroupe(getGroupeByMultipleUsers[0]));
          dispatch(setExist(true));
        } else {
          dispatch(setExist(false));
          dispatch(setSelectedGroupe({}));
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
      getGroupeByMultipleUsers({ variables: { data: { ids: [me.id] } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  return { form, handleChange, selectConversation, selectUser };
};
