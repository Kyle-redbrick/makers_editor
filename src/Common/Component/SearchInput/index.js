import React, { Component } from "react";
import { injectIntl } from "react-intl";
import "./index.scss";

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = null;
    this.setInputRef = (elem) => {
      if (!elem) return;
      this.inputRef = elem;
    };
  }

  componentDidMount() {
    this.inputRef.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        this.props.onSubmit(e);
      }
    });
  }

  render() {
    const { containerName, value, onChange, onSubmit } = this.props;

    return (
      <div className={`SearchInput ${containerName}`}>
        <input
          ref={this.setInputRef}
          className="SearchInput__input"
          type="text"
          value={value}
          placeholder={this.props.intl.formatMessage({ id: "ID_SEARCH" })}
          onChange={onChange}
        />
        <p className="SearchInput__btn" onClick={onSubmit} />
      </div>
    );
  }
}
export default injectIntl(SearchInput);
