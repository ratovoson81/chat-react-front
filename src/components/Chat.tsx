import { useAppSelector } from "../Hooks";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { useChat } from "../services/Chat";

export default function Chat() {
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const { Search } = Input;
  const { send } = useChat();

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  return (
    <div className="col-span-2 border relative">
      <div className="border ">person {selectedUser.name}</div>
      <div className="absolute bottom-0  ">
        <Search
          placeholder="Votre message"
          enterButton="Envoyer"
          size="large"
          suffix={suffix}
          onSearch={send}
        />
      </div>
    </div>
  );
}
