import React, { useState } from "react";
import "./index.scss";
import moment from "moment";
import { WIZLAB_APK_STATUS } from "../../../../Common/Util/Constant";
import linkIcon from "../../../../Image/icon-link-apkproject.svg";
import { showPopUp } from "../../../../Common/Component/PopUp";
import ApkEditPopup from "../APKEditPopup";
import * as request from "../../../../Common/Util/HTTPRequest";
import loadingIcon from "../../../../Image/icon-loading-apk.svg";
import shareIcon from "../../../../Image/icon-share-m.svg";
import APKSharePopup from "../APKsharePopup";
const APKItem = props => {
  const { apk, userName } = props;
  const { onClickProject, onClickEditPopupSubmit } = props;
  if (!apk || !apk.apkVersion) return <></>;
  const [isShowRetryLoading, setIsShowRetryLoading] = useState(false);
  // const isMobile = window.innerWidth < 1080;

  const getRightContent = isMobile => {
    let content;
    switch (apk.apkVersion.status) {
      case WIZLAB_APK_STATUS.ONGOING:
        content = (
          <div
            className={`APKItem_rightWrap_ongoing${isMobile ? "_mobile" : ""}`}
          >
            <div className="APKItem_rightWrap_ongoing-text">APK 제작중</div>
            <img src={loadingIcon} alt="loading" />
          </div>
        );
        break;
      case WIZLAB_APK_STATUS.CANCEL:
        content = (
          <div
            className={`APKItem_rightWrap_cancel${isMobile ? "_mobile" : ""}`}
          >
            <div className="APKItem_rw_cc_flexWrap">
              {isShowRetryLoading ? (
                <img src={loadingIcon} alt="loading" />
              ) : (
                <>
                  <div className="APKItem_rw_cc_fw-text">APK 제작 실패</div>
                  <div
                    className="APKItem_rw_cc_fw-retryBtn"
                    onClick={onClickRetryCreatingAPK}
                  >
                    재시도
                  </div>
                </>
              )}
            </div>
          </div>
        );
        break;
      case WIZLAB_APK_STATUS.COMPLETE:
        content = (
          <div className={`APKItem_rightWrap_complete`}>
            <div className={`rightWrap_cancel_top`}>
              {apk.apkVersion.apkUrl && (
                <img
                  className={`shareImg`}
                  src={shareIcon}
                  alt="img"
                  onClick={onClickShare}
                />
              )}
            </div>
            <div className={`rightWrap_cancel_bottom`}>
              <div className={`apk__edit`} onClick={onClickUpdateAPK}>
                수정
              </div>
              <div className={`apk__download`} onClick={onClickPCDownload}>
                다운로드
              </div>
            </div>
          </div>
        );
        break;

      default:
        break;
    }
    return content;
  };

  const onClickUpdateAPK = () => {
    showPopUp(
      <ApkEditPopup
        apk={apk}
        onClickEditPopupSubmit={onClickEditPopupSubmit}
      />,
      { defaultPadding: false }
    );
  };

  const onClickPCDownload = () => {
    window.open(apk.apkVersion.apkUrl);
  };

  const onClickShare = () => {
    showPopUp(<APKSharePopup apk={apk} userName={userName} />);
  };

  const onClickRetryCreatingAPK = async () => {
    const updateInfo = await postUpdateAPK();
    if (!updateInfo || !updateInfo.success) {
      return;
    }
    setIsShowRetryLoading(true);
  };

  const postUpdateAPK = async () => {
    const { appName, appIcon } = apk.apkVersion;
    const updateInfo = await request
      .updateWizlabAPK({
        appName,
        appIcon,
        packageName: apk.packageName
      })
      .then(res => res.json())
      .catch(e => {
        console.error(e);
        return undefined;
      });
    return updateInfo;
  };

  return (
    <div className="APKItem">
      <div className="APKItem_header">
        <div className="APKItem_h-appName">{apk.apkVersion.appName}</div>
        <div className="APKItem_h_projectBtnWrap" onClick={onClickProject}>
          <div className="APKItem_h_pbw-text">프로젝트</div>
          <img src={linkIcon} alt="img" />
        </div>
      </div>
      <div className="APKItem_content">
        <div className="APKItem-icon">
          <img src={apk.apkVersion.appIcon} alt="img" />
        </div>
        <div className="APKItem_apkInfo">
          <div className="APKItem_ai_topwrap">
            <div className="APKItem_ai_tw-packageName">{apk.packageName}</div>
            <div className="APKItem_ai_tw-version">
              {`v${apk.apkVersion.version}.0`}
            </div>
          </div>
          <div className="APKItem_ai_bottomWrap">
            <div className="APKItem_ai_flexWrap">
              <div className="APKItem_ai_fw-createText">생성일</div>
              <div className="APKItem_ai-createdAt">
                {moment(apk.apkVersion.createdAt).format("YYYY.M.D")}
              </div>
            </div>

            <div className="APKItem_ai_flexWrap">
              <div className="APKItem_ai_fw-updateText">최근 업데이트</div>
              <div className="APKItem_ai-updatedAt">
                {moment(apk.apkVersion.updatedAt).format("YYYY.M.D")}
              </div>
            </div>
          </div>
        </div>
        {getRightContent(false)}
      </div>
    </div>
  );
};

export default APKItem;
