import React from "react";
import moment from "moment";
import {
  SIGNOUT_PROFILE_IMAGE,
  CHAT_TYPE
} from "../../../../Common/Util/Constant";
import ChatBot from "./Component/ChatBot";
import "./index.scss";
import closeImg from "../../../../Image/builder/x-copy-3.svg";
import closeImg_darkmode from "../../../../Image/builder/x-copy-3_darkmode.svg";
import chatAllImg from "../../../../Image/builder/chat-all.svg";
import chatAllClickImg from "../../../../Image/builder/chat-all-click.svg";
import chatbotImg from "../../../../Image/builder/chat-bot.svg";
import chatbotClickImg from "../../../../Image/builder/chat-bot-click.svg";
import sendImg from "../../../../Image/builder/arrow-up-2.svg";
import { FormattedMessage } from "react-intl";
import ContextMenu from "./Component/ContextMenu";
import { getColorTheme } from "../../utils/colorThemeUtil";

export default function(props) {
  const {
    handleSelectTab,
    handleChangeZIndex,
    rooms,
    selectedRoomId,
    handleSelectRoom,
    handleOnChange,
    handleOnSubmit,
    inputMessage,
    inputRef,
    isChatbotMode,
    handleChatbotOpen,
    intl,
    email,
    guestId,
    handleMenu,
    showMenu
  } = props;
  const colorTheme = getColorTheme();

  return (
    <div className="Chat" onMouseDown={() => handleChangeZIndex("chat")}>
      <div className="ChatTitleLine handle">
        <div className="ChatTitle">
          <FormattedMessage id="ID_CHAT_TITLE" />
        </div>
        <div className="ChatClose" onClick={() => handleSelectTab("chat")} onTouchEnd={() => handleSelectTab("chat")}>
          <img
            src={colorTheme === "darkMode" ? closeImg_darkmode : closeImg}
            alt="img"
          />
        </div>
      </div>
      <div className="ChatContent">
        <div className="ChatContentRooms">
          {Object.keys(rooms).map((id, index) => {
            return (
              <div
                key={index}
                className={`ChatContentRoom ${selectedRoomId === id &&
                  "ChatContentRoomActive"}`}
                onClick={() => handleSelectRoom(id)}
              >
                {id === CHAT_TYPE.ALL ? (
                  <img
                    src={selectedRoomId === id ? chatAllClickImg : chatAllImg}
                    alt="img"
                  />
                ) : (
                  <img
                    src={rooms[id].roomIcon}
                    className={`livechat ${
                      selectedRoomId === id ? "livechat__on" : "livechat__off"
                    }`}
                    alt="img"
                  />
                )}
                <span className="room__title">{rooms[id].name}</span>
                {rooms[id].unReadMsgCount > 0 && (
                  <span className="ChatContentRoomRedDot">
                    {rooms[id].unReadMsgCount}
                  </span>
                )}
              </div>
            );
          })}
          <div
            className={`ChatContentRoom ${isChatbotMode &&
              "ChatContentRoomActive"}`}
            onClick={handleChatbotOpen}
          >
            <img
              src={isChatbotMode ? chatbotClickImg : chatbotImg}
              className="chatbotImg"
              alt="chatbot img"
            />
            <span className="room__title">
              <FormattedMessage id="ID_BUILDER_CHATBOT_TITLE" />
            </span>
          </div>
        </div>

        {isChatbotMode ? (
          <div className="ChatContentMain">
            <ChatBot />
          </div>
        ) : (
          <div className="ChatContentMain">
            <div className="ChatContentMainMessages">
              {rooms[selectedRoomId].messages.map((message, index) => {
                const { user, createdAt, content, id } = message;
                let isMy = false;
                if (user.email) {
                  isMy = user.email === email;
                } else {
                  isMy = user.name === guestId;
                }
                return (
                  <div className="ChatContentMainMessage" key={index}>
                    {!isMy && (
                      <div className="ChatContentMainMessageUserLine">
                        <div
                          className="ChatContentMainMessageIcon"
                          onClick={() => handleMenu(id)}
                        >
                          <img
                            src={user.icon ? user.icon : SIGNOUT_PROFILE_IMAGE}
                            alt="user icon"
                          />
                        </div>
                        <div className="ChatContentMainMessageName">
                          {user.name}
                        </div>
                        {showMenu === id && email && !isMy && (
                          <ContextMenu
                            dismiss={handleMenu}
                            user={email}
                            chatId={id}
                          />
                        )}
                      </div>
                    )}
                    <div
                      className={`ChatContentMainMessageContentLine ${isMy &&
                        "ChatContentMainMessageContentLineMy"}`}
                    >
                      <div className="ChatContentMainMessageContent">
                        {content}
                      </div>
                      <div className="ChatContentMainMessageTime">
                        {moment(createdAt).format("HH:mm")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="ChatContentMainInputWrapper">
              <input
                ref={inputRef}
                className="ChatContentMainInput"
                disabled={email ? false : true}
                type="text"
                placeholder={
                  email
                    ? intl.formatMessage({
                        id: "ID_DRAWER_CHAT_INPUT_PLACE_HOLDER"
                      })
                    : intl.formatMessage({
                        id: "ID_DRAWER_CHAT_INPUT_PLACE_HOLDER_GUEST"
                      })
                }
                value={inputMessage}
                onChange={handleOnChange}
                onKeyUp={e => {
                  e.stopPropagation();
                  e.keyCode === 13 && handleOnSubmit();
                }}
              />
              <div className="ChatContentMainInputBtn" onClick={handleOnSubmit}>
                <img src={sendImg} alt="img" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
