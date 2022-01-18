import React, { Component } from "react";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.tabs = ["scene", "sound"];
    this.state = { selectedTab: this.tabs[0] };
  }

  onClickTab = tabId => {
    this.setState({ selectedTab: tabId });
  };

  render() {
    const { selectedTab } = this.state;
    return <View selectedTab={selectedTab} onClickTab={this.onClickTab} />;
  }
}

export default Container;
