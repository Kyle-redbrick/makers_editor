import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "./index.scss";
import { showPopUp } from "../../../Common/Component/PopUp";
import html2canvas from "html2canvas";
import { OCPGame } from "../../Util/Constant";

import backgroundImage from "../../../Image/certificate-bg.png";


class Container extends Component {
  printCertificate() {
    const html = document.querySelector("html");
    const printContents = document.querySelector(".OCPCertification").innerHTML;
    const printDiv = document.createElement("div");
    printDiv.className = "OCPCertificationContainer";
    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = "none";
    document.title = "온라인코딩파티 with 위즈랩";
    window.print();
    document.body.style.display = "block";
    printDiv.style.display = "none";
    document.title = "위즈랩";
    if (this.props.callback) this.props.callback();
    showPopUp(null);
  }

  async downloadCertificate() {
    const canvas = await html2canvas(
      document.querySelector(".OCPCertification"),
      {
        scrollX: 0,
        scrollY: 0
      }
    );

    let imgURL = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    //TODO 다운로드 파일 타입 이름 변경
    downloadLink.setAttribute(
      "download",
      `코딩파티인증서_${
        this.props.type === "escape"
          ? "방탈출"
          : this.props.type === "game"
          ? "게임개발자"
          : "게임개발자 - 블록"
      }_${this.props.grade}_${this.props.name}.png`
    );
    downloadLink.setAttribute("href", imgURL);
    downloadLink.click();
    if (this.props.callback) {
      this.props.callback();
    }
    showPopUp(null);
  }
  render() {
    const { name, organization, grade, type } = this.props;
    return (
      <div className={`OCPCertificationContainer`}>
        <div className="OCPCertification">
          <img
            className="OCPCertificationImg"
            src={backgroundImage}//{OCPGame[type].itemInfo[grade].certificationImg}
            alt="certificationImg"
          />
          <div className="OCPCertificationTexts">
            <div className="OCPCertificationTexts_titleWrap">
              <div className="OCPCertificationTexts_tw-title">
                {
                  // `${OCPGame[type].title} ${
                  //   type === "game"
                  //     ? "텍스트코딩"
                  //     : type === "block"
                  //     ? "블록코딩"
                  //     : ""
                  // }`
                  "hello"
                }
              </div>
              <div className="OCPCertificationTexts_tw-missionTitle">
                {/* {OCPGame[type].itemInfo[grade].title} */}
                hello
              </div>
            </div>
            <div className="OCPCertificationTextOrgName">
              <div className="OCPCertificationText_School">{organization}</div>
              <div className="OCPCertificationText_Name">{name}</div>
            </div>
            <div className="OCPCertificationText_Date">
              {moment().format("YYYY년 M월 DD일")}
            </div>
          </div>
        </div>

        <div className="OCPCertificationContainerTools">
          <div
            className="OCPCertificationContainerTool OCPCertificationPrint"
            onClick={() => this.downloadCertificate()}
          >
            다운로드
          </div>

          <div
            className="OCPCertificationContainerTool OCPCertificationPrint"
            onClick={() => this.printCertificate()}
          >
            인쇄하기
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  email: state.userinfo.email
}))(Container);
