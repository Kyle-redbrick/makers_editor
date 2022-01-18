import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { VCTYPE } from "../../../../../Common/Util/Constant";
import "./index.scss";

import egoPlayImg from "../../../../../Image/videoclass/ego_play_wizlab.png";
import egoNextImg from "../../../../../Image/videoclass/ego_next.png";

class Ego extends Component {
  constructor(props) {
    super(props);
    this.egoSayTimeout = null;
    this.egoImgSrc =
      "https://wizschool-assets.oss-cn-shanghai.aliyuncs.com/assets/24a20d5b7568f14c424a3c1704ed3b75.png";
    this.state = {
      egoMessages: [],
      isBubbleHidden: true
    };
  }
  componentWillUnmount() {
    if (this.egoSayTimeout) {
      clearTimeout(this.egoSayTimeout);
    }
  }

  egoSay = (egoMessages, timeout = 5000) => {
    if (this.egoSayTimeout) {
      clearTimeout(this.egoSayTimeout);
    }
    if (egoMessages) {
      this.setState({ isBubbleHidden: false, egoMessages });
      this.egoSayTimeout = setTimeout(() => {
        this.setState({ isBubbleHidden: true });
      }, timeout);
    } else {
      this.setState({ isBubbleHidden: true });
    }
  };
  onClickEgo = () => {
    if (this.props.onClickEgo) {
      this.props.onClickEgo();
    }
  };
  onClickEgoBubble = () => {
    if (this.egoSayTimeout) {
      clearTimeout(this.egoSayTimeout);
    }
    this.setState({ isBubbleHidden: true });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { egoMessages, isBubbleHidden } = this.state;
    const isImage = egoMessages[0] && egoMessages[0].type === VCTYPE.EGO.IMAGE;

    return (
      <div className="ego">
        <div
          id="ego_bubble"
          className={`ego_bubble ${
            isBubbleHidden ? "ego_bubble-hidden" : ""
          } ${isImage && "ego_bubble_img"}`}
          onClick={this.onClickEgoBubble}
        >
          <div className="ego_bubble_name">
            {formatMessage({ id: "ID_EGO" })}
          </div>
          <div className="ego_bubble_messages">
            {egoMessages.length > 0 &&
              egoMessages.map((message, index) => {
                switch (message.type) {
                  case VCTYPE.EGO.TEXT:
                    return (
                      <div key={index} className="ego_bubble_message_text">
                        {message.data}
                      </div>
                    );
                  case VCTYPE.EGO.IMAGE:
                    return (
                      <img
                        key={index}
                        className="ego_bubble_message_image"
                        style={{ width: `${message.width}px` }}
                        src={message.data}
                        alt={message.type}
                      />
                    );
                  case VCTYPE.EGO.PLAY:
                    return (
                      <img
                        key={index}
                        className="ego_bubble_message_image"
                        src={egoPlayImg}
                        alt={message.type}
                      />
                    );
                  case VCTYPE.EGO.NEXT:
                    return (
                      <img
                        key={index}
                        className="ego_bubble_message_image"
                        src={egoNextImg}
                        alt={message.type}
                      />
                    );
                  case VCTYPE.EGO.COMPONENT:
                    return <Fragment key={index}>{message.data}</Fragment>;
                  default:
                    return null;
                }
              })}
          </div>
        </div>
        <img
          className="ego_image"
          src={this.egoImgSrc}
          alt="ego"
          onClick={this.onClickEgo}
        />
      </div>
    );
  }
}

export default injectIntl(Ego, { withRef: true });
