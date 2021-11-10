import { useLazyQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { ALL_USERS, GET_All_GROUPE_BY_USER } from "../api/query";
import { setAllGroupe } from "../store/Groupe";
import { setAllUsers } from "../store/User";
import { useAppDispatch, useAppSelector } from "./../Hooks";

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

  const [allUsersMessageByMe /*, { called, loading, data }*/] = useLazyQuery(
    GET_All_GROUPE_BY_USER,
    {
      onCompleted: ({ allGroupeByUser }) => {
        dispatch(setAllGroupe(allGroupeByUser));
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
      allUsersMessageByMe({ variables: { data: { id: me.id } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  return { form, handleChange };
};
