import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import "./index.scss";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, value: props.defaultValue };
  }

  onClickInput = () => {
    const open = !this.state.open;
    this.setState({ open });
  };
  onClickField = (value, index) => {
    this.props.onChange(value, index);
    this.setState({ open: false, value });
  };
  handleClickOutside = () => {
    this.setState({ open: false });
  };

  render() {
    const { values } = this.props;
    const { open, value } = this.state;
    const { onClickInput, onClickField } = this;
    return (
      <div className="select">
        <input
          value={value}
          className="select_input"
          onClick={onClickInput}
          readOnly
        />
        {open && (
          <div className="select_fields">
            {values.map((_value, index) => (
              <div
                key={index}
                className="select_field"
                onClick={() => {
                  onClickField(_value, index);
                }}
              >
                {_value}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(Select);
