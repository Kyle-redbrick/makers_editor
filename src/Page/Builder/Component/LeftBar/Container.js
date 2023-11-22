import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import View from "./View";
import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";

export const LeftBarTab = {
  SCENES: "SceneSprite",
  SOUNDS: "Sound",
};

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedLeftTab: LeftBarTab.SCENES, isClass: false };
  }

  componentDidMount() {
    const isClass = window.location.pathname.includes("class");
    this.setState({ isClass: isClass });
  }

  handleSelectLeftTab = (tab) => {
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `SpriteMenu`,
      label: tab,
    });

    if (this.state.selectedLeftTab !== tab) {
      this.setState({ selectedLeftTab: tab });
    } else {
      this.setState({ selectedLeftTab: undefined });
    }
  };

  render() {
    const { selectedLeftTab } = this.state;
    const { handleSelectLeftTab } = this;
    const { handleSelectTab, isLeftBarButtonsHidden, isSceneToolHidden } =
      this.props;
    return (
      <View
        selectedLeftTab={selectedLeftTab}
        handleSelectLeftTab={handleSelectLeftTab}
        handleSelectTab={handleSelectTab}
        intl={this.props.intl}
        isLeftBarButtonsHidden={isLeftBarButtonsHidden}
        isSceneToolHidden={isSceneToolHidden}
        isClass={this.state.isClass}
      />
    );
  }
}

export default connect((state) => ({}), {})(injectIntl(Container));
