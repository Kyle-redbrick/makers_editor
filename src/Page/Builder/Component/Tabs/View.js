import React from "react";
import { injectIntl } from "react-intl";
import apiIcon from "../../../../Image/builder/student-status-api-window-open.svg";
import playOffIcon from "../../../../Image/builder/student-status-play-off.svg";
import playOnIcon from "../../../../Image/builder/student-status-play-on.svg";
import propertyOffIcon from "../../../../Image/builder/student-status-property-closed.svg";
import propertyOnIcon from "../../../../Image/builder/student-status-property-open.svg";
import soundOffIcon from "../../../../Image/builder/student-status-sound-sprite-window-closed.svg";
import soundOnIcon from "../../../../Image/builder/student-status-sound-sprite-window-open.svg";
import spriteIcon from "../../../../Image/builder/student-status-sprite-window-open.svg";
import "./index.scss";

function View(props) {
  const {
    intl: { formatMessage },
    isMonitor,
    selectedTab,
    handleSelectTab,
    tabs,
    isTutor,
    tutorEmail
    // log,
    // senderEmail
  } = props;

  const handleSelectedSpriteId = str => {
    if (!str) return;

    // character(전체) -> CHARACTER
    if (str.includes("전체")) {
      return str.replace(/^(\w+)\((\W+)\)$/, "ID_$1").toUpperCase();
      // character(character_wizmate) -> CHARACTER_WIZMATE
    } else {
      return str.replace(/^(\w+)\((\w+)\)$/, "ID_$2").toUpperCase();
    }
  };

  return (
    <div className="HeaderTabs" style={{ height: isTutor ? "88px" : "" }}>
      {tabs
        .filter(t => {
          if (isMonitor && t.pId === undefined) {
            return false;
          }
          return true;
        })
        .map(({ email, pId, name, num, log }, idx) => {
          const value = { email, pId, tabNum: idx };
          // 튜터 화면
          if (isTutor) {
            // 튜터 탭
            if (email === tutorEmail) {
              return (
                <div
                  className={`HeaderTab TutorTab ${+selectedTab === idx ? "active" : ""}`}
                  key={idx}
                  data-value={JSON.stringify(value)}
                  onClick={e =>
                    handleSelectTab(JSON.parse(e.target.dataset.value))
                  }
                  style={{ height: "88px" }}
                >
                  <div className="HeaderTab__items">
                    <div
                      className="HeaderTab__item"
                      style={{ height: "44px", justifyContent: "flex-start" }}
                    >
                      <span
                        className={`HeaderTab__num HeaderTab__num${num}${+selectedTab === idx ? "--active" : ""}`}
                      >
                        {num}
                      </span>
                      <span className="HeaderTab__name">{name}</span>
                    </div>
                    <div
                      className="HeaderTab__item"
                      style={{ height: "44px" }}
                    ></div>
                  </div>
                </div>
              );
              // 학생 탭
            } else {
              const {
                api,
                game,
                property,
                selectedApi,
                selectedSprite,
                // sound,
                soundBox,
                spriteBox
              } = log !== undefined && log;

              return (
                <div
                  className={`HeaderTab TutorTab ${+selectedTab === idx ? "active" : ""}`}
                  key={idx}
                  data-value={JSON.stringify(value)}
                  onClick={e =>
                    handleSelectTab(JSON.parse(e.target.dataset.value))
                  }
                  style={{ height: isTutor ? "88px" : "" }}
                >
                  <div className="HeaderTab__items">
                    <div className="HeaderTab__item">
                      <div>
                        <span className={`HeaderTab__num HeaderTab__num${num}${+selectedTab === idx ? "--active" : ""}`}
                        >
                          {num}
                        </span>
                        <span className="HeaderTab__name">{name}</span>
                      </div>
                      <div className="HeaderTab__icons">
                        {/* 사운드 */}
                        <img
                          src={soundBox ? soundOnIcon : soundOffIcon}
                          alt="sound"
                        />
                        {/* 프로펄티 */}
                        <img
                          src={property ? propertyOnIcon : propertyOffIcon}
                          alt="property"
                        />
                        {/* 플레이 */}
                        <img
                          src={game ? playOnIcon : playOffIcon}
                          alt="sound"
                        />
                      </div>
                    </div>
                    <div className="HeaderTab__item">
                      {/* 스트라이프 */}
                      <span
                        className="HeaderTab__icon"
                        style={{
                          backgroundColor: spriteBox ? "#1db6ff" : ""
                        }}
                      >
                        <img src={spriteIcon} alt="sprite" />
                        <span >
                          {selectedSprite
                            ? formatMessage({
                              id: handleSelectedSpriteId(selectedSprite)
                            })
                            : "캐릭터"}
                        </span>
                      </span>
                      {/* API */}
                      <span
                        className="HeaderTab__icon"
                        style={{
                          backgroundColor: api ? "#1db6ff" : ""
                        }}
                      >
                        <img src={apiIcon} alt="api" />
                        <span>
                          {selectedApi
                            ? formatMessage({ id: selectedApi })
                            : "API"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            // 학생 화면
          } else {
            return (
              <div
                className={`HeaderTab ${+selectedTab === idx ? "active" : ""}`}
                key={idx}
                data-value={JSON.stringify(value)}
                onClick={e =>
                  handleSelectTab(JSON.parse(e.target.dataset.value))
                }
              >
                <span
                  className={`HeaderTab__num HeaderTab__num${num}${+selectedTab === idx ? "--active" : ""}`}
                >
                  {num}
                </span>
                <p className="HeaderTab__name">{name}</p>
              </div>
            );
          }
        })}
    </div>
  );
}

export default injectIntl(View);
