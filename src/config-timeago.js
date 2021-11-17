import * as timeago from "timeago.js";
let locale = function (number, index, totalSec) {
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
};
timeago.register("pt_BR", locale);

let forOnline = function (number, index, totalSec) {
  // number: the time ago / time in number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ["à l'instant", "right now"],
    ["il y a %s sec", "in %s seconds"],
    ["il y a 1 min", "in 1 minute"],
    ["il y a %s min", "in %s minutes"],
    ["il y a 1 h", "in 1 hour"],
    ["il y a %s h", "in %s hours"],
    ["il y a 1 j", "in 1 day"],
    ["il y a %s j", "in %s days"],
    ["il y a 1 sem", "in 1 week"],
    ["il y a %s sem", "in %s weeks"],
    ["il y a 1 mois", "in 1 month"],
    ["il y a %s mois", "in %s months"],
    ["il y a 1 an", "in 1 year"],
    ["il y a %s ans", "in %s years"],
  ][index];
};
timeago.register("f-on", forOnline);
