import React from "react";
import "./index.scss";

export default function(props) {
  const { menus = [], cancelButtonName, dismiss } = props;
  return (
    <div className="social_menus">
      {menus.map((menu, index) => {
        const { name, onClick } = menu;
        return (
          <div
            className="social_menu"
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
      <div className="social_menu social_menu-cancel" onClick={dismiss}>
        {cancelButtonName}
      </div>
    </div>
  );
}
