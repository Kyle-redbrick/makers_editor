import React from "react";
import AnimationItemWrapper from "../AnimationItemWrapper";
import "./index.scss";

const DrawerAnimaItem = ({
  id,
  name,
  animationStyle,
  handleOnMouseOver,
  handleOnMouseOut
} = {}) => {
  return (
    <React.Fragment>
      <div className="AnimationItem">
        <div className="AnimationItem__row1">
          <div className="AnimationItem__icon">
            <div
              style={{
                width: "100%",
                height: "100%"
              }}
              className={`AnimeBox`}
            >
              <div
                className="AnimeBox__animation"
                id={id}
                style={animationStyle}
                onMouseOver={handleOnMouseOver}
                onMouseOut={handleOnMouseOut}
              />
            </div>
          </div>
        </div>
        <div className="AnimationItem__row2">
          <div className="AnimationItem__name">{name}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AnimationItemWrapper(DrawerAnimaItem);
