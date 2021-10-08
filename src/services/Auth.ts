import { UserLoginInput } from "./../api/types";
import { ISLOGGED } from "./../api/mutation";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";

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
  const [isLogged] = useMutation(ISLOGGED);
  const [user, setUser] = useState<String | null>(null);
  const [form, setForm] = useState<UserLoginInput>({
    email: "",
    password: "",
  });

  useEffect(() => {
    async function fetch() {
      await isLogged()
        .then((result) => setUser(result.data.isLogged.name))
        .catch((err) => {
          console.error("error => ", err);
        });
      //console.log("islogged", response.data.isLogged);
      //dispatch(getUser(response));
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
