import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import onClickOutside from "react-onclickoutside";
import "./index.scss";

import menuIcon from "../../../Image/more-horizontal.svg";

class ContextMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false
    };
  }

  onClickImg = () => {
    const isOn = !this.state.isOn;
    this.setState({ isOn });
  };
  handleClickOutside = () => {
    this.setState({ isOn: false });
  };

  render() {
    const { onClickEdit, onClickDelete, onClickReport } = this.props;
    const { isOn } = this.state;
    const { onClickImg } = this;
    return (
      <div className="contextmenu">
        {(onClickEdit || onClickDelete || onClickReport) && (
          <img
            className="contextmenu_img"
            onClick={onClickImg}
            src={menuIcon}
            alt="menuIcon"
          />
        )}
        {isOn && (
          <div className="contextmenu_items">
            {onClickEdit && (
              <div
                className="contextmenu_item contextmenu_item-edit"
                onClick={() => {
                  onClickEdit();
                  this.setState({ isOn: !this.state.isOn });
                }}
              >
                <FormattedMessage id="ID_CONTEXTMENU_EDIT" />
              </div>
            )}
            {onClickReport && (
              <div
                className="contextmenu_item contextmenu_item-report"
                onClick={() => {
                  onClickReport();
                  this.setState({ isOn: !this.state.isOn });
                }}
              >
                <FormattedMessage id="ID_CONTEXTMENU_REPORT" />
              </div>
            )}
            {onClickDelete && (
              <div
                className="contextmenu_item contextmenu_item-delete"
                onClick={() => {
                  onClickDelete();
                  this.setState({ isOn: !this.state.isOn });
                }}
              >
                <FormattedMessage id="ID_CONTEXTMENU_DELETE" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(ContextMenu);
