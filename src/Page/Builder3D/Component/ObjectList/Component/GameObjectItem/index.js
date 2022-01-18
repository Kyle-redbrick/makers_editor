import React, { Component } from "react";
import "./index.scss";

export class GameObjectItem extends Component {
  render() {
    const { id, gameObject, onClickObject, isSelected } = this.props;
    const type = gameObject.type;

    return (
      <div
        className={`gameObjectItem${
          isSelected ? " gameObjectItem-current" : ""
        }`}
        onClick={() => onClickObject(gameObject)}
      >
        <div className="gameObjectItem_icon">{type}</div>
        <div className="gameObjectItem_id">{id}</div>
      </div>
    );
  }
}

export default GameObjectItem;
