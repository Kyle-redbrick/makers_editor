import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "./index.scss";
import { showPopUp } from "../../../Common/Component/PopUp";
import html2canvas from "html2canvas";
//import { OCPGame } from "../../Util/Constant";

import backgroundImage from "../../../Image/certificate-bg.png";


class Container extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  printCertificate() {
    const html = document.querySelector("html");
    const printContents = document.querySelector(".OCPCertification").innerHTML;
    const printDiv = document.createElement("div");
    printDiv.className = "OCPCertificationContainer";
    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = "none";
    //document.title = "온라인코딩파티 with 위즈랩";
    window.print();
    document.body.style.display = "block";
    printDiv.style.display = "none";
    //document.title = "위즈랩";
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
      `download.png`
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
                {this.props.name}
              </div>
              <div className="OCPCertificationTexts_tw-missionTitle">
                {this.props.class}
              </div>
            </div>
            <div className="OCPCertificationTextOrgName">
              <div className="OCPCertificationText_School">Is awarded with this certificate for successfully fulfilling requirements of Elementary Block Coding, a software education course offered by iGroup, and completing 5 projects utilizing Event, Sequence, Physical Engine.</div>
              <div className="OCPCertificationText_Name">{name}</div>
            </div>
            <div className="OCPCertificationText_Date">
              {moment().format('YYYY MM DD')}
            </div>
          </div>
        </div>

        <div className="OCPCertificationContainerTools">
          <div
            className="OCPCertificationContainerTool OCPCertificationPrint"
            onClick={() => this.downloadCertificate()}
          >
            Download
          </div>

          <div
            className="OCPCertificationContainerTool OCPCertificationPrint"
            onClick={() => this.printCertificate()}
          >
            Print
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  email: state.userinfo.email
}))(Container);
