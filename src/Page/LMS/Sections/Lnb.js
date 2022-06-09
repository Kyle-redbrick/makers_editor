import React, { memo } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";
import { showPopUp } from "../../../Common/Component/PopUp"
import CertificateForm from "../PopUp/CertificateForm";
import { IMAGE } from "./../Constants/Images";
import { COLOR, PAGE, renderCurrentPage } from "./../Constants";
import iconMissionOff from "../../../Image/lms/icon_mission progress_inactivate.svg";
import iconMissionOn from "../../../Image/lms/icon_mission_activate.svg";
import iconAttOff from "../../../Image/lms/icon_attendance_inactivate.svg";
import iconAttOn from "../../../Image/lms/icon_attendance_activate.svg";


const Self = styled.div`
  flex: 0 0 23%;

  @media screen and (max-width: 1169px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 70px;
  }
`;

const Br = styled.div`
  height: 1px;
  margin: 3px 10px 2px;
  background-color: rgba(255, 255, 255, 0.1);

  @media screen and (max-width: 1169px) {
    width: 100vw;
    margin: 0;
    height: 0;
  }
`

const Icon = styled.img`
  width: 33px;
  height: 33px;
  margin-right: 7px;

  @media screen and (max-width: 1169px) {
    margin-left: 21px;
  }
`

const Item = styled.div`
  padding: 0 10px;
  display: flex;
  font-size: 18px;
  line-height: 1.22;
  color: #fff;
  height: 52px;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;

  ${(props) => props.active && `
    color: ${COLOR.ORANGE};
  `}

  @media screen and (max-width: 1169px) {
    padding: 0;
    border-radius: 0;
  }
`

const Group = styled.div`
  padding: 10px 0;
  ${(props) => props.height && `min-height: ${props.height}px`};

  @media screen and (max-width: 1169px) {
    padding: 0;
  }
`

const LnbLink = styled(Link)`
  text-decoration: none;
`

const LnbWrap = styled.div`
  position: relative;
  border-radius: 16px;
  background-color: #1c1c1c;
  padding: 10px;

  @media screen and (max-width: 1169px) {
    position: absolute;
    background-color: #181818;
    border-radius: 10px;
    padding: 0;
    box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.5);
    z-index: 10;
    width: 88.33vw;
    overflow: hidden;
    left: 50%;
    transform: translateX(-50%);

    ${(props) => props.isMobile && `
      &::before {
        content: '';
        position: absolute;
        top: 15px;
        right: 21px;
        width: 20px;
        height: 20px;
        background: url(${IMAGE.ICON_DROPDOWN});
        pointer-events: none;
      }
    `
  }

    ${(props) => props.isLmsMobileMenuOn && `
      &::before {
        transform: rotate(180deg);
      }
    `}

    ${(props) => props.fixed && `
      position: fixed;
      top: 0;
      left: 50%;

      heigth: 50px;
      transform: translateX(-50%);
    `
  }
  }

`

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  line-height: 1.33;
  color: #fff;
  padding: 10px;

  @media screen and (max-width: 1169px) {
    display: none;
  }
`
const CertWrap = styled.div`
  position: relative;
  margin-top: 16px;

  @media screen and (max-width: 1169px) {
    position: absolute;
    background-color: #181818;
    border-radius: 10px;
    padding: 0;
    box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.5);
    z-index: 10;
    width: 88.33vw;
    overflow: hidden;
    left: 50%;
    transform: translateX(-50%);

    ${(props) => props.isMobile && `
      &::before {
        content: '';
        position: absolute;
        top: 15px;
        right: 21px;
        width: 20px;
        height: 20px;
        background: url(${IMAGE.ICON_DROPDOWN});
        pointer-events: none;
      }
    `
  }

    ${(props) => props.isLmsMobileMenuOn && `
      &::before {
        transform: rotate(180deg);
      }
    `}

    ${(props) => props.fixed && `
      position: fixed;
      top: 0;
      left: 50%;

      heigth: 50px;
      transform: translateX(-50%);
    `
  }
  }
`

const CertContainer = styled.div`
  position: relative;
  width: 270px;
  height: 68px;
  margin-top: 14px;
  border-radius: 16px;
  background: #333333;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`
const CertIcon = styled.img`
  position: relative; 
  left: 18px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`
const CatIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
`
const CertGrade = styled.div`
  position: absolute;
  left:56px;
  top:11px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.5);
`

const CertDesc = styled.div`
  position: absolute;
  left:56px;
  bottom:12px;
  font-family: Noto Sans KR;
  font-size: 14px;
  line-height: 22px;
  color: #FFFFFF;
`

const CartButton = ({ course, onclickCertBtn }) => {
  return (
    <CertContainer onClick={() => onclickCertBtn(course)}>
      <CertIcon src={IMAGE.ICON_CERT} />
      <CertGrade>{course.title}</CertGrade>
      <CertDesc>Get your certificate Now!</CertDesc>
      <CatIcon src={course.type == "javascript" ? IMAGE.ICON_CERT_JS : IMAGE.ICON_CERT_BLOCK} />
    </CertContainer>
  )
}


const LnbLinkComponent = memo(({ active, icon, link, title, isMobile, isLmsMobileMenuOn, onClickLmsMobileMenu }) => {
  if (isMobile) {
    if (!isLmsMobileMenuOn && !active) {
      return <></>;
    }
  }
  return (
    <LnbLink to={link}>
      <Item active={active} onClick={onClickLmsMobileMenu}>
        <Icon
          alt={`${title} 아이콘`}
          src={icon}
        />
        {title}
      </Item>
    </LnbLink>
  );
});

const Lnb = ({ path, fixed, isMobile, isLmsMobileMenuOn, onClickLmsMobileMenu, ...props }) => {
  let { id } = useParams();

  const onclickCertBtn = (course) => {
    showPopUp(
      <CertificateForm
        course={course}
      //updateCourses={updateCourses}
      // sdg={formData.sdg}
      // certificate={formData.certificate}
      // onClickSubmit={() => {
      //   this.alertCertificate(formData);
      // }}
      />,
      {
        dismissButton: false,
        defaultPadding: false
      }
    )
  }

  return (
    <Self {...props}>
      <LnbWrap isMobile={isMobile} fixed={fixed} isLmsMobileMenuOn={isLmsMobileMenuOn}>
        <Title><FormattedMessage id="ID_LMS_DASHBOARD" /></Title>
        <Br />
        <Group height={isMobile ? "auto" : 234}>
          <FormattedMessage id="ID_DASHBOARD_TAB_O1_MISSION_PROGRESS">
            {title => 
              <LnbLinkComponent
                active={renderCurrentPage(path) === PAGE.MISSION}
                icon={renderCurrentPage(path) === PAGE.MISSION ? iconMissionOn : iconMissionOff}
                link="/lms/mission"
                title={title}
                isMobile={isMobile}
                isLmsMobileMenuOn={isLmsMobileMenuOn}
                onClickLmsMobileMenu={onClickLmsMobileMenu}
              />
            }
          </FormattedMessage>
          {props.userinfo.userType === "S" &&
            <FormattedMessage id="ID_DASHBOARD_TAB_O2_ATTENDANCE">
              {title =>
                <LnbLinkComponent
                  active={renderCurrentPage(path) === PAGE.ATTENDANCE}
                  icon={renderCurrentPage(path) === PAGE.ATTENDANCE ? iconAttOn : iconAttOff}
                  link="/lms/attendance"
                  title={title}
                  isMobile={isMobile}
                  isLmsMobileMenuOn={isLmsMobileMenuOn}
                  onClickLmsMobileMenu={onClickLmsMobileMenu}
                />
              }
            </FormattedMessage>
          }
        </Group>
      </LnbWrap>

      {/* <CertWrap isMobile={isMobile} fixed={fixed} isLmsMobileMenuOn={isLmsMobileMenuOn}>
          {
            coursesProgress.map(
              (course) => { 
                if(course.progress == 100 && !course.certIssued){
                  return <CartButton
                    key={course.id}
                    onclickCertBtn={onclickCertBtn}
                    course={course}>
                </CartButton>
                }
              }
            )
          }

       </CertWrap> */}
    </Self>
  );
};

export default connect(
  state => ({
    userinfo: state.userinfo
  })
)(Lnb);
