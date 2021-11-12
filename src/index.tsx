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
import * as timeago from "timeago.js";

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

let locale = function (number: any, index: any, totalSec: any) {
  // number: the time ago / time in number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ["À l'instant", "right now"],
    ["%s sec", "in %s seconds"],
    ["1 min", "in 1 minute"],
    ["%s min", "in %s minutes"],
    ["1 h", "in 1 hour"],
    ["%s h", "in %s hours"],
    ["1 j", "in 1 day"],
    ["%s j", "in %s days"],
    ["1 sem", "in 1 week"],
    ["%s sem", "in %s weeks"],
    ["1 mois", "in 1 month"],
    ["%s mois", "in %s months"],
    ["1 an", "in 1 year"],
    ["%s ans", "in %s years"],
  ][index];
} as any;
timeago.register("pt_BR", locale);

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
