import React from "react";
import "./index.scss";
import Layout from "../../../../Common/Component/Layout";
import { Link } from "react-router-dom";

import image01 from "../../../../Image/creator-challenge-announcement-of-winners-01.png";
import image02 from "../../../../Image/creator-challenge-announcement-of-winners-02.png";
import image03 from "../../../../Image/creator-challenge-announcement-of-winners-03.png";
import image04 from "../../../../Image/creator-challenge-announcement-of-winners-04.png";
import image05 from "../../../../Image/creator-challenge-announcement-of-winners-05.png";
import image06 from "../../../../Image/creator-challenge-announcement-of-winners-06.png";
import image07 from "../../../../Image/creator-challenge-announcement-of-winners-07.png";

import m_image01 from "../../../../Image/creator-challenge-announcement-of-winners-m-01@3x.png";
import m_image02 from "../../../../Image/creator-challenge-announcement-of-winners-m-02@3x.png";
import m_image03 from "../../../../Image/creator-challenge-announcement-of-winners-m-03@3x.png";
import m_image04 from "../../../../Image/creator-challenge-announcement-of-winners-m-04@3x.png";
import m_image05 from "../../../../Image/creator-challenge-announcement-of-winners-m-05@3x.png";
import m_image06 from "../../../../Image/creator-challenge-announcement-of-winners-m-06@3x.png";
import m_image07 from "../../../../Image/creator-challenge-announcement-of-winners-m-07@3x.png";

export default function(props) {
  const gamePid = [
    "f1e97943-2048-5073-aeac-3b7fd4a5ac41",
    "e372c638-eb1e-5bb1-a86a-e5ef0365527f",
    "a24d937d-d789-5491-a5cb-24f84ec29949",
    "690b5c79-5632-588b-be65-fb8b58e4531c",
    "25312719-c3b8-518f-bccd-4f9744dfa5f1",
    "817dfefd-e4dc-5697-95ac-f34d411ee57c",
    "a56b2cf6-f752-5921-9b98-993339fbf867",
    "7f75517e-76f3-5a19-92e9-041e7c65e09f",
    "71f7dd1b-c48a-5c31-9767-04f2461ed619",
    "c0bd5c3f-5a57-57dd-9662-46645a44625b",
    "43ee084f-812f-54b1-8729-c02d5054642a",
    "0b869b1d-7c35-5efb-82dc-655f109f78c3",
    "0b28f26e-890c-52dc-b391-50c4107a7805",
    "15412ccc-f33e-5db2-b2c5-cc694f8a9c44",
    "28f27cc8-f1a7-57c6-9b44-af8833b9d83c",
    "34362924-4ae3-5d72-91fd-5b0c1c21bb99"
  ];

  return (
    <Layout>
      <div className="Page--OCP2--event--Result">
        <div className="event--pc">
          <img src={image01} alt="" />
          <div className="wrapper">
            <img src={image02} alt="" />
            <Link to={`?pId=${gamePid[0]}`} className="rowLink link01" />
            <Link to={`?pId=${gamePid[1]}`} className="rowLink link02" />
            <Link to={`?pId=${gamePid[2]}`} className="rowLink link03" />
          </div>
          <div className="wrapper">
            <img src={image03} alt="" />
            <Link to={`?pId=${gamePid[3]}`} className="columnLink link04" />
            <Link to={`?pId=${gamePid[4]}`} className="columnLink link05" />
            <Link to={`?pId=${gamePid[5]}`} className="columnLink link06" />
            <Link to={`?pId=${gamePid[6]}`} className="columnLink link07" />
            <Link to={`?pId=${gamePid[7]}`} className="columnLink link08" />
          </div>
          <img src={image04} alt="" />
          <div className="wrapper">
            <img src={image05} alt="" />
            <Link to={`?pId=${gamePid[8]}`} className="rowLink link09" />
            <Link to={`?pId=${gamePid[9]}`} className="rowLink link10" />
            <Link to={`?pId=${gamePid[10]}`} className="rowLink link11" />
          </div>
          <div className="wrapper">
            <img src={image06} alt="" />
            <Link to={`?pId=${gamePid[11]}`} className="columnLink link12" />
            <Link to={`?pId=${gamePid[12]}`} className="columnLink link13" />
            <Link to={`?pId=${gamePid[13]}`} className="columnLink link14" />
            <Link to={`?pId=${gamePid[14]}`} className="columnLink link15" />
            <Link to={`?pId=${gamePid[15]}`} className="columnLink link16" />
          </div>
          <img src={image07} alt="" />
        </div>

        <div className="event--mobile">
          <img src={m_image01} alt="" />
          <div className="wrapper">
            <img src={m_image02} alt="" />
            <Link to={`?pId=${gamePid[0]}`} className="rowLink link01" />
            <Link to={`?pId=${gamePid[1]}`} className="rowLink link02" />
            <Link to={`?pId=${gamePid[2]}`} className="rowLink link03" />
          </div>
          <div className="wrapper">
            <img src={m_image03} alt="" />
            <Link to={`?pId=${gamePid[3]}`} className="columnLink link04" />
            <Link to={`?pId=${gamePid[4]}`} className="columnLink link05" />
            <Link to={`?pId=${gamePid[5]}`} className="columnLink link06" />
            <Link to={`?pId=${gamePid[6]}`} className="columnLink link07" />
            <Link to={`?pId=${gamePid[7]}`} className="columnLink link08" />
          </div>
          <img src={m_image04} alt="" />
          <div className="wrapper">
            <img src={m_image05} alt="" />
            <Link to={`?pId=${gamePid[8]}`} className="rowLink link09" />
            <Link to={`?pId=${gamePid[9]}`} className="rowLink link10" />
            <Link to={`?pId=${gamePid[10]}`} className="rowLink link11" />
          </div>
          <div className="wrapper">
            <img src={m_image06} alt="" />
            <Link to={`?pId=${gamePid[11]}`} className="columnLink link12" />
            <Link to={`?pId=${gamePid[12]}`} className="columnLink link13" />
            <Link to={`?pId=${gamePid[13]}`} className="columnLink link14" />
            <Link to={`?pId=${gamePid[14]}`} className="columnLink link15" />
            <Link to={`?pId=${gamePid[15]}`} className="columnLink link16" />
          </div>
          <img src={m_image07} alt="" />
        </div>
      </div>
    </Layout>
  );
}
