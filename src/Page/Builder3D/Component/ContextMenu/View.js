import React from "react";
import onClickOutside from "react-onclickoutside";
import "./index.scss";

export default function(props) {
  const {
    contextMenuOn,
    contextMenus,
    contextMenuStyle,
    onClickContextMenuOutside
  } = props;
  return (
    <div id="contextmenu_container" className="contextmenu_container">
      {contextMenuOn && (
        <WrappedContextMenu
          style={contextMenuStyle}
          menus={contextMenus}
          onClickOutside={onClickContextMenuOutside}
        />
      )}
    </div>
  );
}

class ContextMenu extends React.Component {
  handleClickOutside = () => {
    this.props.onClickOutside();
  };
  render() {
    const { style, menus } = this.props;
    return (
      <div
        className="contextmenus"
        style={style}
        onContextMenu={e => e.preventDefault()}
      >
        {menus.map(menu => (
          <div
            key={menu.name}
            className="contextmenu"
            onClick={() => {
              menu.onClick();
              this.props.onClickOutside();
            }}
          >
            <img src={menu.img ? menu.img : ""} alt="" />
            <div className="contextmenu_name">{menu.name}</div>
          </div>
        ))}
      </div>
    );
  }
}
const WrappedContextMenu = onClickOutside(ContextMenu);
