import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api";
import "./css/tailwind.css";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
