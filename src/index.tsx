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
import moment from "moment";

moment.updateLocale("fr", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "qlq sec",
    ss: "%d sec",
    m: "1 min",
    mm: "%d min",
    h: "1 h",
    hh: "%d h",
    d: "1 j",
    dd: "%d j",
    w: "1 sem",
    ww: "%d sem",
    M: "a mois",
    MM: "%d mois",
    y: "a an",
    yy: "%d an",
  },
});

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
