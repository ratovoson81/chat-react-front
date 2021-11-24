import { FC } from "react";

type TName = {
  name: string | undefined;
};

const Name: FC<TName> = ({ name }) => {
  return (
    <div className="font-medium">
      {name && name.charAt(0).toUpperCase() + name.slice(1)}
    </div>
  );
};

export default Name;
