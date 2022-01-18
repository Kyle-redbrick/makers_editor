import React from "react";
import { Rnd } from "react-rnd";
import { FormattedMessage } from "react-intl";

import apiIcon from "../../../../../../Image/drawer-api-icon.svg";
import aniIcon from "../../../../../../Image/drawer-ani-icon.svg";
import soundIcon from "../../../../../../Image/drawer-sound-icon.svg";
import chatIcon from "../../../../../../Image/drawer-chat-icon.svg";

import "./index.scss";

export default function(props) {
  const { rnd, log } = props;
  const { x, y, onDragStop } = rnd;
  return (
    <React.Fragment>
      <Rnd
        className="WebRTCLogRnd"
        size={{ width: 300, height: 300 }}
        position={{ x, y }}
        onDragStop={(e, d) => {
          onDragStop(e, d);
        }}
      >
        <div className="WebRTCLog">
          <div className="WebRTCLogTitle">학생 상태 보기(튜터 전용)</div>
          <div className="WizLiveLogWrapper">
            {log ? (
              <div>
                {/* drawer tabs */}
                <div className="WizLiveLogSubTitle">열려있는 탭</div>
                <div className="WizLiveLogTabs">
                  <img
                    className={`WizLiveLogTab WizLiveLogTab--${
                      log.api ? "on" : "off"
                    }`}
                    src={apiIcon}
                    alt="api"
                  />
                  <img
                    className={`WizLiveLogTab WizLiveLogTab--${
                      log.animation ? "on" : "off"
                    }`}
                    src={aniIcon}
                    alt="ani"
                  />
                  <img
                    className={`WizLiveLogTab WizLiveLogTab--${
                      log.sound ? "on" : "off"
                    }`}
                    src={soundIcon}
                    alt="sound"
                  />
                  <img
                    className={`WizLiveLogTab WizLiveLogTab--${
                      log.chatbot ? "on" : "off"
                    }`}
                    src={chatIcon}
                    alt="chat"
                  />
                </div>
                {/* game status */}
                <div className="WizLiveLogSubTitle">게임 관련 상태</div>
                <div className="WizLiveLogGames">
                  <div
                    className={`WizLiveLogGame WizLiveLogGame--${
                      log.game ? "on" : "off"
                    }`}
                  >
                    {log.game ? "게임실행" : "게임실행"}
                  </div>
                  <div
                    className={`WizLiveLogGame WizLiveLogGame--${
                      log.gameFullScreen ? "on" : "off"
                    }`}
                  >
                    {log.gameFullScreen ? "전체화면" : "전체화면"}
                  </div>
                  <div
                    className={`WizLiveLogGame WizLiveLogGame--${
                      log.publish ? "on" : "off"
                    }`}
                  >
                    {log.publish ? "퍼블리싱" : "퍼블리싱"}
                  </div>
                  <div
                    className={`WizLiveLogGame WizLiveLogGame--${
                      log.spriteBox ? "on" : "off"
                    }`}
                  >
                    {log.spriteBox ? "스프라이트박스" : "스프라이트박스"}
                  </div>
                </div>
                {/* api */}
                <div className="WizLiveLogSubTitle">선택한 API탭</div>
                <div className="WizLiveLogAPI">
                  <FormattedMessage id={log.selectedApi} />
                </div>
              </div>
            ) : (
              <div>학생과 연결되지 않은 상태입니다.</div>
            )}
          </div>
        </div>
      </Rnd>
    </React.Fragment>
  );
}
