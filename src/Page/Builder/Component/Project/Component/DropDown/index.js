import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import { injectIntl } from "react-intl";
import copyImg from "../../../../../../Image/builder/copy-wh.svg";
import removeImg from "../../../../../../Image/builder/delete-wh.svg";
import editImg from "../../../../../../Image/builder/edit-write-draft.svg";
import moreImg from "../../../../../../Image/builder/icon-more.svg";
import "./index.scss";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToolOpened: false,
      toolItemIndex: undefined
    };
  }
  handleClickOutside = e => {
    this.handleToggleTool(undefined, false);
  };
  handleToggleTool = (index, toggle) => {
    this.setState({
      isToolOpened: toggle,
      toolItemIndex: index
    });
  };

  render() {
    const {
      item,
      index,
      handleEdit,
      handleRemove,
      handleCopy,
      intl,
      lastItemIndex
    } = this.props;
    const { isToolOpened, toolItemIndex } = this.state;

    return (
      <div
        className="info__more"
        onClick={() => this.handleToggleTool(index, !isToolOpened)}
      >
        <img src={moreImg} alt="img" />
        <div
          style={
            index % lastItemIndex === lastItemIndex - 1
              ? { top: "30px", right: "-15px" }
              : { top: "-4px", right: "-113px" }
          }
          className={`ProjectItem__Tools ${isToolOpened &&
            toolItemIndex === index &&
            `ProjectItem__Tools__on`}`}
        >
          <div
            className="ProjectItem__Tool"
            onClick={() => handleEdit(item.pId, item.name)}
          >
            <img src={editImg} alt="edit" />
            {intl.formatMessage({ id: "ID_PROJECT_EDIT_BUTTON" })}
          </div>
          <div
            className="ProjectItem__Tool"
            onClick={() => handleRemove(item.pId, item.name)}
          >
            <img src={removeImg} alt="remove" />
            {intl.formatMessage({
              id: "ID_PROJECT_REMOVE_BUTTON"
            })}
          </div>
          <div
            className="ProjectItem__Tool"
            onClick={() => handleCopy(item.pId)}
          >
            <img src={copyImg} alt="copy" />
            {intl.formatMessage({ id: "ID_PROJECT_COPY_BUTTON" })}
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(onClickOutside(Container));
