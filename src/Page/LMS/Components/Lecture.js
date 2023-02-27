import React, { memo, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";
import { URL } from "../../../Common/Util/Constant";
import Button, { LinkButton as OrigLinkButton } from "./Button";
import ProjectComponent from "./Project";
import { showPopUp } from "../../../Common/Component/PopUp";
import CertificateForm from "../PopUp/CertificateForm";
import Print from "../../../Common/Component/OCPCertification";

import { COLOR } from "../Constants";
import { IMAGE } from "../Constants/Images";
import ThumbnailLock from "../../../Image/my-lecture-lock.svg";
import * as request from "../../../Common/Util/HTTPRequest";

const Self = styled.div`
  border-radius: 16px;
  background-color: #1c1c1c;
`;

const Header = styled.div`
  padding: 10px 20px 10px 10px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1169px) {
    position: relative;
    flex-direction: column;
    padding: 0;
  }
`;

const Thumbnail = styled.div`
  width: 160px;
  height: 90px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.image});
  border-radius: 8px;
  margin-right: 20px;
  position: relative;

  &.lock {
    &::before {
      content: "";
      display: block;
      top: 0;
      width: 100%;
      bottom: 0;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url(${ThumbnailLock});
      z-index: 10;
      height: 100%;
    }
  }

  @media screen and (max-width: 1169px) {
    width: 100%;
    height: 49.72vw;
    margin-right: 0;
    border-radius: 16px 16px 0 0;
  }
`;

const TitleWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  margin-bottom: 15px;

  @media screen and (max-width: 1169px) {
    width: 80vw;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-top: 15px;
    text-align: center;
  }
`;

const ProgressWrap = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1169px) {
    width: 80vw;
    margin-bottom: 15px;
    justify-content: space-between;
  }
`;

const Progress = styled.div`
  width: 240px;
  height: 10px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.1);

  @media screen and (max-width: 1169px) {
    width: calc(100% - 55px);
  }
`;

const ProgressBar = styled.div`
  width: ${(props) => props.value}%;
  height: 10px;
  border-radius: 3px;
  background-color: ${COLOR.MINT};
`;

const ProgressText = styled.div`
  font-size: 16px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 10px;

  @media screen and (max-width: 1169px) {
    text-align: center;
  }
`;

const ButtonWrap = styled.div`
  display: flex;

  @media screen and (max-width: 1169px) {
    width: 80vw;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }
`;

const LinkButton = styled(OrigLinkButton)`
  margin-left: 10px;
  background-color: #353535;
  width: fit-content;

  @media screen and (max-width: 1169px) {
    width: calc(80vw - 10px - 44px);
    margin-left: 0;
  }
`;

const Dropdown = styled(Button)`
  margin-left: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
`;

const DropdownIcon = styled.img``;

const Projects = styled.div`
  position: relative;
  background-color: #242424;
  border-radius: 0 0 16px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  animation: showProjectList 0.5s ease forwards;

  @keyframes showProjectList {
    0% {
      opacity: 0;
      top: -5px;
    }
    100% {
      opacity: 1;
      top: 0px;
    }
  }

  @media screen and (max-width: 1169px) {
    padding-left: 0;
  }
`;

const CertButton = styled.button`
  height: 40px;
  padding-right: 14px;
  padding-left: 14px;
  font-size: 16px;
  color: #ffa944;
  background-color: #383838;
  border: 1px solid #ffa944;
  border-radius: 10px;

  @media screen and (max-width: 1169px) {
    width: calc(80vw);
    margin-left: 0;
  }
`;

const Lecture = memo(({ course, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClickToggle = useCallback(() => {
    setShow(!show);
  }, [show]);

  const onclickCertBtn = async (course) => {
    const certData = await request.getCertificateInfo(course.id);

    if (certData) {
      showPopUp(
        <Print
          course={course}
          name={certData.userName}
          class={certData.userClass}
          // updateCourses={props.userClass}
        />,
        {
          dismissButton: true,
          defaultPadding: false,
        },
        { isBackTrans: true }
      );
    } else {
      showPopUp(<CertificateForm course={course} />, {
        dismissButton: false,
        defaultPadding: false,
      });
    }
  };

  return (
    <Self>
      <Header>
        <Thumbnail
          className={!course.course.unlocked && "lock"}
          image={URL.S3_DREAMCLASS + course.course.smallPosterURL}
        />
        <TitleWrap>
          <Title>{course.course.title}</Title>
          <ProgressWrap>
            <Progress>
              <ProgressBar
                value={
                  (course.course.progress.completed /
                    course.course.progress.net) *
                  100
                }
              />
            </Progress>
            <ProgressText>
              {parseInt(
                (course.course.progress.completed /
                  course.course.progress.net) *
                  100
              )}
              %
            </ProgressText>
          </ProgressWrap>
        </TitleWrap>

        <ButtonWrap>
          {course.course.certificate && (
            <CertButton onClick={() => onclickCertBtn(course.course)}>
              <FormattedMessage id="ID_DASHBOARD_GET_CERTIFICATION" />
            </CertButton>
          )}
        </ButtonWrap>

        <ButtonWrap>
          <LinkButton to={`/course/${course.course.lectureId}`}>
            <FormattedMessage id="ID_LMS_GO" />
          </LinkButton>

          <Dropdown type="button" onClick={handleClickToggle}>
            <DropdownIcon
              alt="프로젝트 펼쳐보기"
              src={show ? IMAGE.ARROW_UP : IMAGE.ARROW_DOWN}
            />
          </Dropdown>
        </ButtonWrap>
      </Header>

      {show && (
        <Projects>
          {course.projects.map((project, index) => (
            <ProjectComponent key={index} project={project} />
          ))}
        </Projects>
      )}
    </Self>
  );
});

export default Lecture;
