import React, { Component } from "react";
import View from "./View";
import { injectIntl } from "react-intl";
import * as request from "../../Common/Util/HTTPRequest";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      filteredGames: [],
      selectedTab: 'all',
      title: '',
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0); 
    await this.getData();
  }

  getData = () => {
    const { type } = this.props.match.params;

    switch (type) {
      case 'news':
        this.setState({ title : '최신 게임' })
        return this.getNewsGameData();
      case 'weekly':
        this.setState({ title : '주간 인기 게임' })
        return this.getWeeklyProjectsByType();
      case 'monthly':
        this.setState({ title : '월간 인기 게임' })
        // TODO : 월간 인기 게임 가져오기
        // return this.getWeeklyProjectsByType();
        break;
      default:
        break;
    }
  }

  getNewsGameData = async params => {
    const project = await request
      .getProjectsByType(params ? params : { type: "news", limit: 20, offset: 0 })
      .then(res => res.json())
      .catch(e => console.error(e));

    this.setState({
      games: [...this.state.games, ...project]
    });
  };

  getWeeklyProjectsByType = async (params) => {
    const project = await request
      .getWeeklyProjectsByType(params ? params : { type: "like", limit: 20, offset: 0 })
      .then(res => res.json())
      .catch(e => console.error(e));

    this.setState({
      games: [...this.state.games, ...project]
    });
  };

  handleSelectedTab = (courseType) => {
    // TODO : Tab 선택에 따라 해당하는 course Type만 보여주기
    if(courseType) {
      switch (courseType) {
        case 'all': 
          return this.setState({ selectedTab : 'all', filteredGames: this.state.games});
        case 'oobc':
          return this.setState({ selectedTab : 'oobc', filteredGames: this.state.games});
        case 'js':
          return this.setState({ selectedTab : 'js', filteredGames: this.state.games});
        default:
          break;
      }
    }
  };

  render() {
    const { filteredGames, games, title, selectedTab } = this.state;
    const { handleSelectedTab } = this;

    return (
      <View
        intl={this.props.intl}
        games={filteredGames.length > 0 ? filteredGames : games} 
        title={title} 
        selectedTab={selectedTab}
        handleSelectedTab={handleSelectedTab} 
      />
    )
  }
}

export default injectIntl(Container);
