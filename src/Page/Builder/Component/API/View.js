import React from "react";
import { FormattedMessage } from "react-intl";
import APILibrary from "../../utils/apiLibrary";
import closeImg from "../../../../Image/builder/x-copy-3.svg";
import closeImg_darkmode from "../../../../Image/builder/x-copy-3_darkmode.svg";
import searchImg from "../../../../Image/builder/group-search.svg";
import { getColorTheme } from "../../utils/colorThemeUtil";
import "./index.scss";
import ButtonIndicator from "../ButtonIndicator";

const getTip = name => {
  const language = localStorage.getItem("wizLang");

  const api = APILibrary.getAPI(name);
  if (!api || !api.tip) {
    return null;
  }
  const tip = api.tip;

  if (!getApiDescription(tip.description, language)) {
    return null;
  }

  function getApiDescription(description, language) {
    if (description === undefined) {
      return "";
    } else {
      return description[language];
    }
  }

  return (
    <div className="APITip">
      <div className="APITipDesc">
        {getApiDescription(tip.description, language)}
      </div>
      {tip.params &&
        tip.params.map((param, index) => {
          return (
            <div key={index} className="APITipParam">
              <div className="APITipParamTitle">{param.name}</div>
              <div className="APITipParamDesc">
                {getApiDescription(param.description, language)}
              </div>
            </div>
          );
        })}
      {tip.description && (
        <div className="APITipDesc2">
          {getApiDescription(tip.description2, language)}
        </div>
      )}
      {api.snippet && (
        <div>
          <div className="APITipSnippet">
            <FormattedMessage id="ID_API_DESCRIPTION_EXAMPLE" />
          </div>
          <pre className="APITipSnippetCode">{api.snippet}</pre>
        </div>
      )}
    </div>
  );
};

export default function(props) {
  const {
    selectedCategory,
    selectedAPI,
    handleSelectCategory,
    handleSelectAPI,
    handleSelectTab,
    handleChangeZIndex,
    apiList,
    apiItems,
    formatMessage,
    handleOnChange,
    searchValue
  } = props;
  const colorTheme = getColorTheme();

  return (
    <div className="API" onMouseDown={() => handleChangeZIndex("api")}>
      <div className="APITitleLine handle">
        <div className="APITitle">API</div>
        <div className="APIClose" onClick={() => handleSelectTab("api")} onTouchEnd={() => handleSelectTab("api")}>
          <img
            src={colorTheme === "darkMode" ? closeImg_darkmode : closeImg}
            alt="img"
          />
        </div>
      </div>
      <div className="APISearch">
        <input
          onChange={handleOnChange}
          type="text"
          placeholder="Search"
          value={searchValue}
        />
        <img src={searchImg} alt="img" />
      </div>
      <div className="APIContent">
        <div className="APICategories">
          {apiList.map((api, index) => {
            return (
              <ButtonIndicator buttonId={api.name} key={index}>
                <div
                  key={index}
                  onClick={() => handleSelectCategory(api.name)}
                  className={`APICategory ${selectedCategory === api.name &&
                    "APICategoryActive"}`}
                >
                  {formatMessage({ id: api.name })}
                </div>
              </ButtonIndicator>
            );
          })}
        </div>
        <div className="APIItems">
          {apiItems.map((api, index) => {
            const isSelected = api.name === selectedAPI;
            return (
              <ButtonIndicator buttonId={api.name}>
                <div
                  onClick={() => handleSelectAPI(api.name)}
                  className="APIItem"
                  key={index}
                >
                  <div
                    className={`APIItemName ${isSelected &&
                      "APIItemNameActive"}`}
                  >
                    {api.name}
                  </div>
                  {isSelected && getTip(api.name)}
                </div>
              </ButtonIndicator>
            );
          })}
        </div>
      </div>
    </div>
  );
}
