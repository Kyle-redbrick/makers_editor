import React from "react";
import "./index.scss";
import closeImg from "../../../../Image/builder/x-copy-3.svg";
import closeImg_darkmode from "../../../../Image/builder/x-copy-3_darkmode.svg";
import "../Chat/Component/ChatBot/Component/highlight-wizschool.scss";
import { getColorTheme } from "../../utils/colorThemeUtil";

export default function(props) {
  const {
    handleSelectTab,
    handleChangeZIndex,
    lists,
    selectedInx,
    handleSelectItem,
    copyToClipboard
  } = props;
  const curItem = lists[selectedInx];
  const colorTheme = getColorTheme(getColorTheme);
  const lang = localStorage.getItem("lang");
  return (
    <div className="Snippet" onMouseDown={() => handleChangeZIndex("snippet")}>
      {/* title */}
      <div className="SnippetTitleLine handle">
        <div className="SnippetTitle">Snippet</div>
        <div
          className="SnippetClose"
          onClick={() => handleSelectTab("snippet")}
          onTouchEnd={() => handleSelectTab("snippet")}
        >
          <img
            src={colorTheme === "darkMode" ? closeImg_darkmode : closeImg}
            alt="img"
          />
        </div>
      </div>

      {/* content */}
      <div className="SnippetContent">
        <div className="SnippetContent__left">
          <ul className="left__list">
            {lists.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`list__item ${
                    selectedInx === index ? "list__item__selected" : ""
                  }`}
                  onClick={() => handleSelectItem(index)}
                >
                  {item.title[lang]}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="SnippetContent__right">
          <div className="right__contents">
            <div className="contents__title">{curItem.title[lang]}</div>
            {curItem.description && (
              <div className="contents__desc">{curItem.description[lang]}</div>
            )}

            <video
              key={curItem.video}
              className="contents__video"
              autoPlay={true}
              muted={true}
              controls={false}
              loop={true}
            >
              <source src={require(`../../../../${curItem.video}`)} />
            </video>

            <div className="contents__steps">
              {curItem.steps.map((step, index) => {
                const isNeedIndex = curItem.steps.length !== 1;
                return (
                  <div key={index} className="step__item">
                    <div className="step__item__title">
                      {`${isNeedIndex ? `${index + 1}. ` : ""}${step.title[lang]}`}
                    </div>
                    {step.description && (
                      <div className="item step__item__desc">
                        {step.description[lang]}
                      </div>
                    )}
                    {/* {step.image && (
                      <div className="item step__item__image">
                        <img
                          src={require(`../../../../${step.image[lang]}`)}
                          alt="step"
                        />
                      </div>
                    )} */}
                    {step.javascriptCode && (
                      <div className="item step__item__code">
                        <div
                          className="javascript__code"
                          dangerouslySetInnerHTML={{
                            __html: step.javascriptCode[lang]
                          }}
                        />
                        <button
                          className="code__copy__btn"
                          onClick={() =>
                            copyToClipboard(step.javascriptCode[lang])
                          }
                        ></button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
