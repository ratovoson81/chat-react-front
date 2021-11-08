import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { ALL_MESSAGE_BY_ME } from "../api/query";
import { setAllUsers } from "../store/User";
import { useAppDispatch, useAppSelector } from "./../Hooks";

export const useListUser = () => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.user.me);

  const [allUsersMessageByMe /*, { called, loading, data }*/] = useLazyQuery(
    ALL_MESSAGE_BY_ME,
    {
      onCompleted: ({ allUsersMessageByMe }) => {
        dispatch(setAllUsers(allUsersMessageByMe));
      },
    }
  );
  useEffect(() => {
    if (me) {
      allUsersMessageByMe({ variables: { data: { id: me.id } } });
    }
    console.log(me);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);
};
