import {intl} from "react-intl";

const moment = require("moment");

export const dateFormatter = date => {
  const { intl } = date;
  const today = moment();
  const target = moment(date);

  const years = today.diff(target, "years");
  const weeks = today.diff(target, "weeks");
  const days = today.diff(target, "days");
  const hours = today.diff(target, "hours");
  const minutes = today.diff(target, "minutes");

  const dayDiff = today.dayOfYear() - target.dayOfYear();

  if (years) {
    return moment(date).format("YYYY년 M월 D일");
  }
  if (weeks) {
    return moment(date).format("M월 D일");
  }
  if (days) {
    return days === 1 ? "어제" : `${days}일 전`;
  }
  if (dayDiff) {
    return "어제";
  }
  if (hours) {
    return `${hours}${intl.formattedMessage({id: "ID_DATE_FORMAT_MIN"})}`;
  }
  if (minutes) {
    return `${minutes}${intl.formattedMessage({id: "ID_DATE_FORMAT_MIN"})}`;
  } else {
    return "방금";
  }
};

