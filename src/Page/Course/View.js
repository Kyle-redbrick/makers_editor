import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import Layout from "../../Common/Component/Layout";
import * as Popup from "../../Common/Component/PopUp";
import IntroPopup from "./Components/IntroPopup";
import MyProjectBanner from "./Sections/MyProjectBanner";
import AllProjectList from "./Sections/AllProjectList";
import arrowPrev from "../../Image/course/arrow-prev.svg";
import arrowNext from "../../Image/course/arrow-next.svg";
import { getLearn } from "../../Common/Util/HTTPRequest";
import "./index.scss";

const GlobalStyle = css`
  *:focus {
    outline:none;
  }

  .slick-list {
    font-size: 0;
  }

  .slick-track {
    min-width: 1200px;
  }

  .slick-slide {
    position: relative;
  }

  .slick-contents {
    .slick-slide:not(.slick-active):before {
      height: 360px;
    }
  }

  .slick-arrow {
    font-size: 0;
    border: none;
    padding: 0;
    width: 68px;
    height: 68px;
    background-color: transparent;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 50%;
    z-index: 100;
    cursor: pointer;

    &:before {
      display: none;
    }
    
    &.slick-prev,
    &.slick-next {
      width: 68px;
      height: 68px;
    }

    &.slick-prev {
      background-image: url(${arrowPrev});
      left: -67px;

      &:hover {
        background-image: url(${arrowPrev});
      }
      @media (max-width: 1300px) {
        left: 15px;
      }
    }

    &.slick-next {
      background-image: url(${arrowNext});
      right: -67px;

      &:hover {
        background-image: url(${arrowNext});
      }
      @media (max-width: 1300px) {
        right: 15px;
      }
    }

    &:focus {
      outline: none;
    }
  }

  .slick-dots {
    list-style: none;
    padding: 0;
    margin: 14px 0 18px;
    display: flex !important;
    justify-content: center;
    position: relative;
    bottom: 0;

    li {
      margin: 0 5px;
      font-size: 0;
      width: 8px !important;
      height: 8px !important;

      button {
        font-size: 0;
        width: 8px !important;
        height: 8px !important;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 4px;
        border: none;
        padding: 0;
        cursor: pointer;

        &:before {
          display: none;
        }
      }

      &.slick-active {
        button {
          background-color: #fff;
        }
      }

      &:not(.slick-active) {
        button {
          background-color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
`;

const Self = styled.div`
  overflow: hidden;
`;


const View = (props) => {
  let history = useHistory();
  const [slideIndex, setSlideIndex] = useState(0);
  const [curriculum, setCurriculum] = useState([]);
  const [session, setSession] = useState({});


  const [isMobile, setIsMobile] = useState(window.innerWidth < 1169);

  useEffect(() => {
    init();
    showIntroPopup();
  }, []);

  const init = async () => {
    const learnsResult  = await getLearn()
    setCurriculum(learnsResult.body.curriculum);
    setSession(learnsResult.body.session);
    console.log("learnsResult body!!!!!!!!!!!!!!",learnsResult.body)
  };

  const showIntroPopup = useCallback(
    () => {
      const didIntroPopup = localStorage.getItem("didIntroPopup");

      if (!didIntroPopup) {
        Popup.showPopUp(<IntroPopup history={history} iconUpdateCallback={props.updateIconCallbak}/>, {
          dismissButton: false,
          defaultPadding: false,
          darkmode: true,
          mobileFullscreen: true,
        });
      }
    },
    [IntroPopup, Popup.showPopUp]
  );

  const resize = () => {
    setIsMobile(window.innerWidth < 1169 ? true : false)
  }

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  })
  
  const onWindowFocus = useCallback(init, []);
  useEffect(() => {
    window.addEventListener("focus", onWindowFocus);
    return () => {
      window.removeEventListener("focus", onWindowFocus);
    }
  }, [onWindowFocus]);

  return (
    <Layout isHome={true}>
      <Global styles={GlobalStyle} />
      {
        curriculum.length > 0 && session &&
          <Self>
          <MyProjectBanner curriculum={curriculum} session={session} slideIndex={slideIndex} setSlideIndex={setSlideIndex}/>
          { session.isLogin && <AllProjectList curriculum={curriculum} session={session} slideIndex={slideIndex}/>}
        </Self>
      }
    </Layout>
  );
};

export default View;
