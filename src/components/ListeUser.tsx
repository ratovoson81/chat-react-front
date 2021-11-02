import { SpinnerCircular } from "spinners-react";
import { User } from "../api/types";
import { useAppSelector } from "../Hooks";
import { useListUser } from "../services/ListUser";

export default function ListUser() {
  useListUser();
  const users = useAppSelector((state) => state.user.users);
  return (
    <>
      {users.length === 0 && (
        <div className="flex justify-center items-center">
          <SpinnerCircular size="40" color="black" />
        </div>
      )}
      {users.map((item: User, i: number) => (
        <div key={i}>{item.email}</div>
      ))}
    </>
  );
}
