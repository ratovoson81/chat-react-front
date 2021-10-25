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
        console.error(JSON.stringify(err));
        const placement = "bottomRight";
        let message = "Une erreur est survenue";
        if (
          err.graphQLErrors[0].message ===
          "\nInvalid `prisma.user.create()` invocation:\n\n\n  Unique constraint failed on the constraint: `email_unique`"
        ) {
          message = "L'adresse email appartient déjà à un compte existant";
        }
        notification.error({
          message: `Notification`,
          description: message,
          placement,
        });
      });
  };

  return {
    form,
    handleChange,
    submit,
  };
};
