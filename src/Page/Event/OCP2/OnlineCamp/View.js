import React from "react";
import Layout from "../../../../Common/Component/Layout";
import campImg from "../Assets/onlinecamp.png";
import campImgM from "../Assets/onlinecamp_m.png";
import "./index.scss";

export default function View(props) {
  const { onlineCamps, onClickApplyOnlineCamp } = props;
  return (
    <Layout>
      <div className="Page--OCPEventOnlineCamp">
        <div className="OCPEventOnlineCamp">
          <img className="OCPEventOnlineCamp_imgPC" src={campImg} alt="img" />
          <img className="OCPEventOnlineCamp_imgM" src={campImgM} alt="img" />
          {onlineCamps.map((onlineCamp, index) => (
            <div
              key={index}
              className={`OCPEventOnlineCamp_applyBtn OCPEventOnlineCamp_applyBtn-${index}`}
              onClick={() => {
                onClickApplyOnlineCamp(onlineCamp);
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
