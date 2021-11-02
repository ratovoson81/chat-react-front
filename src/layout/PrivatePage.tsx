import { Button, Image } from "antd";
import React from "react";

type props = {
  children: React.ReactNode;
};

const PrivatePage: React.FC<props> = ({ children }) => {
  return (
    <>
      {/*<AuthButton />
      <NavBar />
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
            <div className="pl-4 text-xl">John Doe</div>
          </div>
        </div>
      </div>
      {children}
      <h1>footer Private</h1>
    </>
  );
};

export default PrivatePage;
