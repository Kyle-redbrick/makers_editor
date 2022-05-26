import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import moment from "moment";
import "moment/locale/ko";
import "moment/locale/en-gb";
import "moment/locale/ja";
import { injectIntl } from "react-intl";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import attendImg from "../../../Image/img-attendance-stamp.png";
import nextArrow from "../../../Image/btn_right_arrow.svg"
import prevArrow from "../../../Image/btn_left_arrow.svg"
import * as request from "../../../Common/Util/HTTPRequest";

import "./Calendar.scss";


const Self = styled.div`
  padding-left:30px;
  flex: 1;
  padding-bottom: 100px;
`;


const Attendance = ({ ...props }) => {
  const locale = localStorage.getItem("lang");
  const userId = props.userinfo.id;
  const [attendanceData, setAttendanceData] = useState([]);
  let calendar_lang = "";

  useEffect(() => {
    request.getAttendance(userId)
      .then(res => res.json())
      .then(json => {
        setAttendanceData(json.body);
      })
  }, []);

  switch (locale) {
    case "en":
      calendar_lang = "en-US";
      break;
    case "ja":
      calendar_lang = "ja-JP";
      break;
    case "ko":
      calendar_lang = "ko-KR";
  }

  moment.locale(calendar_lang);
  const localizer = momentLocalizer(moment);
  localizer.formats.dateFormat = 'D';
  const events = [];
  const eventStyle = () => {
    var style = {
      position: "absolute",
      top: "0",
      paddingTop: "10px",
      width: "116px",
      height: "100%"
    };
    return {
      style: style
    }
  }

  return (
    <Self {...props}>
      <div className="attendance__title">Attendance  </div>
      <div className="attendance__calendar-container">
        {attendanceData && attendanceData.forEach((data) => {
          events.push({
            'title': <img src={attendImg} alt="" />,
            'start': data.dt,
            'end': data.dt
          })
        })}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ minHeight: 711 }}
          eventPropGetter={eventStyle}
          components={{
            toolbar: Toolbar
          }}
        />
      </div>
    </Self>
  );
};

const Toolbar = ({ date, onNavigate }) => {
  const locale = localStorage.getItem("lang");
  let calendar_lang = "";
  switch (locale) {
    case "en":
      calendar_lang = "en-US";
      break;
    case "ja":
      calendar_lang = "ja-JP";
      break;
    case "ko":
      calendar_lang = "ko-KR";
  }
  const month = date.toLocaleString(calendar_lang, { month: 'long' });
  const navigate = (action) => {
    onNavigate(action);
  };
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <img src={prevArrow} alt="prev" onClick={navigate.bind(null, 'PREV')} />
        <span className="rbc-toolbar-label">
          {locale !== "en" ?
            `${date.getFullYear()} ${month}`
            :
            `${month} ${date.getFullYear()}`
          }
        </span>
        <img src={nextArrow} alt="next" onClick={navigate.bind(null, 'NEXT')} />
      </span>
    </div>
  );
}

export default connect(
  state => ({
    userinfo: state.userinfo
  })
)(injectIntl(Attendance));
