import { useRegister } from "../services/Register";

export default function Register() {
  const { form, handleChange, submit } = useRegister();

  return (
    <div className="flex justify-center">
      <form onSubmit={submit} className="flex flex-col w-72">
        <input
          className="text-center"
          placeholder="email"
          type="text"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          className="text-center"
          placeholder="Nom"
          type="text"
          name="name"
          onChange={handleChange}
          value={form.name}
        />
        <input
          className="text-center"
          placeholder="Password"
          type="text"
          name="password"
          onChange={handleChange}
          value={form.password}
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}
