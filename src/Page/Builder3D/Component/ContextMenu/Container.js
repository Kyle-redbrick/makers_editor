import React, { Component } from "react";
import { connect } from "react-redux";
import * as contextMenuActions from "../../Store/Reducer/contextMenu";
import View from "./View";

class Container extends Component {
  getContextMenuStyle(contextMenu) {
    const validPos = this.getValidPosition(contextMenu);
    return { top: validPos.y, left: validPos.x };
  }
  getValidPosition(contextMenu) {
    const { menus, position } = contextMenu;
    if (position) {
      let x = position.x + 12;
      let y = position.y;

      const container = document.getElementById("contextmenu_container");
      if (container) {
        const minX = 0;
        const maxX = container.offsetWidth;
        const minY = 0;
        const maxY =
          container.offsetHeight - this.getEstimatedContextMenusHeight(menus);
        if (x < minX) x = minX;
        if (x > maxX) x = maxX;
        if (y < minY) y = minY;
        if (y > maxY) y = maxY;
      }

      return { x, y };
    } else {
      return { x: 0, y: 0 };
    }
  }
  getEstimatedContextMenusHeight(menus) {
    const menuHeight = 42;
    return menuHeight * menus.length;
  }

  onClickContextMenuOutside = () => {
    this.props.hideContextMenu();
  };

  render() {
    const { contextMenu } = this.props;
    const { menus } = contextMenu;
    const contextMenuOn = menus.length > 0;
    const contextMenuStyle = this.getContextMenuStyle(contextMenu);
    return (
      <View
        contextMenuOn={contextMenuOn}
        contextMenuStyle={contextMenuStyle}
        contextMenus={menus}
        onClickContextMenuOutside={this.onClickContextMenuOutside}
      />
    );
  }
}

export default connect(
  state => {
    return { contextMenu: state.contextMenu };
  },
  { hideContextMenu: contextMenuActions.hideContextMenu }
)(Container);
