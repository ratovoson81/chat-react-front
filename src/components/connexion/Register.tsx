import { Link } from "react-router-dom";
import { useRegister } from "../../services/Register";

export default function Register() {
  const { form, handleChange, submit, handleChangeFile } = useRegister();

  return (
    <form
      onSubmit={submit}
      className="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl"
    >
      <p className="text-white font-medium text-center text-lg font-bold">
        REGISTER
      </p>
      <div className="">
        <label className="block text-sm text-white">E-mail</label>
        <input
          className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          placeholder="email"
          type="text"
          name="email"
          onChange={handleChange}
          value={form.email}
          required
        />
      </div>

      <div className="mt-2">
        <label className="block  text-sm text-white">Nom</label>
        <input
          className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          placeholder="Nom"
          type="text"
          name="name"
          onChange={handleChange}
          value={form.name}
          required
        />
      </div>

      <div className="mt-2">
        <label className="block  text-sm text-white">Password</label>
        <input
          className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          placeholder="password"
          type="text"
          name="password"
          onChange={handleChange}
          value={form.password}
          required
        />
      </div>

      <div className="mt-2">
        <label className="block  text-sm text-white">Photo</label>
        <input
          className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
          placeholder="password"
          type="file"
          name="password"
          onChange={handleChangeFile}
          required
        />
      </div>

      <div className="mt-4 items-center flex justify-between">
        <button
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
          type="submit"
        >
          Confirmer
        </button>
      </div>
      <div className="text-center">
        <Link to="/">{"Se connecter"}</Link>
      </div>
    </form>
  );
}
