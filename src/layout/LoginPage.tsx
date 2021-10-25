import React from "react";
import "../css/loginPage.css";

type props = {
  children: React.ReactNode;
};

const LoginPage: React.FC<props> = ({ children }) => {
  return (
    <div className="h-screen font-sans login bg-cover">
      <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-lg">
          <div className="leading-loose">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
