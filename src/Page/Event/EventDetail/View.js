import React from "react";
import moment from "moment";
import htmlparser from "react-html-parser";
import Layout from "../../../Common/Component/Layout";
import "./index.scss";
import backIcon from "../../../Image/dreamclass/newsDetailBackIcon.svg"

export default function View(props) {
  const { event, handleClickBack } = props;
  
  if(!event) {
    return (
      <Layout>
        <div className="Page--EventDetail">
          <img className="EventBack" onClick={handleClickBack} src={backIcon} alt="back icon"/>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="Page--EventDetail">
        <img className="EventBack" onClick={handleClickBack} src={backIcon} alt="back icon"/>
        <div className="EventDetailTitle">{event.title}</div>
        <div className="EventDate">
          {moment(event.startAt).format("YYYY.MM.DD")} ~ {moment(event.endAt).format("MM.DD")}
        </div>
        <div className="EventContent">{htmlparser(event.content)}</div>
      </div>
    </Layout>
  );
}