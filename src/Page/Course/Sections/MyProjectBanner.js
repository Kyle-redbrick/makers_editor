import React, { useState, useEffect,useCallback } from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import slideSampleImg from "../../../Image/bingopopup2.png";
import prevIcon from "../../../Image/icon-slide-prev-new.svg";
import nextIcon from "../../../Image/icon-slide-next-new.svg";
import checkIcon from "../../../Image/icon-check.svg";
import arrowIcon from "../../../Image/icon-check.svg";
import { URL } from "../../../Common/Util/Constant";
import * as LearnButtons from "../../../Common/Component/Button/Learn";
import GamePopup from "../../CourseDetail/Components/GamePopup";
import * as Popup from "../../../Common/Component/PopUp";
import MyProjectLeft from "./MyProjectLeft";
import MyProjectRight from "./MyProjectRight";

import "./MyProjectBanner.scss";

const MyProjectBanner = (props) => {
  const [currentSlideNum, setCurrentSlideNum] = useState(1);
  const [projects, setProjects] = useState([]);
  const [projectCount, setProjectCount] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [isShown, setIsShown] = useState({isShow:false,index:0,lock:false});
  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
    beforeChange: current => setCurrentSlideNum(current + 1),
    afterChange: current => setCurrentSlideNum(current + 1)
  };

  const onclickItem = (bool,index,lock) => {
    setIsShown({isShow:bool,index:index,lock:lock})
  }

  const handleClickGame = useCallback(
    (sample) => {
      Popup.showPopUp(<GamePopup url={sample} />, {
        dismissButton: false,
        dismissOverlay: true,
        defaultPadding: false,
        darkmode: true,
        mobileFullscreen: true,
        overflow: true,
      });
    },
    [GamePopup, Popup.showPopUp]
  );

  return (
    <div className="project-banner">
      {/* TODO 로그인 전 페이지 타이틀 */}
      <h3 className="page-title">원하는 코스를 무료로 체험해보세요</h3>

      {/* TODO 로그인 후 페이지 타이틀 */}
      {/* <div className="left-slide__title-box">
        <h3 className="page-title--child">OOBC - Elementary</h3>
        <div className="left-slide__child-title-box">
          <span className="left-slide__child-title-left">Learns for students new to coding. Learn to code by creating simple games with block coding.</span>
          <span className="left-slide__child-title-right"><b>3</b> / 15 Missions assigned</span>
        </div>
      </div> */}

      <div className="project-banner-wrap">
        <MyProjectLeft />
        <MyProjectRight />
      </div>
    </div>
  )
}

export default MyProjectBanner;
