import { useEffect } from "react";
import UserQuery from "../api/query";
import { setAllUsers } from "../store/User";
import { useAppDispatch } from "./../Hooks";

export const useListUser = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    UserQuery.getAllUsers()
      .then((result) => {
        dispatch(setAllUsers(result.data.allUsers));
      })
      .catch((err) => {
        console.error("ERROR get All Users", err);
      });
  });
};
