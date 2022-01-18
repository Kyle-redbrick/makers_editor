import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Common/Component/Layout";
import clearImg from "../../Image/group@2x.png";
import img1 from "../../Image/bitmap-2@2x.png";
import img2 from "../../Image/bitmap-copy-3@2x.png";
import img3 from "../../Image/bitmap-copy-4@2x.png";
import bottomBanner from "../../Image/learn_bottom_banner.png";
import { RESOURCE } from "../../Common/Util/Constant";
import downloadImg from "../../Image/download.svg";
import "./index.scss";

export default function View(props) {
  const { intl, beginner, intermediate, advanced } = props;
  const items = [
    {
      img: img1,
      level: "초급",
      title: "탐정 사무소를 \n탈출하라!",
      link: "learn/beginner",
      isCompleted: beginner === 10
    },
    {
      img: img2,
      level: "중급",
      title: "‘몬텐노’의 \n금고를 열어라!",
      link: "learn/intermediate",
      isCompleted: intermediate === 10
    },
    {
      img: img3,
      level: "고급",
      title: "로봇 실험실을 \n탈출하라!",
      link: "learn/advanced",
      isCompleted: advanced === 10
    }
  ];
  return (
    <Layout>
      <div className="Page--Learn">
        <div className="Learn__inner">
          <div className="Learn__top">
            <div className="Learn__title">
              {intl.formatMessage({ id: "ID_LEARN_TITLE" })}
            </div>
            <div className="Learn__desc">
              {intl.formatMessage({ id: "ID_LEARN_TITLE_DESC" })}
            </div>
          </div>
          <div className="section section--mission">
            <div className="section--mission--subtitle">
              <div className="download__container">
                <a
                  className="download"
                  href={RESOURCE.OCP_LEARNINGTOOL}
                  download
                >
                  수업 지원도구
                  <img src={downloadImg} alt="download" />
                </a>
              </div>
            </div>

            <div className="mission__container">
              {items.map((i, index) => {
                return (
                  <div className="mission__item" key={index}>
                    {i.isCompleted && (
                      <img
                        className="mission__clear"
                        src={clearImg}
                        alt="clear"
                      />
                    )}
                    <img className="img" src={i.img} alt="bg" />
                    <div className="item__bottom">
                      <div className="bottom--text">
                        <div className="bottom--text--level">{i.level}</div>
                        <div className="bottom--text--title">{i.title}</div>
                      </div>
                      <div className="bottom--link">
                        <Link className="link--url" to={`/${i.link}`}>
                          도전하기
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Learn_banner">
            <Link to="/wizapps/challengeRank/20">
              <img src={bottomBanner} alt="bottom banner" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
