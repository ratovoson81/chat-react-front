import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api";
import "./css/tailwind.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./store";
import "moment/locale/fr";
import "./config-timeago.js";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
