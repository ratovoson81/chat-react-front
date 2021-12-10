import { ArgsGetGroupePerUser, UserLoginInput } from "./../api/types";
import { ISLOGGED } from "./../api/mutation";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../Hooks";
import { setAllUsers, setMe } from "../store/User";
import { socket } from "../api";
import { setAllGroupe } from "../store/Groupe";
import { ALL_USERS, GET_All_GROUPE_BY_USER } from "../api/query";

const fakeAuth = {
  isAuthenticated: false,
  signin(cb: () => void) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: () => void) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export function useProvideAuth() {
  const dispatch = useAppDispatch();

  const [isLogged] = useMutation(ISLOGGED);
  const [user, setUser] = useState<String | null>(null);
  const [form, setForm] = useState<UserLoginInput>({
    email: "",
    password: "",
  });

  useEffect(() => {
    async function fetch() {
      await isLogged()
        .then((result) => {
          setUser(result.data.isLogged.name);
          dispatch(setMe(result.data.isLogged));
          allUsers();

          const data: ArgsGetGroupePerUser = {
            ids: [result.data.isLogged.id],
            skip: 0,
          };
          getGroupeByMultipleUsers({
            variables: { data: data },
          });
        })
        .catch((err) => {
          console.error("error => ", err);
        });
      //console.log("islogged", response.data.isLogged);
      //dispatch(getUser(response));
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [getGroupeByMultipleUsers /*, { called, loading, data }*/] =
    useLazyQuery(GET_All_GROUPE_BY_USER, {
      onCompleted: ({ getGroupeByMultipleUsers }) => {
        dispatch(setAllGroupe(getGroupeByMultipleUsers));
      },
    });

  const [allUsers /*, { called, loading, data }*/] = useLazyQuery(ALL_USERS, {
    onCompleted: ({ allUsers }) => {
      dispatch(setAllUsers(allUsers));
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const signin = (cb: () => void) => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = (cb: () => void) => {
    return fakeAuth.signout(() => {
      setUser(null);
      socket.emit("logout", localStorage.getItem("token"));
      localStorage.removeItem("token");
      cb();
    });
  };

  return {
    form,
    user,
    signin,
    signout,
    handleChange,
  };
}
