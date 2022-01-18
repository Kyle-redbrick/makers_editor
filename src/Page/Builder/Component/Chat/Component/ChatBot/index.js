import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import { ChatbotMsgType } from "../../../../../../Common/Util/Constant";
import * as projectActions from "../../../../Store/Reducer/project";
import * as chatbotActions from "../../../../Store/Reducer/chatbot";
import * as interactionActions from "../../../../Store/Reducer/interaction";

import "./index.scss";
import ChatbotMsgBot from "./Component/ChatbotMsgBot";
import ChatbotSelect from "./Component/ChatbotSelect";
import ChatbotConfirm from "./Component/ChatbotConfirm";
import ChatbotScript from "./Component/ChatbotScript";
import ChatbotMultiple from "./Component/ChatbotMultiple";
import ChatbotError from "./Component/ChatbotError";
import ChatbotButton from "./Component/ChatbotButton";
import ChatbotLecture from "./Component/ChatbotLecture";
import sendImg from "../../../../../../Image/builder/arrow-up-2.svg";

import * as ChatbotUtil from "../../../../utils/ChatbotUtil";
import { getGuestId } from "../../../../../../Common/Util/GuestIdUtil";

const BOT_SELECT = ChatbotMsgType.BOT_SELECT;
const BOT_CONFIRM = ChatbotMsgType.BOT_CONFIRM;
const BOT_API_SCRIPT = ChatbotMsgType.BOT_API_SCRIPT;
const GAME_PRINT = ChatbotMsgType.GAME_PRINT;
const REQUEST_SOLUTION = ChatbotMsgType.REQUEST_SOLUTION;
const BOT_ERROR = ChatbotMsgType.BOT_ERROR;
const BOT_BUTTON = ChatbotMsgType.BOT_BUTTON;
const BOT_CLASS = ChatbotMsgType.BOT_CLASS;

class Chatbot extends Component {
  constructor(props) {
    super(props);

    this.listRef = null;
    this.setListRef = elem => {
      this.listRef = elem;
    };
    this.submitRef = null;
    this.setSubmitRef = elem => {
      this.submitRef = elem;
    };

    this.state = {
      userInput: "",
      // tutor
      tutorScriptIndex: -1,
      tutorScriptActions: []
    };
  }

  componentDidMount() {
    this.submitRef.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        this.handleSubmit(e);
      }
    });

    //socket set
    // const options = {}; //options reference : https://socket.io/docs/client-api/#new-Manager-url-options
    // this.socket = io(URL.SOCKET_SERVER, options);
    // this.socket.on("connection");
    // this.socket.on("chatbot", this.socketOnChatbot);
    window.addEventListener("message", this.gamePrintHandler, false);
  }

  componentWillUnmount() {
    // this.socket.off("chatbot", this.socketOnChatbot);
    // this.socket.disconnect();
    window.removeEventListener("message", this.gamePrintHandler);
    clearTimeout(this.tutorTimer);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages.length !== prevProps.messages.length) {
      this.listRef.scrollTop = this.listRef.scrollHeight;
    }
  }

  gamePrintHandler = e => {
    if (e.data.source) {
      if (e.data.source === "wizlab") {
        if (e.data.type === "chatbot") {
          let msg = {
            sender: "GAME",
            type: GAME_PRINT,
            text: e.data.message
          };
          this.props.addNewMsg([msg]);
        }
      }
    }
  };

  handleOption = option => {
    const newMsgs = [];
    if (option.text) {
      let userMsg = {
        sender: this.props.name,
        text: option.text
      };
      newMsgs.push(userMsg);
    }
  };

  handleCancel = cancelText => {
    let confirmUserMsg = {
      sender: this.props.name,
      text: cancelText
    };
    let msg = {
      sender: "WIZBOT",
      text: <FormattedMessage id="ID_DRAWER_CHAT_WIZBOT_CANCEL" />
    };
    this.props.addNewMsg([confirmUserMsg, msg]);
  };

  socketOnChatbot = msg => {
    const type = msg.type;
    switch (type) {
      case REQUEST_SOLUTION:
        this.handleOption({ ...msg, optionType: type });
        break;
      default:
        this.props.addNewMsg([msg]);
        break;
    }
  };

  handleInputChange = e => {
    const target = e.target;
    this.setState({
      userInput: target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const text = this.state.userInput;
    if (text.length < 1) return;
    const sender = this.props.name || null;
    const email = this.props.email || getGuestId();
    let type = "USER_QUESTION";
    this.props.addNewMsg([{text, sender, email, type}]);

    this.setState({
      userInput: ""
    });
    ChatbotUtil.sendMsg(
      { userId: email, description: text },
      messages => {
        //add messages
        if (messages && messages.length > 0) {
           this.props.addNewMsg(messages);
        }
      },
      error => {
        console.error(error);
      }
    )
  };

  render() {
    const { userInput } = this.state;
    const { name, messages } = this.props;

    return (
      <div className="Chatbot">
        <div className="ChatContentMainMessages" ref={this.setListRef}>
          {messages.map((item, index) => {
            // TODO: set msgId
            item = { ...item, msgId: index };
            const { sender, type, errors } = item;
            if (sender === name || !sender) {
              if (type === BOT_BUTTON) {
                return <ChatbotButton key={index} keyword={item.keyword} questionType={item.questionType} />
              } else {
                return (
                  <div className="ChatContentMainMessage" key={index}>
                    <div className="ChatContentMainMessageContentLine ChatContentMainMessageContentLineMy">
                      <div className="ChatContentMainMessageContent">
                        {item.text}
                      </div>
                    </div>
                  </div>
                );
              }
            } else if (sender === "GAME") {
              if (type === GAME_PRINT) {
                return (
                  <div className="ChatContentMainMessage" key={index}>
                    <div className="ChatContentMainMessageContentLine ChatContentMainMessageContentLineMy">
                      <div className="ChatContentMainMessageContent ChatContentMainMessageContentPrint">
                        {item.text}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            } else if (sender === "WIZBOT") {
              // if (!!item.component) {
              //   return (
              //     <React.Fragment key={index}>{item.component}</React.Fragment>
              //   );
              // }
              if (type === BOT_ERROR) {
                return <ChatbotError key={index} errors={errors} />;
              } else if (type === BOT_SELECT) {
                return (
                  <ChatbotMsgBot key={index} item={item}>
                    <ChatbotSelect
                      options={item.options}
                      handleOption={this.handleOption}
                    />
                  </ChatbotMsgBot>
                );
              } else if (type === BOT_CONFIRM) {
                return (
                  <ChatbotConfirm
                    key={index}
                    handleConfirm={item.handleConfirm}
                    handleCancel={item.handleCancel}
                    confirmText={item.confirmText}
                    cancelText={item.cancelText}
                  />
                );
              } else if (type === BOT_API_SCRIPT) {
                return (
                  <ChatbotMsgBot key={index} item={item}>
                    <ChatbotScript msgId={item.msgId} script={item.script} />
                  </ChatbotMsgBot>
                );
              } else if (type === "BOT_MULTIPLE") {
                return (
                  <ChatbotMsgBot key={index} item={item}>
                    <ChatbotMultiple
                      item={item}
                      handleSelect={item.checkFunc}
                    />
                  </ChatbotMsgBot>
                );
              } else if (type === BOT_CLASS) {
                return <ChatbotLecture key={index} lectures={item.lectures} />
              } else {
                return <ChatbotMsgBot key={index} item={item} />;
              }
            } else {
              return null;
            }
          })}
        </div>
        <div className="ChatContentMainInputWrapper">
          <input
            ref={this.setSubmitRef}
            className="ChatContentMainInput"
            type="text"
            value={userInput}
            onChange={this.handleInputChange}
            placeholder={this.props.intl.formatMessage({
              id: "ID_DRAWER_CHAT_INPUT_PLACE_HOLDER"
            })}
          />
          <div className="ChatContentMainInputBtn" onClick={this.handleSubmit}>
            <img src={sendImg} alt="img" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    name: state.userinfo.name,
    email: state.userinfo.email,
    project: state.project,
    basicClass: state.project.basicClass,
    tutorMode: state.project.tutorMode,
    tutorScript: state.project.tutorScript,
    chatbot: state.chatbot,
    messages: state.chatbot.messages,
    tutor: state.chatbot.tutor,
    videoStatus: state.video.status,
    // videoURL: state.video.videoURL,
    isFullScreen: state.preview.isFullScreen,
    isPlaying: state.preview.isPlaying,
    errors: state.chatbot.errors,
    scene: state.scene,
    selectedSceneId: state.interaction.selected.scene,
    selectedObject:
      state.interaction.selected.objects[state.interaction.selected.scene]
  }),
  {
    setProject: projectActions.setProject,
    // setVideoStatus: videoActions.setVideoStatus,
    initChatbot: chatbotActions.initChatbot,
    addNewMsg: chatbotActions.addNewMsg,
    selectSprite: interactionActions.selectSprite
    // setVideoURL: videoActions.setVideoURL
  }
)(injectIntl(Chatbot));
