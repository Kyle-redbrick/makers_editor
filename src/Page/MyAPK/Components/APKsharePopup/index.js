import React, { useState } from "react";
import "./index.scss";
import * as request from "../../../../Common/Util/HTTPRequest";
import QRCode from "qrcode.react";
import QRBackImg from "../../../../Image/builder/group-43.svg";
import kakaoImg from "../../../../Image/kakao-talk.svg";
import linkImg from "../../../../Image/link.svg";
import PhoneDropDown from "../../../../Common/Component/QRPopup/PhoneDropDown";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";

const APKSharePopup = props => {
  const { apk, userName } = props;

  const [phoneNum, setPhoneNum] = useState("");
  const [countryCode, setCountryCode] = useState("+82");
  const handleCountryChange = countryCode => {
    setCountryCode(countryCode);
  };

  const handleInputChange = e => {
    setPhoneNum(e.target.value);
  };

  const getIsPhoneNumValid = () => {
    return phoneNum && phoneNum.length >= 11;
  };

  const handleSubmit = async () => {
    if (!getIsPhoneNumValid()) {
      showPopUp(
        <PopUp.OneButton
          title={"핸드폰 번호를 확인해주세요."}
          buttonName={"닫기"}
        />
      );
      return;
    }

    let url = apk.apkVersion.apkUrl;
    let appName = apk.apkVersion.appName;

    const params = {
      countryCode,
      localNumber: phoneNum,
      url,
      appName,
      name: userName
    };

    let res = await request.smsApkDownloadLink(params);
    res = await res.json();
    if (res.success) {
      showPopUp(
        <PopUp.OneButton title={"sms가 전송되었습니다."} buttonName={"확인"} />
      );
    } else {
      showPopUp(
        <PopUp.OneButton
          title={"sms 전송에 실패했습니다."}
          buttonName={"확인"}
        />
      );
    }
  };

  const shareKakao = () => {
    let url = apk.apkVersion.apkUrl;
    let appName = apk.apkVersion.appName;
    let appIcon = apk.apkVersion.appIcon;

    let params = {
      appLink: apk.apkVersion.apkUrl ? url.split("/")[3] : "",
      projectLink: `game?pId=${apk.pId}`,
      img: appIcon,
      name: userName,
      appName
    };

    window.Kakao.Link.sendCustom({
      templateId: 42344,
      templateArgs: params,
      fail: function(error) {
        console.error("error :", error);
      }
    });
  };
  const copyLink = () => {
    let url = apk.apkVersion.apkUrl;
    var textarea = document.createElement("textarea");
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999);
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };
  return (
    <div className="apkSharePopup">
      <div className="apkSharePopup__inner">
        <div className="apkSharePopup__title">{`"${apk.apkVersion.appName}" 공유하기`}</div>
        <div className="apkSharePopup__top">
          <div className="top__qrcode">
            <div className="qrcode__code">
              <img src={QRBackImg} className="code__backImg" alt="qr back" />
              <QRCode className="code__img" value={apk.apkVersion.apkUrl} />
            </div>
            <div className="qrcode__text">
              {`휴대폰으로 QR코드를 찍으면, 
      바로 다운로드 됩니다.`}
            </div>
          </div>
        </div>
        <div className="apkSharePopup__middle">
          <div className="middle__line" />
          <div>또는</div> <div className="middle__line" />
        </div>

        <div className="apkSharePopup__bottom">
          <div className="bottom__phone">
            <PhoneDropDown
              phoneNum={phoneNum}
              countryCode={countryCode}
              handleSelectItem={handleCountryChange}
              handleInputChange={handleInputChange}
            />
            <div className="PhoneDD__submitBtn" onClick={handleSubmit} />
          </div>
          <div className="bottom__button bottom__kakao" onClick={shareKakao}>
            <img src={kakaoImg} alt="kakao" />
            카카오톡으로 공유하기
          </div>
          <div className="bottom__button bottom__link" onClick={copyLink}>
            <img src={linkImg} className="link__img" alt="copy" />
            다운로드 링크 복사하기
          </div>
          <div className="bottom__text">
            {`･공유시, APK 다운로드 링크가 공유됩니다.
･앱 설치를 위해서 디바이스에서
“출처를 알 수 없는 앱 설치” 활성화가 필요합니다.`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APKSharePopup;
