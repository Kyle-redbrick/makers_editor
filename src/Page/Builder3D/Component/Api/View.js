import React from "react";
import closeImg from "../../../../Image/builder/x-copy-3.svg";
import searchImg from "../../../../Image/builder/group-search.svg";
import "./index.scss";

function View(props) {
  const {
    selectedCategory,
    selectedApi,
    onCategorySelect,
    onApiSelect,
    formatMessage,
    apiLibrary,
    apiList,
    apiItems,
    onChange,
    searchValue,
    onClickClose
  } = props;

  const getTip = name => {
    const language = "ko";
    const api = apiLibrary.getAPI(name);
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
            <div className="APITipSnippet">사용예시</div>
            <pre className="APITipSnippetCode">{api.snippet}</pre>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="API rndResizeHandler">
      <div className="APITitleLine handle rndDragHandler">
        <div className="APITitle">API</div>
        <div className="APIClose" onClick={onClickClose}>
          <img src={closeImg} alt="img" />
        </div>
      </div>

      <div className="APIContent">
        <div className="APICategories">
          {apiList.map((api, index) => {
            return (
              // <ButtonIndicator buttonId={api.name} key={index}>
              <div
                key={index}
                onClick={() => onCategorySelect(api.name)}
                className={`APICategory ${selectedCategory === api.name &&
                  "APICategoryActive"}`}
              >
                {formatMessage({ id: api.name })}
              </div>
              // </ButtonIndicator>
            );
          })}
        </div>
        <div className="APIRight">
          <div className="APISearch">
            <input
              onChange={onChange}
              type="text"
              placeholder="Search"
              value={searchValue}
            />
            <img src={searchImg} alt="img" />
          </div>
          <div className="APIItems">
            {apiItems.map((api, index) => {
              const isSelected = api.name === selectedApi;
              return (
                // <ButtonIndicator buttonId={api.name}>
                <div
                  onClick={() => onApiSelect(api.name)}
                  className={`APIItem ${isSelected ? "active" : ""}`}
                  key={index}
                >
                  <div
                    className={`APIItemName ${
                      isSelected ? "APIItemNameActive" : ""
                    }`}
                  >
                    {api.name}
                  </div>
                  {isSelected && getTip(api.name)}
                </div>
                // </ButtonIndicator>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
