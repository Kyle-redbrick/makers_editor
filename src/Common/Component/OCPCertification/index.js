import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "./index.scss";
import { showPopUp } from "../../../Common/Component/PopUp";
import html2canvas from "html2canvas";
import * as request from "../../../Common/Util/HTTPRequest";

import backgroundImage from "../../../Image/certificate-bg.png";
import { injectIntl } from "react-intl";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certDesc: ""
    };
  }

  componentDidMount() {
    this.setCertDesc(this.props.course.id)
  }

  setCertDesc(id) {
    switch (id) {
      case 1:
        this.setState({ certDesc: this.props.intl.formatMessage({ id: "ID_CERT_ELEMENTARY_BLOCK_DESC" }) });
        break;
      case 4:
        this.setState({certDesc: this.props.intl.formatMessage({ id: "ID_CERT_BASIC_BLOCK_DESC" })});
        break;
      case 5:
        this.setState({certDesc: this.props.intl.formatMessage({ id: "ID_CERT_ADVANCED_BLOCK_DESC" })});
        break;
      case 6:
        this.setState({certDesc: this.props.intl.formatMessage({ id: "ID_CERT_ADVANCED_JS_DESC" })});
        break;
      case 7:
        this.setState({certDesc: this.props.intl.formatMessage({ id: "ID_CERT_MASTERY_JS_DESC" })});
        break;
      default:
        break;
    }
  }

  printCertificate() {
    const html = document.querySelector("html");
    const printContents = document.querySelector(".OCPCertification").innerHTML;
    const printDiv = document.createElement("div");
    printDiv.className = "OCPCertificationContainer";
    html.appendChild(printDiv);
    printDiv.innerHTML = printContents;
    document.body.style.display = "none";
    //document.title = "wizclass";
    window.print();
    document.body.style.display = "block";
    printDiv.style.display = "none";
    // if (this.props.callback) this.props.callback();
    //showPopUp(null);
    this.disableCertBtn()
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
    // if (this.props.callback) {this.props.callback();}
    //showPopUp(null);
    this.disableCertBtn()
  }

  async disableCertBtn () {
    const isShowCert = await request.addCertificateInfo({courseId:this.props.course.id,name:this.props.name, userClass:this.props.class})
    console.log("isShowCert",isShowCert ,{courseId:this.props.course.id,name:this.props.name, userClass:this.props.class})
    this.props.updateCourses()
    //courseId
  }

  render() {
    const { name, organization, grade, type } = this.props;
    return (
      <div className={`OCPCertificationContainer`}>
        <div className="OCPCertification">
          <img
            className="OCPCertificationImg"
            src={backgroundImage}
            alt="certificationImg"
          />
          <div className="OCPCertificationTexts">
 
            <div className="OCPCertificationTextOrgName">
              <div className="OCPCertificationText_Name">{this.props.name}</div>
              <div className="OCPCertificationText_Class">{this.props.class}</div>
              <div className="OCPCertificationText_School">{this.state.certDesc}</div>
              <div className="OCPCertificationText_Date">
                {moment().format('YYYY MM DD')}
              </div>
            </div>
          </div>
        </div>

        <div className="OCPCertificationContainerTools">
          <div className="OCPCertificationPrint" onClick={() => this.downloadCertificate()}>
            Download
          </div>
          <div className="OCPCertificationPrint" onClick={() => this.printCertificate()}>
            Print
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  email: state.userinfo.email
}))(injectIntl(Container));
