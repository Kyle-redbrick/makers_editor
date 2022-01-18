import React from "react";
import "./index.scss";

export default function(props) {
  const { menus = [], cancelButtonName, dismiss } = props;
  return (
    <div className="news_comment_menus">
      {menus.map((menu, index) => {
        const { name, onClick } = menu;
        return (
          <div
            className="news_comment_menu"
            onClick={() => {
              onClick();
              dismiss();
            }}
            key={index}
          >
            {name}
          </div>
        );
      })}
      <div
        className="news_comment_menu news_comment_menu-cancel"
        onClick={dismiss}
      >
        {cancelButtonName}
      </div>
    </div>
  );
}
