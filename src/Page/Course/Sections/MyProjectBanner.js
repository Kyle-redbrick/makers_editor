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





const MyProjectBanner = (props) => {
  const [currentSlideNum, setCurrentSlideNum] = useState(1);
  const [projects, setProjects] = useState([]);
  const [projectCount, setProjectCount] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [isShown, setIsShown] = useState({isShow:false,index:0,lock:false});


  // useEffect(() => {
  //   if(props.courses[currentSlideNum-1]){
  //     setProjects(props.courses[currentSlideNum-1].projects)
  //     setTitle(props.courses[currentSlideNum-1].title)
  //     setTag(props.courses[currentSlideNum-1].tag)
  //     setProjectCount(props.courses[currentSlideNum-1].project_count)
  //   }
  // }, [currentSlideNum,props.courses]); 

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
    <div>

    </div>
  )
}

export default MyProjectBanner;
