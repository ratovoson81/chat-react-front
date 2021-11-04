import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { useChat } from "../services/Chat";
import { MessageChat } from "../api/types";

export default function Chat() {
  const { Search } = Input;
  const { send, selectedUser, chat } = useChat();

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
      <div className="border h-96">
        {chat.map((message: MessageChat, i: number) => (
          <div key={i} className={`${message.mine && "flex justify-end"}`}>
            <div>
              <p className={`${message.mine && "flex justify-end"}`}>
                {message.from.name}
              </p>
              <p>{message.content}</p>
            </div>
          </div>
        ))}

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
    </div>
  );
}
