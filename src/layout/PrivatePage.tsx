import React from "react";
import { AuthButton } from "../components/AuthButton";
import NavBar from "../router/NavBar";

type props = {
  children: React.ReactNode;
};

const PrivatePage: React.FC<props> = ({ children }) => {
  return (
    <>
      <AuthButton />
      <NavBar />
      <br />
      <h1>header Private</h1>
      {children}
      <h1>footer Private</h1>
    </>
  );
};

export default PrivatePage;
