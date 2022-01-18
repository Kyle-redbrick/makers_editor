import React from "react";
import "./index.scss";
import CloseImage from "../../../../Image/close-btn-popup.svg";
import { FormattedMessage, injectIntl } from "react-intl";

const View = props => {
  const {
    itemArray,
    handleCloseBtn,
    handleLoadprojectBtn,
    handleProjectItem,
    selectedProject
  } = props;
  return (
    <React.Fragment>
      <div className={`ProjectListContainer`}>
        <div className={`Modal__overlay`} />
        <div className="Modal__layout">
          <div className="Modal__header">
            <div className="Modal__title">
              <FormattedMessage id="ID_BUILDER_PROJECTLIST_TITLE" />
            </div>
            <img
              className="Modal__closeBtn"
              src={CloseImage}
              alt="closeBtn"
              onClick={handleCloseBtn}
            />
          </div>

          <div className="Modal__content">
            <div className="ProjectList_ListArea">
              {Object.keys(itemArray).map((key, index) => {
                let isSelected =
                  itemArray[key].id === selectedProject ? "on" : "off";
                return (
                  <div
                    className={`list_ItemBox ItemBox--${isSelected}`}
                    key={index}
                    onClick={() => handleProjectItem(itemArray[key].id)}
                  >
                    <div className="list_Item_row">
                      <div className="list_Item_title">
                        {itemArray[key].title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="ProjectList__row">
            <button className="two_btn btn_no" onClick={handleCloseBtn}>
              <FormattedMessage id="ID_BUILDER_PROJECTLIST_CANCEL" />
            </button>
            <button className="two_btn btn_yes" onClick={handleLoadprojectBtn}>
              <FormattedMessage id="ID_BUILDER_PROJECTLIST_OK" />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default injectIntl(View);
