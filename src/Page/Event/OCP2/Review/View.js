import React from "react";
import Layout from "../../../../Common/Component/Layout";
import reviewImg from "../Assets/review-page.png";
import reviewMobileImg from "../Assets/review-page-mobile.png";
import "./index.scss";

export default function View(props) {
  const { onClickTry, gameInfo } = props;

  const isMobile = window.innerWidth < 1080;
  return (
    <Layout>
      <div className="Page--OCPEventReview">
        <div className="OCPEventReview_Inner">
          <img src={isMobile ? reviewMobileImg : reviewImg} alt="img" />
          {Object.keys(gameInfo).map(gameKey => {
            const missionInfo = gameInfo[gameKey].itemInfo;
            return Object.keys(missionInfo).map((gradeKey, index) => {
              const mission = missionInfo[gradeKey];
              let buttonType = "try";
              if (mission.isComment) {
                buttonType = "complete";
              } else {
                if (mission.level) {
                  if (mission.level === 10) {
                    buttonType = "review";
                  }
                }
              }

              let GAME_INTERVAL_UNIT = 10.55;
              let GRADE_INTERVAL_UNIT = 2.73;
              let TOP_UNIT =
                42.22 +
                GAME_INTERVAL_UNIT *
                  (gameKey === "escape" ? 0 : gameKey === "block" ? 1 : 2);

              const getTopStyle = topUnit => {
                return `${topUnit +
                  GRADE_INTERVAL_UNIT *
                    (gradeKey === "beginner"
                      ? 0
                      : gradeKey === "intermediate"
                      ? 1
                      : 2)}%`;
              };
              let mobileStyle = {};
              mobileStyle["top"] = getTopStyle(TOP_UNIT);

              return (
                <div
                  key={index}
                  className={`OCPEventReview-tryBtn btn-${gameKey} btn-${gradeKey} btn-${buttonType}`}
                  onClick={() => {
                    if (buttonType === "complete") return;

                    onClickTry(gameKey, gradeKey);
                  }}
                  style={isMobile ? mobileStyle : {}}
                >
                  {buttonType === "try"
                    ? "도전하기"
                    : buttonType === "complete"
                    ? "완료"
                    : "후기 작성"}
                </div>
              );
            });
          })}
        </div>
      </div>
    </Layout>
  );
}
