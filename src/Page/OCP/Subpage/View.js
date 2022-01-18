import React from "react";
import { WIZLIVE_BANNER_LINK } from "../../../Common/Util/Constant";
import Layout from "../../../Common/Component/Layout";
import clearImg from "../../../Image/clear@2x.png";
import startImg from "../../../Image/start@2x.png";
import liveEvtImg from "../../../Image/wizlive_banner02.png";
// import printImg from "../../../Image/cert_download.png";
// import resetImg from "../../../Image/ocp_reset.png";

import "./index.scss";

export default function View(props) {
  const {
    OCP,
    onClickItem,
    info,
    myLevel,
    // handleCertification,
    // handleReset,
    userId
  } = props;

  return (
    <Layout>
      <div className="Page--OCPSubPage">
        <div className="OCPSubPage__inner">
          <div className="Learn__top">
            <div className="Learn__level">{info && info.level}</div>
            <div className="Learn__title">
              {info && <img src={info.thumb} alt="thumb" />}
            </div>
            <div className="Learn__desc">
              {info && <img src={info.desc} alt="desc" />}
            </div>
          </div>
          <div className="OCPSub_Game">
            <div className="OCPSub_Game_Inner">
              <iframe
                className="OCPSub_Game_IFrame"
                title="wizlab"
                src={info && info.game}
                scrolling="no"
                frameBorder="0"
              />
            </div>
          </div>

          {/* {myLevel === 10 && ( */}
          {/* <div className="print__warpper">
            <span>소요시간 - 약 10~20분</span>
            <div className="print_wrapper_right">
              <div
                className="print__warpper_print"
                onClick={handleCertification}
              >
                인증서 다운로드
                <img className="printBtn" src={printImg} alt="print" />
              </div>
              {!userId && (
                <div className="print__warpper_print" onClick={handleReset}>
                  새로 시작하기
                  <img className="printBtn" src={resetImg} alt="print" />
                </div>
              )}
            </div>
          </div> */}
          {/* )} */}

          <div className="stageBox__container">
            <div className="stageBox__container__inner">
              {OCP.map((item, index) => {
                return (
                  <div className="stageBox__wrapper" key={index}>
                    <div className="img__wrapper">
                      <img
                        alt="stage"
                        className={`stageBox  img${item.level}`}
                        onClick={() => onClickItem(item.level)}
                        src={item.img}
                      />
                      {item.level === 1 && myLevel < 1 && (
                        <div className="clearImg__wrapper">
                          <img
                            src={startImg}
                            className="clearImg"
                            alt="img"
                            onClick={() => onClickItem(item.level)}
                          />
                        </div>
                      )}
                      {item.level <= myLevel && (
                        <div className="clearImg__wrapper">
                          <img
                            src={clearImg}
                            className="clearImg"
                            alt="img"
                            onClick={() => onClickItem(item.level)}
                          />
                        </div>
                      )}
                    </div>
                    <h5 className="stageBox__index">{item.level}단계</h5>
                    <h3 className="stageBox__title">
                      {item.title.split(". ")[1]}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="wizlive_banner">
            <a
              href={WIZLIVE_BANNER_LINK(userId)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={liveEvtImg} alt="live banner" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
