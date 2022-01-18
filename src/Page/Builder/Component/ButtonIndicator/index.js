import React, { Component } from "react";
import { connect } from "react-redux";
import * as interactionActions from "../../Store/Reducer/interaction";
import "./index.scss";

class ButtonIndicator extends Component {
  constructor(props) {
    super(props);
    if (!props.buttonId) {
      throw Error("buttonId is missing!!");
    }
    this.isVisible = false;
    this.timer = null;
  }
  contextMenu = e => {
    if (!this.props.isTutor) {
      return;
    }
    e.preventDefault();

    this.props.setBtnHighlight(this.props.buttonId);
  };

  render() {
    const { highlightBtnId, buttonId } = this.props;
    const isClick = highlightBtnId === buttonId;

    return (
      <div className="ButtonIndicator" onContextMenu={e => this.contextMenu(e)}>
        {this.props.children}
        {isClick ? (
          <div className="ButtonIndicator_inner ButtonIndicator_inner_animation" />
        ) : (
          <div className="ButtonIndicator_inner" />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    highlightBtnId: state.interaction.highlightBtnId,
    isTutor: state.userinfo.isTutor
  }),
  {
    setBtnHighlight: interactionActions.setBtnHighlight
  }
)(ButtonIndicator);
