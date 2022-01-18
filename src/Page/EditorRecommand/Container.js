import React, { Component } from "react";
import View from "./View";
import { injectIntl } from "react-intl";
import * as request from "../../Common/Util/HTTPRequest";

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendedGames: []
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.getRecommendedGames();
  }

  getRecommendedGames = async () => {
    const wizappInfo = await request
      .getEditorRecommends()
      .then(res => res.json())
      .catch(e => console.error(e));

    this.setState({
      recommendedGames: wizappInfo
    });
  };

  render() {
    const { recommendedGames } = this.state;
    return <View intl={this.props.intl} recommendedGames={recommendedGames} />;
  }
}

export default injectIntl(Container);
