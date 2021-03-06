import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../services/Register";
import CropImage from "../public/CropImage";

export default function Register() {
  const { form, handleChange, submit, handleChangeFile } = useRegister();
  const [croppedImage, setCroppedImage] = useState<any>(null);

  return (
    <form
      onSubmit={submit}
      className="max-w-md m-auto p-10 bg-white rounded shadow-xl space-y-4"
    >
      <p className="text-lg text-center">Create your account</p>
      <div className="">
        <label className="block">E-mail</label>
        <input
          className="w-full px-5 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:bg-white"
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          required
        />
      </div>

      <div>
        <label className="block ">Nom</label>
        <input
          className="w-full px-5 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:bg-white"
          placeholder="Nom"
          type="text"
          name="name"
          onChange={handleChange}
          value={form.name}
          required
        />
      </div>

      <div>
        <label className="block ">Password</label>
        <input
          className="w-full px-5 py-2 mt-2 text-gray-700 border rounded-md focus:outline-none focus:bg-white"
          placeholder="Password"
          type="text"
          name="password"
          onChange={handleChange}
          value={form.password}
          required
        />
      </div>

      <div>
        <label className="block ">Photo</label>
        <div className="py-1 mt-2">
          <CropImage
            handleChangeFile={handleChangeFile}
            croppedImage={croppedImage}
            setCroppedImage={setCroppedImage}
            imageSelected={form.image}
          />
        </div>
      </div>
      <div className="mt-4 items-center flex justify-between">
        <button
          className="px-8 py-2 text-white text-white tracking-wider bg-gradient-to-br from-yellow-500 to-yellow-700  transition duration-500 ease-in-out rounded-md"
          type="submit"
        >
          Confirmer
        </button>
        <div>
          <Link to="/" className="text-yellow-600 hover:text-yellow-800">
            {"Se connecter"}
          </Link>
        </div>
      </div>
    </form>
  );
}
