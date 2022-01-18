import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";

import searchIcon from "../../../../Image/dreamclass/search.svg";
import "./index.scss";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { searchKeyword: "" };
  }

  handleOnChange = e => {
    this.setState({ searchKeyword: e.target.value });
  }

  handleOnSubmit = () => {
    const keyword = this.state.searchKeyword;
    if(keyword && keyword.length > 0) {
      this.props.history.push(`/game/search?keyword=${keyword}`);
    }
  }

  handleOnKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleOnSubmit();
    }
  }

  render() {
    return (
      <div className="GameSearchWrapper">
        <div className="GameSearch">
          <input 
            type="text"
            value={this.state.searchKeyword}
            onChange={this.handleOnChange}
            onKeyUp={this.handleOnKeyUp}
            placeholder={this.props.intl.formatMessage({id: "ID_SEARCH_HINT"})}
          />
          <img src={searchIcon} alt="search" onClick={this.handleOnSubmit} />
        </div>
      </div>
    );
  }
}

export default injectIntl(withRouter(Container));
