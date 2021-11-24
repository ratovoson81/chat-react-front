import { VideoCameraFilled } from "@ant-design/icons";
import TimeAgo from "timeago-react";
import { useAppSelector } from "../../Hooks";
import { useChat } from "../../services/Chat";
import Avatar from "./Avatar";
import Name from "./Name";

const InfoSelectedUser = () => {
  const { idSelectedUser } = useChat();
  const selectedUser = useAppSelector((state) =>
    state.user.users.find((u) => u.id === idSelectedUser)
  );

  return (
    <div className="flex h-16 items-center">
      <Avatar
        imageUrl={selectedUser?.imageUrl}
        isOnline={selectedUser?.isOnline}
      />
      <div className="flex flex-col pl-4 justify-center w-full">
        <Name name={selectedUser?.name} />
        <div className="text-gray-500 text-xs">
          En ligne{" "}
          {selectedUser?.isOnline ? (
            ""
          ) : (
            <span>
              <TimeAgo datetime={selectedUser?.connectedAt} locale="f-on" />
            </span>
          )}
        </div>
      </div>
      <div className="">
        <button
          type="button"
          //onClick={sendMessage}
          className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out focus:outline-none"
        >
          <VideoCameraFilled style={{ fontSize: "23px", color: "purple" }} />
        </button>
      </div>
    </div>
  );
};

export default InfoSelectedUser;
