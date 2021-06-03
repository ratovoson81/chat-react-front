export default function Register() {
  return (
    <div className="flex justify-center">
      <form className="flex flex-col w-72">
        <input
          className="text-center"
          placeholder="Nom"
          type="text"
          name="name"
        />
        <input
          className="text-center"
          placeholder="Password"
          type="text"
          name="name"
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}
