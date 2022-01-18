import React, { useState, useEffect } from "react";
import "./index.scss";
import ReactDOM from "react-dom";
import * as request from "../../../../Common/Util/HTTPRequest";
import { URL } from "../../../../Common/Util/Constant";
import exclamationImg from "../../../../Image/exclamation-mark.svg";
const ApkEditPopup = props => {
  const { apk } = props;
  const { onClickEditPopupSubmit } = props;
  const dismiss = () => {
    const popup = document.getElementById("popup");
    if (!popup) return;
    ReactDOM.render(null, popup);
    document.body.classList.remove("body-unsrollable");
  };

  const [appName, setAppName] = useState(apk.apkVersion.appName);
  const [appIcon, setAppIcon] = useState(apk.apkVersion.appIcon);
  const [isValidAppName, setIsValidAppName] = useState(true);
  const [isValidAppIcon, setIsValidAppIcon] = useState(true);

  useEffect(() => {
    checkIsValidAppName();
  }, [appName]);

  useEffect(() => {
    checkIsValidAppIcon();
  }, [appIcon]);

  const checkIsValidAppName = () => {
    const emptyString = appName === "";
    const whiteSpace = appName.length > 0 ? appName[0] === " " : false;
    const isValidAppName = !emptyString && !whiteSpace;
    setIsValidAppName(isValidAppName);
  };

  const onChangeInput = async e => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "appName":
        setAppName(value);
        break;

      case "appIcon":
        const file = e.target.files[0];
        if (!file) return;
        const filename = await getUploadedImageName(file);
        const url = URL.S3_WIZLABAPK + "/" + filename;
        setAppIcon(url);
        break;
      default:
        break;
    }
  };

  const checkIsValidAppIcon = () => {
    const emptyIcon = appIcon === undefined;
    setIsValidAppIcon(!emptyIcon);
  };

  const getUploadedImageName = async file => {
    const uploadInfo = await uploadImage(file);
    if (!uploadInfo || !uploadInfo.success) {
      // error handling
      return;
    }
    return uploadInfo.filename;
  };

  const uploadImage = async file => {
    const data = new FormData();
    data.append("file", file);
    const json = await request
      .uploadWizlabAPKIcon(data)
      .then(res => res.json())
      .catch(e => {
        console.error(e.message);
        return undefined;
      });

    return json;
  };

  const onClickEdit = async () => {
    if (isValidAppName && isValidAppIcon) {
      const updateInfo = await postUpdateAPK();
      if (!updateInfo || !updateInfo.success) {
        return;
      }
      onClickEditPopupSubmit(apk);
      dismiss();
    }
  };

  const postUpdateAPK = async () => {
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
    <div className="ApkEditPopup">
      <div className="ApkEditPopup_inner">
        <div className="ApkEditPopup-title">APK 세부 정보를 입력해 주세요</div>
        <div className="ApkEditPopup_ft-hint">
          <img src={exclamationImg} className="hint__img" alt="hint" />
          “APK 수정”에서는 앱 이름과 아이콘 변경만 가능합니다. 앱 업데이트는
          프로젝트 퍼블리싱 시 자동 반영됩니다.
        </div>
        <div className="ApkEditPopup_appName">
          <div className="ApkEditPopup_appName-title">앱 이름</div>
          <input
            className={`ApkEditPopup_appName-input ${!isValidAppName &&
              "ApkEditPopup-warning"}`}
            type="text"
            name="appName"
            placeholder={`${apk.apkVersion.appName}`}
            value={appName}
            onChange={onChangeInput}
          />
        </div>
        <div className="ApkEditPopup_packageName">
          <div className="ApkEditPopup_packageName-title">패키지 이름</div>
          <div className="ApkEditPopup_pn_rightWrap">
            <div className="ApkEditPopup_pn_rw_topWrap">
              <div className="ApkEditPopup_packageName-text">{`io.wizschool.${apk.packageName}`}</div>
            </div>
            <div className="ApkEditPopup_pn_rw-description">
              {`패키지 이름은 변경할 수 없습니다.`}
            </div>
          </div>
        </div>
        <div className="ApkEditPopup_appIcon">
          <div className="ApkEditPopup_appIcon-title">앱 아이콘</div>
          <div className={`ApkEditPopup_appIcon-icon`}>
            <img src={appIcon} alt="icon" />
          </div>
          <div
            className="ApkEditPopup_appIcon-addBtn"
            onClick={() => {
              document
                .getElementById(`ApkEditPopup_appIcon-input-appIcon`)
                .click();
            }}
          >
            {appIcon ? "수정하기" : "추가하기"}
          </div>
          <input
            id={`ApkEditPopup_appIcon-input-appIcon`}
            type="file"
            accept=".png"
            name="appIcon"
            onChange={onChangeInput}
            hidden
          />
        </div>
        <div className="ApkEditPopup_footer">
          <div className="ApkEditPopup_ft-editBtn" onClick={onClickEdit}>
            APK 수정
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApkEditPopup;
