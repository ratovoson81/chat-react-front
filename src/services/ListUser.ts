import { useLazyQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { GET_All_GROUPE_BY_USER } from "../api/query";
import { setAllUsers } from "../store/Groupe";
import { useAppDispatch, useAppSelector } from "./../Hooks";

export const useListUser = () => {
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
        console.log(allGroupeByUser);
        dispatch(setAllUsers(allGroupeByUser));
      },
    }
  );
  useEffect(() => {
    if (me) {
      allUsersMessageByMe({ variables: { data: { id: me.id } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  return { form, handleChange };
};
