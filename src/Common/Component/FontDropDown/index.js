import React, { Component } from "react";
import { injectIntl } from "react-intl";

import onClickOutside from "react-onclickoutside";
import { getColorTheme } from "../../../Page/Builder/utils/colorThemeUtil";
import "./index.scss";

class FontDropDown extends Component {
  constructor(props) {
    super(props);
    this.selectedRef = null;
    this.setSelectedRef = element => {
      this.selectedRef = element;
    };
    this.focusSelectedRef = () => {
      if (this.selectedRef) {
        // this.selectedRef.focus();
        this.selectedRef.scrollIntoView({
          block: "center",
          behavior: "auto" //"smooth"
        });
      }
    };
    this.state = {
      isListOpened: false,
      selectedItem:
        this.props.list &&
        this.props.list.find(item => item.id === this.props.defaultValue)
    };
  }

  handleClickOutside = e => {
    this.setState({
      isListOpened: false
    });
  };

  setINTL = item => {
    return this.props.intl.formatMessage({ id: item.name });
  };

  handleItemClick = item => {
    this.props.handleSelectItem(item.id);
    this.setState({ selectedItem: item, isListOpened: false });
  };
  handleToggleList = () => {
    this.setState(state => {
      return { isListOpened: !state.isListOpened };
    }, this.focusSelectedRef);
  };

  render() {
    let { list } = this.props;
    let { isListOpened, selectedItem } = this.state;
    let listToggle = isListOpened ? "on" : "off";
    const colorTheme = getColorTheme();
    return (
      <div className="FontDD">
        <div
          className={`FontDD__header header__list--${listToggle}`}
          onClick={this.handleToggleList}
        >
          <div className="FontDD__title">{this.setINTL(selectedItem)}</div>
          <div
            className={`FontDD__arrow FontDD__arrow--${listToggle}  ${colorTheme}`}
          />
        </div>
        {isListOpened && (
          <div className="FontDD__body">
            <div className="FontDD__list">
              {list.map((item, index) => {
                let isSelected = selectedItem.id === item.id;
                let itemToggle = isSelected ? "on" : "off";
                if (isSelected) {
                  return (
                    <div
                      key={index}
                      className={`FontDD__item FontDD__item--${itemToggle}`}
                      onClick={() => this.handleItemClick(item)}
                      ref={this.setSelectedRef}
                    >
                      {this.setINTL(item)}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className={`FontDD__item FontDD__item--${itemToggle}`}
                      onClick={() => this.handleItemClick(item)}
                    >
                      {this.setINTL(item)}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default injectIntl(onClickOutside(FontDropDown));
