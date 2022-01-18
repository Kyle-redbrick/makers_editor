import React from "react";
import { injectIntl } from "react-intl";
import Layout from "../../../../Common/Component/Layout";
import "./index.scss";
import WizTooltip from "../../../../Common/Component/Tooltip";
import UserIconWrapper from "../../../../Common/Component/UserIconWrapper";
import IconSelector from "./Components/IconSelector";
import tooltipIcon from "../../../../Image/icon-tooltip.svg";

function View(props) {
  const {
    handleUploadIcon,
    handleUploadFile,
    handleSelectIcon,
    handleSelectTab,
    handleSubmit,
    selectedTab,
    selectedIconUrl,
    profile,
    TAB_TYPE,
    customIconUrl,
    onClickMobileTooltip,
    intl
  } = props;

  // logic
  let content;
  switch (selectedTab) {
    case TAB_TYPE.ICON.title:
      content = (
        <IconSelector
          handleUploadFile={handleUploadFile}
          handleUploadIcon={handleUploadIcon}
          handleSelectIcon={handleSelectIcon}
          customIconUrl={customIconUrl}
          handleSubmit={handleSubmit}
          profile={profile}
        />
      );
      break;
    case TAB_TYPE.EDGE.title:
      content = (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {intl.formatMessage({ id: "ID_ICON_SETTING_DEFAULT_MSG" })}
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <Layout>
      <div className="Page--Setting">
        <div className="Setting--Inner">
          <section className="Setting_Head">
            <div className="Setting_Head-iconWrap">
              {selectedIconUrl && <UserIconWrapper iconSrc={selectedIconUrl} />}
            </div>
          </section>

          <section className="Setting_SelectView">
            <div className="Setting_Tabs">
              {Object.keys(TAB_TYPE).map((tab, index) => (
                <div
                  key={index}
                  className={`Setting_Tabs-tap`}
                  style={
                    selectedTab === TAB_TYPE[tab].title
                      ? { color: "white" }
                      : {}
                  }
                  onClick={() => {
                    handleSelectTab(TAB_TYPE[tab].title);
                  }}
                >
                  <div className="Setting_Tabs-title">
                    {TAB_TYPE[tab].title}
                  </div>
                  <div className="Setting_Tabs-tooltip">
                    <WizTooltip
                      contentTitle={TAB_TYPE[tab].tooltip}
                      container={
                        <img
                          src={tooltipIcon}
                          alt="img"
                          style={{ width: "12px", height: "12px" }}
                        />
                      }
                      backgroundColor="#2c2f4f"
                    />
                  </div>
                  <img
                    className="Setting_Tabs-tooltipMobile"
                    src={tooltipIcon}
                    alt="img"
                    onClick={() => {
                      onClickMobileTooltip(TAB_TYPE[tab].tooltip);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="Setting_Tabs_Ani">
              <div
                className="Setting_Tabs_Ani-bar"
                style={
                  selectedTab === TAB_TYPE.ICON.title
                    ? { left: "0px" }
                    : selectedTab === TAB_TYPE.EDGE.title
                    ? { left: "calc(50%)" }
                    : {}
                }
              />
            </div>
            <div className="Setting_Contents">{content}</div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default injectIntl(View);