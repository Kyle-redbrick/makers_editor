import React, { useState, useEffect } from "react";
import downloadIcon from "../../../../../../Image/icon-download-apk.svg";
import "./index.scss";
import NotificationSocket from "../../../../../../Common/Util/NotificationSocket";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import QRCode from "qrcode.react";
import QRBackImage from "../../../../../../Image/builder/group-43.svg";
import loadingIcon from "../../../../../../Image/icon-loading-apk.svg";

const APKMaking = props => {
  const { apkInfo, history } = props;
  const [isComplete, setIsComplete] = useState(false);
  const [apkUrl, setApkUrl] = useState(undefined);
  const isMobile = window.innerWidth < 1080;
  const updateApkUrl = async noti => {
    if (noti.type === "apk" && noti.apk) {
      if (
        noti.apk.status === "complete" &&
        apkInfo.packageName === noti.apk.packageName
      ) {
        const remoteApkInfo = await getWizlabAPK();
        if (!remoteApkInfo || !remoteApkInfo.success) return;
        setApkUrl(remoteApkInfo.wizlabAPK.apkVersion.apkUrl);
      }
    }
  };
  useEffect(() => {
    if (apkUrl === undefined) return;
    setIsComplete(true);
  }, [apkUrl]);

  useEffect(() => {
    return () => {
      NotificationSocket.unsubscribe(updateApkUrl);
    };
  });

  NotificationSocket.subscribe(updateApkUrl);

  const getWizlabAPK = async () => {
    const remoteApkInfo = await request
      .getWizlabAPK({
        packageName: apkInfo.packageName
      })
      .then(res => res.json())
      .catch(e => {
        console.error(e);
        return undefined;
      });
    return remoteApkInfo;
  };

  return (
    <section className="APKMaking">
      <div className="APKMaking_inner">
        {isComplete ? (
          <>
            <div className="APKMaking_complete-title">
              {`"${apkInfo ? apkInfo.appName : ""}"이 완성되었어요!`}
            </div>

            {apkUrl && !isMobile && (
              <div className="APKMaking_complete_qr">
                <img src={QRBackImage} alt="qr" />
                <div className="APKMaking_complete_qr_inner">
                  <QRCode
                    className="APKMaking_complete_qr-qrcode"
                    value={apkUrl}
                  />
                </div>
              </div>
            )}
            <div className="APKMaking_complete-middleText">
              {`APK를 다운로드 하시겠습니까?\n제작한 APK는 언제든 “나의 APK” 페이지에서 다운 받을 수 있습니다.`}
            </div>
            <div className="APKMaking_btnWrap">
              <div
                className="APKMaking_complete_bw-download"
                onClick={() => {
                  if (!apkUrl) return;
                  window.open(apkUrl);
                }}
              >
                <img src={downloadIcon} alt="download" />
              </div>
              {/* <div className="APKMaking_complete_bw-qr">
                <img src={qrDownloadIcon} alt="qrdownload" />
              </div> */}
              {/* <div className="APKMaking_complete_bw-share">
                <img src={shareIcon} alt="share" />
              </div> */}
            </div>
          </>
        ) : (
          <>
            <div className="APKMaking-title">
              {`APK를 만들고 있습니다.\n잠시만 기다려주세요.`}
            </div>
            <div className="APKMaking_Loading">
              <img src={loadingIcon} alt="loading" />
            </div>
            <div className="APKMaking-middleText">
              APK 제작은 앱에 따라 시간이 달리 소요됩니다.
            </div>
            <div className="APKMaking-bottomText">
              {`APK가 완성되면 알람으로 안내해드립니다. 
잠시 후에 “나의 APK”에서 확인해보세요.`}
            </div>
            <div className="APKMaking_btnWrap">
              <div
                className="APKMaking_bw-wizlabBtn"
                onClick={() => {
                  history.push("/");
                }}
              >
                위즈랩 가기
              </div>
              <div
                className="APKMaking_bw-myapkBtn"
                onClick={() => {
                  history.push("/myapk");
                }}
              >
                나의 APK 가기
              </div>
            </div>
            <div className="APKMaking-bottomText bottomText_small">{`APK 제작 문제가 발생했을 때는 위즈랩 고객센터(wizlab@wizschool.io)로 
메일을 보내주시면 빠르게 해결해드리도록 하겠습니다.`}</div>
          </>
        )}
      </div>
    </section>
  );
};

export default APKMaking;
