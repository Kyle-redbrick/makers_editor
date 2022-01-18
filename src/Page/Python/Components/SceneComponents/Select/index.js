import React from "react";
import "./index.scss";

const Select = props => {
  const { currentScriptData, /*handleNextScript,*/ handleNextDestination } = props;

  return (
    <div className="pythonSelect">
      <div className="buttonWrapper">
        {currentScriptData.options.map((option, i) => {
          return (
            <button
              key={option + i}
              onClick={() => handleNextDestination(option.destination)}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Select;
