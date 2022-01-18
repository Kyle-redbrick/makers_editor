import React from "react";
import "./index.scss";
import ReactDOM from "react-dom";

const ApkPayLinkPopup = props => {
  const { onClickPay, onCancel } = props;

  const dismiss = () => {
    const popup = document.getElementById("popup");
    if (!popup) return;
    ReactDOM.render(null, popup);
    document.body.classList.remove("body-unsrollable");
  };
  return (
    <div className="ApkPayLinkPopup">
      <div className="ApkPayLinkPopup_inner">
        <div className="ApkPayLinkPopup-title">[APK 제작 쿠폰]이 없어요!</div>
        <div className="ApkPayLinkPopup-subtitle">{`APK를 만들기 위해서 APK 제작 쿠폰이 필요합니다.\nAPK 제작 쿠폰을 구매하시겠습니까?`}</div>
        <div className="ApkPayLinkPopup_btnWrap">
          <div
            className="ApkPayLinkPopup_bw-cancel"
            onClick={() => {
              dismiss();
              if (onCancel) {
                onCancel();
              }
            }}
          >
            취소
          </div>
          <div
            className="ApkPayLinkPopup_bw-confirm"
            onClick={() => {
              dismiss();
              onClickPay();
            }}
          >
            충전하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApkPayLinkPopup;
