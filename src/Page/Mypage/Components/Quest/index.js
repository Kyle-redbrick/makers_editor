import React from "react";
import "./index.scss";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
const Quest = props => {
  return (
    <div className="Quest">
      <div className="Quest_GridContainer">
        {Array(12)
          .fill(1)
          .map((item, index) => (
            <div key={index} className="Quest_GridItem">
              <CircularProgressbarWithChildren
                value={33}
                strokeWidth={6}
                styles={{
                  root: {
                    display: "flex",
                    width: "162px",
                    height: "162px"
                  },
                  path: {
                    stroke: "#2c2f4f"
                  }
                }}
              >
                <div className="Quest_GridItem-icon" />
              </CircularProgressbarWithChildren>
              <div className="Quest_GridItem-date">2020.04.10</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Quest;
