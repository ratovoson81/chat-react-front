import React from "react";

type props = {
  children: React.ReactNode;
};

const PrivatePage: React.FC<props> = ({ children }) => {
  return (
    <>
      <br />
      <h1>header Private</h1>
      {children}
      <h1>footer Private</h1>
    </>
  );
};

export default PrivatePage;
