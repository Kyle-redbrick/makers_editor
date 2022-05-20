import React from "react";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { postMyDreamProject } from "../../Util/HTTPRequest"
import * as Popup from "../PopUp";
import IntroPopup from "../../../Page/CourseDetail/Components/IntroPopup";
import AlertPopup from "../../../Page/CourseDetail/Components/AlertPopup";
import LoginAlertPopup from "../PopUp/LoginAlertPopup";
import { isMobileOnly } from "react-device-detect";
import { FormattedMessage } from "react-intl";
import ImgBtnLock from "../../../Image/my-lecture-btn-lock.svg";


const Self = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.2;
  letter-spacing: 0.38px;
  color: #fff;
  background-color: ${(props) => (props.completed ? "#5b5b5b" : "#ff6f44")};
  font-family: "Noto Sans KR", sans-serif;

  cursor: pointer;


  ${(props) => props.learnWidth &&
    `
    width:100%;
    height:46px;
    `
  }

  ${(props) => props.lock &&
    `
    pointer-events: none;
    &::after {
      content: '';
      display:block;
      background-repeat:no-repeat;
      background-size:cover;
      background-position:center;
      background-image:url(${ImgBtnLock});
      position:absolute;
      width:100%;
      height:100%;
      top:0;
      bottom:0;
      z-index:10;
      left:0;
    }
    `
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1169px) {
    width: 88.33vw;
    height: 50px;
    font-size: 16px;
    font-weight: 500;

    ${(props) => props.fixed &&
    `
    padding: 0;
    box-sizing: border-box;
    width: 26.94vw;
    height: 30px;
    border-radius: 17px;
    font-size: 12px;
    text-align: center;
    `
  }

    ${(props) => props.title && `
      width: calc(50% - 5px);
      height: 40px;
    `}

    ${(props) => props.lmsButton && `
      width: 50%;
      height: 40px;

      ${(props) =>
      props.completed && `background-color: #5b5b5b;`}
    `}
  }
`;

const getRedirectURLOf = myDreamProject => {
  try {
    const { type } = myDreamProject.project.lecture.course;
    if (type === "python") {
      return `/pythonPage/${myDreamProject.id}`;
    } else {
      return `/dreamclass/${myDreamProject.id + "/" + myDreamProject.email}`;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const Learn = ({ id: projectId, isShowVideo,videoURL, lectureId, title, fixed, ...props }) => {

  const handleClick = useCallback(
    () => {

      // if(isShowVideo){
      //   Popup.showPopUp(<IntroPopup btnAction={onClickSkipBtn} url={videoURL} />, {
      //     dismissButton: false,
      //     defaultPadding: false,
      //     darkmode: true,
      //     mobileFullscreen: true,
      //   });
      // }else{
      //   onClickSkipBtn()
      // }
      onClickSkipBtn()
    },
    [projectId]
  );


  const onClickSkipBtn = ()=>{
    postMyDreamProject({ projectId })
    .then(res => res.json())
    .then(myDreamProject => {
      const redirectURL = getRedirectURLOf(myDreamProject);
      if (redirectURL) {
        const didIntroPopup = localStorage.getItem(`didIntroPopup_${myDreamProject.project.lecture.course.type}`);
  
        if (isMobileOnly) {
          return Popup.showPopUp(<AlertPopup />, {
            defaultPadding: false,
            dismissButton: false,
          });
        }

        if(isShowVideo){
          Popup.showPopUp(<IntroPopup redirectURL={redirectURL} url={videoURL} />, {
            dismissButton: false,
            defaultPadding: false,
            darkmode: true,
            mobileFullscreen: true,
          });
        }else{
          window.open(redirectURL, "_blank");
        }



        //window.open(redirectURL, "_blank");
        // if (!didIntroPopup) {
        //   Popup.showPopUp(<IntroPopup id={lectureId} url={redirectURL} type={myDreamProject.project.lecture.course.type}/>, {
        //     dismissButton: false,
        //     dismissOverlay: true,
        //     defaultPadding: false,
        //     darkmode: true,
        //     mobileFullscreen: true,
        //     overflow: true,
        //   });
        // } else {
        //   window.open(redirectURL, "_blank");
        // }
      }
      // else {
      //   Popup.showPopUp(<LoginAlertPopup />, {
      //     defaultPadding: false,
      //     dismissButton: false,
      //   });
      // }
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <Self onClick={handleClick} type="button" fixed={fixed} title={title} {...props}>
      {title}
    </Self>
  );
};

export const LearnAgain = ({ ...props }) => {
  return <Learn title={<FormattedMessage id="ID_LEAEN_BUTTON_LEARN_AGAIN" />} {...props} />
};

export const LearnNow = ({ ...props }) => {
  return <Learn title={<FormattedMessage id="ID_LEAEN_BUTTON_LEARN_NOW" />} {...props} />
};

export const LearnContinue = ({ ...props }) => {
  return <Learn title={<FormattedMessage id="ID_LEAEN_BUTTON_LEARN_CONTINUE" />} {...props} />
};
