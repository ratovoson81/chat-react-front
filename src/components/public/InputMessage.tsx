import { SpinnerDotted } from "spinners-react";
import { useChat } from "../../services/Chat";
import micro from "../../assets/micro.svg";
import trambon from "../../assets/trambon.svg";
import filepicker from "../../assets/filepicker.svg";
import emoji from "../../assets/emoji.svg";
import { SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import "../../css/chat.css";
import EmojiPicker from "./EmojiPicker";
import { useAppSelector } from "../../Hooks";

const InputMessage = () => {
  const { sendMessage, handleChange, loading, view, onEmojiClick } = useChat();
  const [pickerOpen, togglePicker] = useState(false);
  const iDselectedGroupe = useAppSelector(
    (state) => state.groupe.idselectedGroupe
  );
  const groupe = useAppSelector((state) =>
    state.groupe.groupes.find((g) => g.id === iDselectedGroupe)
  );

  return (
    <div className="border-t-2 border-gray-200 px-4 pt-2 mb-2 sm:mb-1">
      <div className="flex space-x-1">
        <span className=" inset-y-0 flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <img src={micro} width="25" alt="" />
          </button>
        </span>
        <textarea
          placeholder="Taper votre message"
          name="message"
          autoComplete="off"
          onChange={handleChange}
          value={groupe?.text || ""}
          onFocus={view}
          required
          className="w-full h-12 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-full py-3"
        />
        <div className=" right-0 items-center inset-y-0 hidden sm:flex space-x-0.5">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <img src={trambon} width="25" alt="" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <img src={filepicker} width="25" alt="" />
          </button>
          <button
            type="button"
            onClick={() => {
              togglePicker(!pickerOpen);
            }}
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <img src={emoji} width="25" alt="" />
          </button>
          {pickerOpen && (
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              togglePicker={togglePicker}
            />
          )}
          {!loading ? (
            <button
              type="button"
              onClick={sendMessage}
              disabled={
                groupe?.text === "" || groupe?.text === undefined ? true : false
              }
              className={`inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white focus:outline-none ${
                groupe?.text === "" || groupe?.text === undefined
                  ? "bg-gray-400"
                  : "bg-purple-700 hover:bg-purple-900"
              }`}
            >
              <SendOutlined style={{ fontSize: "23px" }} />
            </button>
          ) : (
            <SpinnerDotted size="25" color="purple" />
          )}
        </div>
      </div>
    </div>
  );
};
export default InputMessage;
