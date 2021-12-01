import { useChat } from "../../services/Chat";
import { Message } from "../../api/types";
import "../../css/chat.css";
import { useEffect } from "react";
import { IMAGE_URL } from "../../api";
import { useAppSelector } from "../../Hooks";
import { Button } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import moment from "moment";
import { BorderRoundedMe, BorderRoundedReceive } from "../../BorderChat";
import InfiniteScroll from "react-infinite-scroll-component";
import { SpinnerDotted } from "spinners-react";
import InputMessage from "../public/InputMessage";
import InfoSelectedUser from "../public/InfoSelectedUser";
import { ThreeDot } from "../public/ThreeDot";

export default function Chat() {
  const {
    createChat,
    view,
    idSelectedUser,
    addMoreMessage,
    hasMore,
    setHasMore,
  } = useChat();

  const iDselectedGroupe = useAppSelector(
    (state) => state.groupe.idselectedGroupe
  );
  const selectedUser = useAppSelector((state) =>
    state.user.users.find((u) => u.id === idSelectedUser)
  );
  const me = useAppSelector((state) => state.user.me);
  const exist = useAppSelector((state) => state.groupe.exist);
  const groupe = useAppSelector((state) =>
    state.groupe.groupes.find((g) => g.id === iDselectedGroupe)
  );

  useEffect(() => {
    const div: any = document.getElementById("messages");
    if (div) {
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }
    if (iDselectedGroupe !== -1 && exist) {
      view();
      if (groupe) {
        if (groupe?.messages?.length >= 20) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iDselectedGroupe]);

  return (
    <>
      <InfoSelectedUser />
      {exist ? (
        <div
          id="messages"
          className="border-t mt-2 h-full flex flex-col-reverse p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          <InfiniteScroll
            dataLength={groupe?.messages.length as any}
            next={addMoreMessage}
            style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
            inverse={true} //
            hasMore={hasMore}
            loader={
              <span className="flex justify-center">
                <SpinnerDotted size="40" color="purple" />
              </span>
            }
            scrollableTarget="messages"
            endMessage={
              <div className="mb-auto">
                <img
                  className="rounded-full m-auto "
                  width={150}
                  alt=""
                  src={IMAGE_URL + selectedUser?.imageUrl}
                />
                <div className="flex flex-col justify-center mt-4 text-xs">
                  <div className="m-auto">{selectedUser?.email}</div>
                  <div className="m-auto">{selectedUser?.name}</div>
                  <div className="m-auto">Vous pouvez maintenant chater !</div>
                </div>
              </div>
            }
          >
            {iDselectedGroupe > -1 &&
              groupe?.messages
                .slice(0)
                .map((message: Message, i: number, elem: any) => {
                  const prevElem = elem[i - 1];
                  const nextElem = elem[i + 1];
                  const now = moment(message.date).format("LL");
                  const prev = moment(nextElem?.date).format("LL");
                  let sameDay = true;
                  if (now === prev) {
                    sameDay = false;
                  } else {
                    sameDay = true;
                  }
                  const diffPrev = moment(message.date).diff(
                    moment(nextElem?.date),
                    "minute"
                  );
                  const diffNext = moment(prevElem?.date).diff(
                    moment(message.date),
                    "minute"
                  );
                  return (
                    <div key={i} className={`chat-message mt-auto `}>
                      {sameDay && (
                        <div className="flex justify-center text-xs border border-transparent">{`${moment(
                          message.date
                        ).calendar(null, {
                          sameWeek: "ddd",
                          sameElse: "Do MMMM YYYY",
                        })}`}</div>
                      )}
                      <div
                        className={`flex items-end ${
                          message.author.id === me.id && " justify-end"
                        }
                     ${diffPrev >= 3 && "mt-4 "}
                    `}
                      >
                        <div
                          className={`flex flex-col space-y-0.5 max-w-xs mx-2 ${
                            message.author.id === me.id
                              ? "order-1 items-end"
                              : "order-2 items-start"
                          }`}
                        >
                          {prevElem?.author.id === message.author.id &&
                            nextElem?.author.id !== message.author.id && (
                              <span className="text-xs">
                                {`${moment(message.date).format("LT")}`}
                              </span>
                            )}
                          {prevElem?.author.id !== message.author.id &&
                            nextElem?.author.id !== message.author.id && (
                              <span className="text-xs">
                                {`${moment(message.date).format("LT")}`}
                              </span>
                            )}
                          {nextElem?.author.id === message.author.id &&
                            diffPrev >= 3 && (
                              <span className="text-xs">
                                {`${moment(message.date).format("LT")}`}
                              </span>
                            )}
                          <div>
                            <span
                              className={`px-4 py-2 inline-block ${
                                message.author.id === me.id
                                  ? "rounded-l-lg bg-purple-700 text-white "
                                  : "rounded-r-lg bg-gray-300 text-gray-600"
                              }
                          ${BorderRoundedMe(
                            me.id,
                            message.author.id,
                            nextElem?.author.id,
                            prevElem?.author.id,
                            diffPrev,
                            diffNext
                          )}  
                          ${BorderRoundedReceive(
                            me.id,
                            message.author.id,
                            nextElem?.author.id,
                            prevElem?.author.id,
                            diffPrev,
                            diffNext
                          )} 
                          `}
                            >
                              {message.content}
                            </span>
                          </div>
                          <span className="text-xs">
                            {i === 0 &&
                              message.author.id === me.id &&
                              message.view &&
                              `Vu: ${moment(message.viewAt).calendar(null, {
                                sameElse: "Do MMM, H:mm",
                              })}`}
                          </span>
                        </div>
                        {nextElem?.author.id !== message.author.id ? (
                          <img
                            src={IMAGE_URL + message.author.imageUrl}
                            width={40}
                            alt="My profile"
                            className="rounded-full order-1 self-start"
                          />
                        ) : diffPrev >= 3 ? (
                          <img
                            src={IMAGE_URL + message.author.imageUrl}
                            width={40}
                            alt="My profile"
                            className="rounded-full order-1 self-start"
                          />
                        ) : (
                          <div className="mx-5 order-1"></div>
                        )}
                      </div>
                      {groupe.typing && i === 0 && (
                        <div className="ml-12">
                          <ThreeDot />
                        </div>
                      )}
                    </div>
                  );
                })}
          </InfiniteScroll>
        </div>
      ) : (
        <div className="mb-auto">
          <img
            className="rounded-full m-auto "
            width={150}
            alt=""
            src={IMAGE_URL + selectedUser?.imageUrl}
          />
          <div className="flex flex-col justify-center mt-4 text-xs">
            <div className="m-auto">{selectedUser?.email}</div>
            <div className="m-auto">{selectedUser?.name}</div>
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
          </div>
        </div>
      )}
      {exist && <InputMessage />}
    </>
  );
}
