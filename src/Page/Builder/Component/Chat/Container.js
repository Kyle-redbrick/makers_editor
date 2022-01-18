import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import RndWrapper from "../../utils/RndWrapper";
import * as chatActions from "../../Store/Reducer/chat";
import { CHAT_MSG_TYPE } from "../../../../Common/Util/Constant";
import * as request from "../../../../Common/Util/HTTPRequest";
import View from "./View";
import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";
import checkBlockedUser from "../../../../Common/Util/CheckBlockedUser";
import { getGuestId } from "../../../../Common/Util/GuestIdUtil";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMessage: "",
      isChatbotMode: false,
      showMenu: undefined
    };

    this.inputRef = React.createRef();
    this.guestId = this.props.name ? undefined : getGuestId();
  }

  componentDidMount() {
    request
      .getChatMessages({ roomId: "all" })
      .then(res => res.json())
      .then(json => {
        json.reverse().forEach(msg => {
          if (!msg.user) msg.user = { name: msg.guestId };
          this.props.addMsg(msg);
          this.scrollToBottom();
        });
      })
      .catch(e => console.error(e));
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOn && this.props.isOn) {
      this.scrollToBottom();
    }

    if (this.props.isOn) {
      const { selectedRoomId, resetUnreadMsgCount, rooms } = this.props;
      if (selectedRoomId) {
        const selectedRoom = rooms[selectedRoomId];
        if (
          prevProps.selectedRoomId !== selectedRoomId ||
          (!prevProps.isOn && this.props.isOn)
        ) {
          resetUnreadMsgCount(selectedRoomId);
          this.scrollToBottom();
        }
        if (selectedRoom.unReadMsgCount > 0) {
          resetUnreadMsgCount(selectedRoomId);
        }
      }
    }
  }

  scrollToBottom = () => {
    setTimeout(() => {
      const element = document.getElementsByClassName(
        "ChatContentMainMessages"
      )[0];
      if (element) {
        element.scrollTo(0, element.scrollHeight - element.clientHeight);
      }
    }, 100);
  };

  handleSelectRoom = name => {
    this.props.setSelectedRoom(name);
    this.handleChatbotClose();
  };

  handleOnChange = e => {
    this.setState({ inputMessage: e.target.value });
  };

  handleOnSubmit = () => {
    let { userinfo } = this.props;

    const isBlocked = checkBlockedUser(userinfo);
    if (isBlocked) {
      return;
    }
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `SendChat`
    });

    const content = this.state.inputMessage;

    if (content.length < 1) {
      return;
    }
    const roomId = this.props.selectedRoomId;
    const type = CHAT_MSG_TYPE.TEXT;
    const user = {
      name: userinfo.name ? userinfo.name : this.guestId,
      icon: userinfo.icon,
      email: userinfo.email
    };
    this.props.addMsgToQueue({ roomId, content, user, type });
    this.setState({ inputMessage: "" });
  };

  handleChatbotOpen = () => {
    this.setState({ isChatbotMode: true });
    this.props.setSelectedRoom(false);
  };

  handleChatbotClose = () => {
    this.setState({ isChatbotMode: false });
  };
  handleMenu = id => {
    this.setState({ showMenu: id });
    // showPopUp(<ContextMenu menus={menus} />, {
    //   dismissOverlay: false,
    //   dismissButton: false,
    //   defaultPadding: false,
    //   darkmode: true
    // });
  };

  render() {
    const {
      isOn,
      rooms,
      handleSelectTab,
      handleChangeZIndex,
      zIndex,
      selectedRoomId,
      intl,
      userinfo
    } = this.props;
    const { inputMessage, isChatbotMode, showMenu } = this.state;
    const {
      handleSelectRoom,
      handleOnChange,
      handleOnSubmit,
      inputRef,
      handleChatbotOpen,
      guestId,
      handleMenu
    } = this;

    if (!isOn) {
      return <div />;
    }
    return (
      <RndWrapper
        id="chat"
        style={{ zIndex }}
        defaultWidth={384}
        defaultHeight={400}
        defaultX={document.body.clientWidth - 460}
        defaultY={16}
        minHeight={300}
        minWidth={300}
      >
        <View
          handleSelectTab={handleSelectTab}
          handleChangeZIndex={handleChangeZIndex}
          rooms={rooms}
          selectedRoomId={selectedRoomId}
          handleSelectRoom={handleSelectRoom}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          inputMessage={inputMessage}
          inputRef={inputRef}
          isChatbotMode={isChatbotMode}
          handleChatbotOpen={handleChatbotOpen}
          intl={intl}
          email={userinfo.email}
          guestId={guestId}
          showMenu={showMenu}
          handleMenu={handleMenu}
        />
      </RndWrapper>
    );
  }
}

export default connect(
  state => ({
    rooms: state.chat.rooms,
    selectedRoomId: state.chat.selectedRoomId,
    userinfo: state.userinfo
  }),
  {
    addMsgToQueue: chatActions.addMsgToQueue,
    addMsg: chatActions.addMsg,
    setSelectedRoom: chatActions.setSelectedRoom,
    resetUnreadMsgCount: chatActions.resetUnreadMsgCount
  }
)(injectIntl(Container));
