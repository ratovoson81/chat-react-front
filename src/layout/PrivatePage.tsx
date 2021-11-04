import { Button, Image } from "antd";
import React from "react";
import { AuthButton } from "../components/AuthButton";
import { useAppSelector } from "../Hooks";

type props = {
  children: React.ReactNode;
};

const PrivatePage: React.FC<props> = ({ children }) => {
  const me = useAppSelector((state) => state.user.me);

  return (
    <>
      <AuthButton />
      {/*<NavBar />
      <br />*/}
      <div className="flex mt-4">
        <div className="flex-1 flex items-center">
          <h1 className="ml-8 text-3xl w-1/3 ">Chat</h1>
          <p>Newest</p>
        </div>
        <div className="flex-1 flex items-center">
          <div className="w-2/3 pl-16">
            <Button type="primary" danger>
              NEW MESSAGE
            </Button>
          </div>
          <div className="flex items-center">
            <Image
              className="rounded-full"
              width={40}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <div className="pl-4 text-xl">
              {me.name && me.name?.charAt(0).toUpperCase() + me.name?.slice(1)}
            </div>
          </div>
        </div>
      </div>
      {children}
      <h1>footer Private</h1>
    </>
  );
};

export default PrivatePage;
