import React from "react";

type props = {
  children: React.ReactNode;
};

const LoginPage: React.FC<props> = ({ children }) => {
  return (
    <>
      <br />
      <h1>header</h1>
      {children}
      <h1>footer</h1>
    </>
  );
};

export default LoginPage;
