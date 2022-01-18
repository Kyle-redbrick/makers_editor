import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss";
import { DEFAULT_PROFILE_IMAGES } from "../../../../../../Common/Util/Constant";
const IconSelector = props => {
  const {
    handleUploadFile,
    handleUploadIcon,
    handleSelectIcon,
    customIconUrl,
    handleSubmit,
    intl
  } = props;

  const iconUrls = ["add", customIconUrl, ...DEFAULT_PROFILE_IMAGES].filter(
    element => element !== null
  );
  return (
    <div className="IconSelector">
      <input
        id="uploadInput"
        type="file"
        hidden
        onChange={handleUploadFile}
        accept=".jpg,.png,.jpeg"
      />
      <div className="IconSelector_IconWrap">
        {iconUrls.map((iconUrl, index) => {
          return index === 0 ? (
            <div key={index} className="IconSelector-item">
              <div className="IconSelector-iconWrap" onClick={handleUploadIcon}>
                <div className="IconSelector-icon">
                  <div className="IconSelector-add">{intl.formatMessage({ id: "ID_ICON_SETTING_ADD" })}</div>
                </div>
              </div>
            </div>
          ) : (
            <div key={index} className="IconSelector-item">
              <div
                className="IconSelector-iconWrap"
                onClick={() => {
                  handleSelectIcon(iconUrl);
                }}
              >
                <img className="IconSelector-icon" src={iconUrl} alt="img" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="IconSelector-submit" onClick={handleSubmit}>
        {intl.formatMessage({ id: "ID_ICON_SETTING_SUBMIT" })}
      </div>
    </div>
  );
};

export default injectIntl(IconSelector);
