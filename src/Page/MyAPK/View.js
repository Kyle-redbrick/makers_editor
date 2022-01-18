import React from "react";
import Layout from "../../Common/Component/Layout";
import "./index.scss";
import APKItem from "./Components/APKItem";
import androidImg from "../../Image/android-pc.svg";
import externalLinkImg from "../../Image/external-link-pc.svg";
import notExistImg from "../../Image/apk-empty.svg";

export default function View(props) {
  const { apkInfo, userinfo } = props;
  const {
    onClickCreateAPK,
    onClickProject,
    onClickUpdateAPK,
    onClickPay,
    onClickHistory,
    onClickEditPopupSubmit,
    isFromBuilder
  } = props;
  let contents = (
    <div className="Page--MyAPK">
      <section className="myapk_header">
        <div className="myapk_h_inner">
          <div className="header__row--top">
            <div className="myapk_h_in_lw_tw-title">나의 APK</div>
            <div className="myapk_h_in_rw-createBtn" onClick={onClickCreateAPK}>
              APK 만들기
            </div>
          </div>
          <div className="header__row--middle">
            <img src={androidImg} className="middle__icon" alt="icon" />
            <div className="middle__text">
              <div className="middle__title">
                위즈랩에서 만든 앱을 안드로이드 설치파일(APK)로 만들어보세요!
              </div>
              <span className="middle__desc">
                {`여러분의 앱을 APK로 만들면, 앱을 단독으로 배포할 수 있습니다. 또한 APK는 구글 플레이 스토어에 앱을 등록하는 데 필요합니다.  
여러분이 구글 플레이 스토어에 앱을 등록하기 위해서는`}
              </span>

              <span
                className="middle__desc emphasis"
                onClick={() =>
                  window.open(
                    "https://developer.android.com/distribute/best-practices/launch/launch-checklist?hl=ko"
                  )
                }
              >
                {` 별도의 등록과정`}
                <img
                  src={externalLinkImg}
                  className="middle__desc__img"
                  alt="desc"
                />
              </span>
              <span className="middle__desc">{`을 거쳐야 합니다.`}</span>
            </div>
          </div>
          <div className="myapk_header_inner_bottom">
            <div className="myapk_h_in_lw_bottomWrap">
              <div className="myapk_h_in_lw_bw-couponText">APK 제작 티켓</div>
              <div className="myapk_h_in_lw_bw-couponCount">{`${userinfo.apkTicket}개`}</div>
            </div>
            <div className="myapk_h_in_lw_bottomWrap">
              <div
                className="myapk_h_in_rw_bw-historyBtn"
                onClick={onClickHistory}
              >
                내역확인
              </div>
              <div className="myapk_h_in_rw_bw-payBtn" onClick={onClickPay}>
                충전하기
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="myapk_apklist">
        <div className="myapk_al_inner">
          {apkInfo.apks.length ? (
            <>
              <div className="myapk_apklist-count">{`총 ${apkInfo.count}개`}</div>
              <div className="myapk_apklist_listwrap">
                {apkInfo.apks.map((apk, index) => (
                  <APKItem
                    key={`apkitem-${index}`}
                    onClickProject={() => {
                      onClickProject(apk);
                    }}
                    onClickUpdateAPK={() => {
                      onClickUpdateAPK(apk);
                    }}
                    apk={{ ...apk, apkIndex: index }}
                    onClickEditPopupSubmit={onClickEditPopupSubmit}
                    userName={userinfo.name}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="notExist">
              <img className="notExist__img" src={notExistImg} alt="img" />
              <div className="notExist__text">
                {
                  " 제작한 APK가 없습니다. \n APK 제작 쿠폰을 충전하여 APK를 제작해보세요!"
                }
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
  return isFromBuilder ? <>{contents}</> : <Layout>{contents}</Layout>;
}
