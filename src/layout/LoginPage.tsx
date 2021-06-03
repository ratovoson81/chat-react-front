import React from "react";
import { AuthButton } from "../components/AuthButton";
import NavBar from "../router/NavBar";

type props = {
  children: React.ReactNode;
};

const LoginPage: React.FC<props> = ({ children }) => {
  return (
    <div className="md:container md:mx-auto flex flex-col justify-center">
      <AuthButton />
      <NavBar />
      <br />
      {children}
    </div>
  );
};

export default LoginPage;
