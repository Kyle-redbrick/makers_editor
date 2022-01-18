import React from "react";
import MyCodingStyle from "../MyCodingStyle";
import "./index.scss";
import Layout from "../../Common/Component/Layout";
import OCPGameDetail from "./Components/OCPGameDetail";

export default function(props) {
  let {
    count,
    selectedGame,
    handleGameType,
    gameInfo,
    onClickTry,
    selectedMission,
    isShowGameDetail,
    handleGameDetailBack,
    events,
    onClickEvent,
    onFocusForRefreshGameDetail
  } = props;

  const progressBarIndex =
    selectedGame === "block" ? 0 : selectedGame === "game" ? 1 : 2;

  const getGradeText = grade => {
    return grade === "beginner"
      ? "초급"
      : grade === "intermediate"
      ? "중급"
      : "고급";
  };

  const getSelectorItemWidth = () => {
    const selector = document.getElementById("selector_selectItems");
    const selectorItem = document.getElementById("selector_si_item");
    if (!selectorItem) return null;

    const selectorComputedStyleWidth = window.getComputedStyle(selector).width;
    const selectorItemComputedStyleWidth = window.getComputedStyle(selectorItem)
      .width;
    const selectorWidth = Number(
      selectorComputedStyleWidth.slice(0, selectorComputedStyleWidth.length - 2)
    );
    const selectorItemWidth = Number(
      selectorItemComputedStyleWidth.slice(
        0,
        selectorItemComputedStyleWidth.length - 2
      )
    );

    const selectorItemInterval = (selectorWidth - selectorItemWidth * 3) / 4;
    return {
      selectorItemInterval,
      selectorItemWidth
    };
  };

  return (
    <Layout>
      <div className="Page--OCP2">
        {gameInfo && (
          <OCPGameDetail
            isShowGameDetail={isShowGameDetail}
            selectedMission={selectedMission}
            handleGameDetailBack={handleGameDetailBack}
            onFocusForRefreshGameDetail={onFocusForRefreshGameDetail}
          />
        )}
        <div className="section_selector">
          <div className="selector_inner">
            <div id="selector_selectItems" className="selector_selectItems">
              {Object.keys(gameInfo).map((gameKey, index) => {
                const game = gameInfo[gameKey];
                return (
                  <div
                    key={`selector_si_item-${index}`}
                    id="selector_si_item"
                    onClick={() => handleGameType(gameKey)}
                    className={`selector_si_item ${selectedGame === gameKey &&
                      "selector_si_item-selected"} selector_si_item-${index}`}
                    style={
                      index === 2
                        ? { marginRight: "0px", marginBottom: "0px" }
                        : {}
                    }
                  >
                    <img src={game.icon} alt="selector_si_item-img" />
                    <div className="selector_si_item-title">{game.title}</div>
                    <div className="selector_si_item-mode">
                      {`${gameKey === "block" ? "블록" : "텍스트"}`}
                    </div>
                  </div>
                );
              })}

              <div className="selector_si_progress">
                <div
                  className="selector_si_pg-bar"
                  style={
                    getSelectorItemWidth() && {
                      transform: `translateX(${(progressBarIndex + 1) *
                        getSelectorItemWidth().selectorItemInterval +
                        progressBarIndex *
                          getSelectorItemWidth().selectorItemWidth}px)`,
                      width: `${getSelectorItemWidth().selectorItemWidth}px`
                    }
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="section_banner">
          <img
            className="banner__img"
            src={gameInfo[selectedGame].bannerPC}
            alt="banner"
          />
          <div className="banner_inner">
            <img
              className="banner__img-mobile"
              src={gameInfo[selectedGame].bannerMobile}
              alt="banner"
            />
            <img
              className="banner-fontPC"
              src={gameInfo[selectedGame].fontImg}
              alt="fontImg"
            />
            <img
              className="banner-fontMobile"
              src={gameInfo[selectedGame].fontImgMobile}
              alt="fontImg"
            />
            {count && (
              <div className="banner_countwrap">
                <div className="banner_cw-count">{`도전 ${count[selectedGame].total}명`}</div>
                <div className="banner_cw-count">{`성공 ${count[selectedGame].success}명`}</div>
              </div>
            )}
          </div>
        </div>
        <div className="section_main">
          {gameInfo && count && (
            <div className="main_inner">
              <div className="main_bottom">
                {gameInfo &&
                  Object.keys(gameInfo[selectedGame].itemInfo).map(
                    (grade, index) => {
                      const mission = gameInfo[selectedGame].itemInfo[grade];
                      return (
                        <div
                          id={`main_bottom_item-${selectedGame}-${grade}`}
                          className={`main_bottom_item main_bottom_item-${selectedGame}-${grade}`}
                          onClick={() => {
                            onClickTry(mission, grade);
                          }}
                          key={index}
                        >
                          <div className="main_bottom_item-grade">
                            {getGradeText(grade)}
                          </div>
                          <img src={mission.thumbnail} alt="bg" />
                          <div className="main_bottom_item-title">
                            {mission.title}
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          )}
        </div>
        <div className="section_codingparty_event">
          <div className="event_inner">
            <div className="event_top">
              <div className="event_top-title">코딩파티 기념 이벤트</div>
              <div className="event_top-subtitle">{`코딩도 즐기고, 선물도 받고!
온라인 코딩파티를 더 풍성하게 할 다양한 이벤트가 준비되어 있어요.`}</div>
            </div>
            <div className="event_bottom">
              <div
                onClick={() => {
                  onClickEvent(events[0]);
                }}
                className="event_bottom-mainBanner"
              >
                <img src={events[0].img} alt="img" />
              </div>
              <div className="event_bottom_subBanners">
                {events.slice(1).map((event, index) => (
                  <div
                    onClick={() => {
                      onClickEvent(event);
                    }}
                    key={index}
                    className="event_bottom_item"
                  >
                    <img src={event.img} alt="eventimg" />
                  </div>
                ))}
              </div>
            </div>
            <div className="event_bottom_mobile">
              {events.map((event, index) => (
                <div
                  key={`event_bottom_mobile-${index}`}
                  onClick={() => {
                    onClickEvent(event);
                  }}
                  className="event_bt_m_item"
                >
                  <img src={event.mobileImg} alt="img" />
                  <div className="event_bt_m_item_dsc">
                    <div className="event_bt_m_item_dsc-title">
                      {event.title}
                    </div>
                    <div className="event_bt_m_item_dsc-date">{`${event.date}`}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="section_wizlive_event">
          <div id="wizliveEvent" className="wizliveEvent">
            <div className="wizliveEvent_title">나는 어떤 개발자 일까?</div>
            <div className="wizliveEvent_subtitle">
              심리테스트로 내 코딩 스타일을 알아보세요! 게임 코딩 배우기 체험을
              완료하시면, 아이패드를 드리는 이벤트도 참여해보세요.
            </div>
            <div className="wizliveEvent_myCodingStyleTest">
              <MyCodingStyle />
            </div>
            <div className="wizliveEvent_warnings">
              <div className="wizliveEvent_warnings_title">이벤트 유의사항</div>
              {[
                "11월 이내 무료체험 완료자에 한하여 이벤트 참여가 가능합니다.",
                "아이패드 경품에 대한 제세공과금은 당첨자 본인 부담입니다.",
                "기프트콘은 위즈랩에 등록된 휴대폰 정보를 기반으로 발송 처리되므로, 고객 정보 수정이 필요한 경우에는 행사 기간 내 정보 수정을 완료하셔야 합니다.",
                "당첨자에게는 개별 연락이 진행되며 상품 수령을 위한 추가적인 개인 정보를 요청할 수 있습니다.",
                "당사 사정에 따라 이벤트 일정 및 내용이 고지 없이 변경될 수 있습니다."
              ].map((warning, index) => (
                <div key={index} className="wizliveEvent_warning">
                  {`- ${warning}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
