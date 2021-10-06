import { useMutation } from "@apollo/client";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { REGISTER } from "../api/mutation";
export const useRegister = () => {
  const [register] = useMutation(REGISTER);
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    await register({ variables: { data: form } })
      .then((result) => alert("register ok " + result.data.signupUser.name))
      .catch((err) => {
        console.error("error => ", err);
      });
  };

  return {
    form,
    handleChange,
    submit,
  };
};
