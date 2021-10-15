import { Layout } from "antd";
import React from "react";
import { AuthButton } from "../components/AuthButton";
import NavBar from "../router/NavBar";

const { Header, Footer, Content, Sider } = Layout;

type props = {
  children: React.ReactNode;
};

const LoginPage: React.FC<props> = ({ children }) => {
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Layout>
        <Header style={{ height: 300, backgroundColor: "white" }}>
          <p>header Login</p>
          <AuthButton />
          <NavBar />
        </Header>
        <Content>{children}</Content>
        <Footer>footer Login</Footer>
      </Layout>
    </Layout>
  );
};

export default LoginPage;
