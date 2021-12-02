import React from "react";
import { useLocation } from "react-router-dom";
import "../css/loginPage.css";
import { gradient } from "../css/gradient";

type props = {
  children: React.ReactNode;
};

const LoginPage: React.FC<props> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="h-screen flex">
      <div className="flex-1 login"></div>
      <div className="flex-1 self-center">
        <div className="font-sans">
          <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
            <div className="relative sm:max-w-sm w-full">
              <div
                className={`card shadow-lg w-full h-full rounded-3xl absolute transform ${gradient(
                  location.pathname
                )}`}
              ></div>
              <div className="relative">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
