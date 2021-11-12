import { useChat } from "../../services/Chat";
import { Message } from "../../api/types";
import "../../css/chat.css";
import { useEffect } from "react";
import { IMAGE_URL } from "../../api";
import { useAppSelector } from "../../Hooks";
import { Button } from "antd";
import { WechatOutlined } from "@ant-design/icons";

export default function Chat() {
  const { sendMessage, selectedGroupe, form, handleChange, me, createChat } =
    useChat();
  const selectedUser = useAppSelector((state) => state.user.selectedUser);
  const exist = useAppSelector((state) => state.groupe.exist);

  useEffect(() => {
    const div: any = document.getElementById("messages");
    div.scrollTop = div.scrollHeight - div.clientHeight;
  });

  return (
    <>
      <div className="flex h-16">
        <img
          className="rounded-full"
          width={55}
          alt=""
          src={IMAGE_URL + selectedUser.imageUrl}
        />
        <div className="flex flex-col pl-4 justify-center">
          <div className="font-medium">{selectedUser.name}</div>
        </div>
      </div>
      <div
        id="messages"
        className="h-full flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        <div className="mb-auto">
          <img
            className="rounded-full m-auto "
            width={55}
            alt=""
            src={IMAGE_URL + selectedUser.imageUrl}
          />
          <div className="flex flex-col justify-center mt-4 text-xs">
            <div className="m-auto">{selectedUser.email}</div>
            <div className="m-auto">{selectedUser.name}</div>
            {exist ? (
              <div className="m-auto">Vous pouvez maintenant chater !</div>
            ) : (
              <Button
                className="mt-2 m-auto"
                type="primary"
                shape="round"
                icon={<WechatOutlined />}
                size="large"
                onClick={() => createChat()}
              >
                Chater
              </Button>
            )}
          </div>
        </div>
        {selectedGroupe.id &&
          selectedGroupe.messages
            .slice(0)
            .reverse()
            .map((message: Message, i: number) => (
              <div key={i} className="chat-message mt-auto">
                <div
                  className={`flex items-end ${
                    message.author.id === me.id && "justify-end"
                  }`}
                >
                  <div
                    className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${
                      message.author.id === me.id
                        ? "order-1 items-end"
                        : "order-2 items-start"
                    }`}
                  >
                    <div>
                      <span
                        className={`px-4 py-2 rounded-lg inline-block ${
                          message.author.id === me.id
                            ? "rounded-br-none bg-blue-600 text-white "
                            : "rounded-bl-none bg-gray-300 text-gray-600"
                        }`}
                      >
                        {message.content}
                      </span>
                    </div>
                  </div>
                  <img
                    src={IMAGE_URL + message.author.imageUrl}
                    alt="My profile"
                    className="w-6 h-6 rounded-full order-1"
                  />
                </div>
              </div>
            ))}
        {/*<div className="">
          <Search
            placeholder="Votre message"
            enterButton="Envoyer"
            size="large"
            suffix={suffix}
            onSearch={send}
          />
                  </div>*/}
      </div>
      {exist && (
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <span className="absolute inset-y-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  ></path>
                </svg>
              </button>
            </span>
            <input
              type="text"
              placeholder="Taper votre message"
              name="message"
              autoComplete="off"
              onChange={handleChange}
              value={form.message}
              required
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                onClick={sendMessage}
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {/*<div key={i} className={`${message.mine && "flex justify-end"}`}>
            <div>
              <p className={`${message.mine && "flex justify-end"}`}>
                {message.from.name}
              </p>
              <p>{message.content}</p>
            </div>
        </div>*/}
    </>
  );
}
