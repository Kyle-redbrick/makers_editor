import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./index.module.scss";

export default class Navigation extends Component {
  render() {
    return (
      <div className={styles.Nav}>
        {React.Children.map(this.props.children, (child, index) => {
          return (
            <React.Fragment>
              {child}
              {index < this.props.children.length - 1 ? <span> > </span> : null}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export const NavItem = ({ to, text } = {}) => {
  if (to) {
    return (
      <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
        <span className={styles.Navtext}>{text}</span>
      </Link>
    );
  } else {
    return <span className={styles.Navtext}>{text}</span>;
  }
};
