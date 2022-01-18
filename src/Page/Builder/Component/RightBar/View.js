import React from "react";
import "./index.scss";
import { EDITORMODE } from "../../../../Common/Util/Constant";
import snippetImg from "../../../../Image/builder/snippet.svg";
import videoImg from "../../../../Image/builder/video.svg";
import chatImg from "../../../../Image/builder/chat.svg";
import qnaImg from "../../../../Image/builder/qna.svg";
import apiImg from "../../../../Image/builder/api.svg";
import propertyImg from "../../../../Image/builder/property.svg";
import snippetActiveImg from "../../../../Image/builder/snippet-w.svg";
import videoActiveImg from "../../../../Image/builder/video-w.svg";
import chatActiveImg from "../../../../Image/builder/chat-copy-4.svg";
import qnaActiveImg from "../../../../Image/builder/qna_active.svg";
import apiActiveImg from "../../../../Image/builder/api-w.svg";
import propertyActiveImg from "../../../../Image/builder/property-w.svg";
import ButtonIndicator from "../ButtonIndicator";

export default function(props) {
  const {
    popupStates,
    handleSelectTab,
    unReadMsgCount,
    intl,
    pageType,
    editorMode,
    isTutor,
    organization
  } = props;
  return (
    <div className="RightBar">
      <div className="RightBarButtons">
        {editorMode !== EDITORMODE.BLOCK && (
          <React.Fragment>
            <ButtonIndicator buttonId="snippetImg">
              <div
                onClick={() => handleSelectTab("snippet")}
                className={`RightBarButton ${popupStates.snippet &&
                  "RightBarButton_Active"}`}
                data-tip={intl.formatMessage({ id: "ID_RIGHTBAR_SNIPPET" })}
              >
                <img
                  // src={popupStates.snippet ? videoActiveImg : videoImg}
                  src={popupStates.snippet ? snippetActiveImg : snippetImg}
                  alt="img"
                />
              </div>
            </ButtonIndicator>

            <ButtonIndicator buttonId="apiImg">
              <div
                onClick={() => handleSelectTab("api")}
                className={`RightBarButton ${popupStates.api &&
                  "RightBarButton_Active"}`}
                data-tip={intl.formatMessage({ id: "ID_RIGHTBAR_API" })}
              >
                <img src={popupStates.api ? apiActiveImg : apiImg} alt="img" />
              </div>
            </ButtonIndicator>

            {isTutor && (
              <ButtonIndicator buttonId="videoImg">
                <div
                  onClick={() => handleSelectTab("video")}
                  className={`RightBarButton ${popupStates.video &&
                    "RightBarButton_Active"}`}
                  data-tip={intl.formatMessage({ id: "ID_RIGHTBAR_VIDEO" })}
                >
                  <img
                    src={popupStates.video ? videoActiveImg : videoImg}
                    alt="img"
                  />
                </div>
              </ButtonIndicator>
            )}
          </React.Fragment>
        )}
        {/* {pageType !== "ocp" &&
          pageType !== "wizlive" &&
          pageType !== "wizlive_1v4" &&
          pageType !== "monitor_1v4" && (
            <ButtonIndicator buttonId="chatImg">
              <div
                onClick={() => handleSelectTab("chat")}
                className={`RightBarButton ${popupStates.chat &&
                  "RightBarButton_Active"}`}
                data-tip={intl.formatMessage({ id: "ID_RIGHTBAR_CHAT" })}
              >
                <img
                  src={popupStates.chat ? chatActiveImg : chatImg}
                  alt="img"
                />
                {!popupStates.chat && unReadMsgCount > 0 && (
                  <span className="RightBarRedDot">{unReadMsgCount}</span>
                )}
              </div>
            </ButtonIndicator>
          )} */}
        <ButtonIndicator buttonId="propertyImg">
          {pageType !== "ocp" && (
            <div
              onClick={() => {
                handleSelectTab("property");
              }}
              className={`RightBarButton ${popupStates.property &&
                "RightBarButton_Active"}`}
              data-tip={intl.formatMessage({ id: "ID_RIGHTBAR_PROPERTY" })}
            >
              <img
                src={popupStates.property ? propertyActiveImg : propertyImg}
                alt="img"
              />
            </div>
          )}
        </ButtonIndicator>
        {organization &&
          organization.toLowerCase() === "ssafy" &&
          pageType !== "ocp" &&
          pageType !== "wizlive" && (
            <ButtonIndicator buttonId="qnaImg">
              <div
                onClick={() => handleSelectTab("qna")}
                className={`RightBarButton ${popupStates.qna &&
                  "RightBarButton_Active"}`}
                data-tip={intl.formatMessage({ id: "ID_RIGHTBAR_QNA" })}
              >
                <img src={popupStates.qna ? qnaActiveImg : qnaImg} alt="img" />
              </div>
            </ButtonIndicator>
          )}
      </div>
    </div>
  );
}
