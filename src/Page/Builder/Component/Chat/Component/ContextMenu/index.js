import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import "./index.scss";
import { injectIntl } from "react-intl";
import Report from "../../../../../../Common/Component/report";
import { showPopUp } from "../../../../../../Common/Component/PopUp";
import sirenIcon from "../../../../../../Image/siren.svg";

class ContextMenu extends Component {
  constructor(props) {
    super(props);
    this.menus = [
      {
        name: this.props.intl.formatMessage({ id: "ID_REPORT_BUTTON__02" }),
        onClick: this.handleReport,
        icon: sirenIcon
      }
    ];
  }
  handleClickOutside = e => {
    this.props.dismiss(null);
  };

  handleReport = chatId => {
    showPopUp(<Report target={{ ChatId: chatId }} email={this.props.user} />, {
      darkmode: true
    });
  };

  render() {
    const { menus = [] } = this;
    const { dismiss, chatId } = this.props;

    return (
      <div className={`chatContextmenu`}>
        {menus.map((menu, index) => {
          const { name, onClick } = menu;
          return (
            <div
              className="social_menu"
              onClick={() => {
                onClick(chatId);
                dismiss(null);
              }}
              key={index}
            >
              {menu.icon && (
                <img className="social_icon" src={menu.icon} alt="" />
              )}
              <div className="social_text" key={index}>
                {name}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default injectIntl(onClickOutside(ContextMenu));
