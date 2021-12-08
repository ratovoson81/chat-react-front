import { useMutation } from "@apollo/client";
import { notification } from "antd";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { REGISTER } from "../api/mutation";

export const useRegister = () => {
  const [register] = useMutation(REGISTER);
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    image: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChangeFile = (file: string) => {
    setForm({
      ...form,
      image: file,
    });
  };

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(form);
    await register({ variables: { data: form } })
      .then((result) => {
        const placement = "bottomRight";
        notification.success({
          message: `Notification`,
          description:
            "Nouvel utilisateur " +
            result.data.signupUser.name +
            " crée avec succès",
          placement,
        });
      })
      .catch((err) => {
        const placement = "bottomRight";
        notification.error({
          message: `Notification`,
          description: err.graphQLErrors[0].message,
          placement,
        });
      });
  };

  return {
    form,
    handleChange,
    submit,
    handleChangeFile,
  };
};
