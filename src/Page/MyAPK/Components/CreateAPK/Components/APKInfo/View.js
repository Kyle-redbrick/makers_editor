import React from "react";
import "./index.scss";
import emptyIcon from "../../../../../../Image/icon-emptyimage-apk.svg";
import checkIcon from "../../../../../../Image/icon-check-apk.svg";
export default function View(props) {
  const {
    appName,
    packageName,
    appIcon,
    isAvailablePackageName,
    onClickpackageNameReset,
    appNameWarning,
    packageNameWarning,
    appIconWarning
  } = props;
  const { onClickPackageNameCheck, onChangeInput, onClickNext } = props;
  return (
    <div className={`APKInfo`}>
      <div className="APKInfo_inner">
        <div className="apkinfo-title">세부 정보를 입력해 주세요</div>

        <div className="apkinfo_appName">
          <div className="apkinfo_appName-title">앱 이름</div>
          <input
            className={`apkinfo_appName-input ${appNameWarning &&
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
          <div className="apkinfo_pn_rightWrap">
            <div className="apkinfo_pn_rw_topWrap">
              <div className="apkinfo_packageName-text">io.wizschool.</div>
              <input
                className={`apkinfo_packageName-input apkinfo_packageName-input__${
                  isAvailablePackageName ? "unactive" : "active"
                }`}
                type="text"
                name="packageName"
                placeholder={"고유한 패키지 이름을 입력하세요"}
                value={packageName}
                onChange={onChangeInput}
                readOnly={isAvailablePackageName}
              />
              <div
                className={`apkinfo_packageName-checkBtn  ${packageNameWarning &&
                  "apkinfo-warning"}`}
                onClick={() => {
                  if (isAvailablePackageName) {
                    onClickpackageNameReset();
                  } else {
                    onClickPackageNameCheck();
                  }
                }}
              >
                {isAvailablePackageName ? (
                  <span>변경하기</span>
                ) : (
                  <>
                    <img src={checkIcon} alt="check" />
                    <span>중복확인</span>
                  </>
                )}
              </div>
            </div>
            <div className="apkinfo_pn_rw-description">
              {`패키지 이름이란, 어플리케이션을 구분하는 고유한 값으로,
여러분이 만든 앱을 디바이스에 설치했을 때, 다른 앱들과 구분하는 역할을 합니다.
`}
              <span>
                패키지 이름은 변경할 수 없으므로, 신중하게 작성해주세요.
                <br />
                패키지 이름은 영문 및 숫자로만 가능하며 시작은 반드시 영문이어야
                합니다.
              </span>
            </div>
          </div>
        </div>
        <div className="apkinfo_appIcon">
          <div className="apkinfo_appIcon-title">앱 아이콘</div>
          <div
            className={`apkinfo_appIcon-icon ${appIconWarning &&
              "apkinfo-warning"}`}
          >
            {appIcon ? (
              <img src={appIcon} alt="icon" />
            ) : (
              <img
                className="apkinfo_appIcon-icon-empty"
                src={emptyIcon}
                alt="icon"
              />
            )}
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
            name="appIcon"
            onChange={onChangeInput}
            hidden
          />
          <div className="apkinfo_appIcon-addBtn-description">
            <span>앱 아이콘은 png파일만 지원합니다.</span>
          </div>
        </div>

        <div className="apkinfo_footer">
          <div className="apkinfo_footer-nextBtn" onClick={onClickNext}>
            다음 단계
          </div>
        </div>
      </div>
    </div>
  );
}
