import React, { useState } from "react";
import "./index.scss";
import checkIcon from "../../../../../../Image/icon-check-apk.svg";

const APKGuide = props => {
  const { handleNextProcessType } = props;
  const [isCheck, setIsCheck] = useState(false);

  return (
    <section className="APKGuide">
      <div className="APKGuide_inner">
        <div className="APKGuide-title">
          {`APK를 제작하기 전에\n꼭 확인해주세요!`}
        </div>
        <div className="APKGuide_contents">
          <div className="APKGuide_contents-content">
            1. APK는 위즈랩에 퍼블리싱 된 앱으로만 제작가능합니다.
          </div>
          <div className="APKGuide_contents-content">
            2. APK의 앱 내용과 위즈랩의 앱 내용은 동기화됩니다. 위즈랩에 앱을
            퍼블리싱하면, 자동으로 APK에도 반영됩니다.
          </div>
          <div className="APKGuide_contents-content">
            {`3. 앱의 이름과 아이콘 변경을 위해서는 “나의 APK”에서 해당 APK의 세부정보를 수정한 후, APK를 새로 제작해주세요. 한번 제작한 APK는 평생 무료로 APK를 수정할 수 있습니다.`}
          </div>
        </div>
        <div className="APKGuide_bottomWrap">
          <div
            className={`APKGuide_bw-checkbox ${isCheck &&
              "APKGuide_bw-checkbox-checked"}`}
            onClick={() => {
              setIsCheck(!isCheck);
            }}
          >
            <img src={checkIcon} alt="check" />
          </div>
          <div className="APKGuide_bw-text">위 내용을 모두 확인하였습니다</div>
        </div>
        <div className="APKGuide_footer">
          <div
            className={`APKGuide_ft-nextBtn ${isCheck &&
              "APKGuide_ft-nextBtn-active"}`}
            onClick={() => {
              if (!isCheck) return;
              handleNextProcessType();
            }}
          >
            다음 단계
          </div>
        </div>
      </div>
    </section>
  );
};

export default APKGuide;
