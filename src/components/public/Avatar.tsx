import { FC } from "react";
import { IMAGE_URL } from "../../api";

type TAvatar = {
  imageUrl: string | undefined | null;
  isOnline: boolean | undefined | null;
};

const Avatar: FC<TAvatar> = ({ imageUrl, isOnline }) => {
  return (
    <span className="relative inline-block ">
      <img
        className="rounded-full"
        width={55}
        alt=""
        src={IMAGE_URL + imageUrl}
      />
      {isOnline && (
        <span className="absolute bottom-0.5 right-0.5 text-xs h-3 w-3 leading-none ring-2 ring-gray-50 transform bg-green-400 rounded-full"></span>
      )}
    </span>
  );
};

export default Avatar;
