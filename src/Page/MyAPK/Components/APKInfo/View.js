import React from "react";
import "./index.scss";
export default function View(props) {
  const {
    isShowAPKInfo,
    appName,
    packageName,
    appIcon,
    isValidAppName,
    isValidPackageName,
    isValidAppIcon
  } = props;
  const {
    onClickDuplicationCheck,
    onClickCreate,
    onChangeInput,
    onChangeIconImage
  } = props;
  return (
    <div className={`APKInfo ${isShowAPKInfo && "APKInfo-visible"}`}>
      <div className="apkinfo-overlay" />
      <div className="apkinfo_container">
        <div className="apkinfo-title">APK 정보를 입력해 주세요</div>

        <div className="apkinfo_appName">
          <div className="apkinfo_appName-title">앱 이름</div>
          <input
            className={`apkinfo_appName-input ${!isValidAppName &&
              "apkinfo-warning"}`}
            type="text"
            name="appName"
            placeholder={"앱 이름을 입력하세요"}
            value={appName}
            onChange={onChangeInput}
          />
        </div>
        <div className="apkinfo_packageName">
          <div className="apkinfo_packageName-title">패키지 이름</div>
          <input
            className={`apkinfo_packageName-input`}
            type="text"
            name="packageName"
            placeholder={"고유한 패키지 이름을 입력하세요"}
            value={packageName}
            onChange={onChangeInput}
          />
          <div
            className={`apkinfo_packageName-checkBtn  ${!isValidPackageName &&
              "apkinfo-warning"}`}
            onClick={onClickDuplicationCheck}
          >
            {isValidPackageName ? "확인완료" : "중복확인"}
          </div>
        </div>
        <div className="apkinfo_appIcon">
          <div className="apkinfo_appIcon-title">앱 아이콘</div>
          <div
            className={`apkinfo_appIcon-icon ${!isValidAppIcon &&
              "apkinfo-warning"}`}
          >
            <img src={appIcon} alt="icon" />
          </div>
          <div
            className="apkinfo_appIcon-addBtn"
            onClick={() => {
              document.getElementById(`apkinfo_appIcon-input-appIcon`).click();
            }}
          >
            추가하기
          </div>
          <input
            id={`apkinfo_appIcon-input-appIcon`}
            type="file"
            accept=".png"
            onChange={onChangeIconImage}
            hidden
          />
        </div>
        <div onClick={onClickCreate} className="apkinfo-createBtn">
          APK 생성
        </div>
      </div>
    </div>
  );
}
