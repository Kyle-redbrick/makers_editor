import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "./index.scss";
import { showPopUp } from "../../../Common/Component/PopUp";
import ReactToPrint from "react-to-print";
import html2canvas from "html2canvas";
import * as request from "../../../Common/Util/HTTPRequest";

import backgroundImage from "../../../Image/certificate-bg.png";
import { injectIntl } from "react-intl";

class Container extends Component {
  componentRef = null;

  constructor(props) {
    super(props);
    this.state = {
      certDesc: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setCertDesc(this.props.course.id)
  }

  convertComponentToImg = async () => {
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

    return imgURL;
  }

  handleBeforeGetContent = async () => {
    let imgURL = await this.convertComponentToImg();

    const printDiv = document.getElementById("printarea");
    printDiv.innerHTML = `<img src=${imgURL} />`

     this.componentRef.style.display = "block";

    this.setComponentRef(printDiv);
    document.body.style.display = "none";
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

  async downloadCertificate() {
    let imgURL = await this.convertComponentToImg();
    let downloadLink = document.createElement("a");
    //TODO 다운로드 파일 타입 이름 변경
    downloadLink.setAttribute(
      "download",
      `download.png`
    );
    downloadLink.setAttribute("href", imgURL);
    downloadLink.click();
    this.disableCertBtn()
  }

  setComponentRef = (ref) => {
    this.componentRef = ref;
  };

  reactToPrintContent = () => {
    return this.componentRef.current;
  };

  handleAfterPrint = () => {
    document.body.style.display = "block";
    this.componentRef.style.display = "none";
  };


  async disableCertBtn () {
    await request.addCertificateInfo({courseId:this.props.course.id,name:this.props.name, userClass:this.props.class})
  }

  reactToPrintTrigger = () => {
    return <div className="OCPCertificationPrint">Print</div>;
  };

  render() {
    const { name, organization, grade, type } = this.props;
    return (
      <div className={`OCPCertificationContainer`}>
        <div id="printarea" ref={this.setComponentRef}/>
        <div className="OCPCertification" >
          <img
            className="OCPCertificationImg"
            src={backgroundImage}
            alt="certificationImg"
          />
          <div className="OCPCertificationTexts">
            <div className="OCPCertificationTextOrgName">
              <div className="OCPCertificationText_Name">{this.props.name.length > 0 ? this.props.name : "_"}</div>
              {/* <div className="OCPCertificationText_Class">{this.props.class}</div> */}
              <div className="OCPCertificationText_School">{this.state.certDesc}</div>
            </div>
            <div className="OCPCertificationText_Date">
                {moment().format('YYYY MM DD')}
            </div>
          </div>
        </div>
        <div className="OCPCertificationContainerTools">
          <div className="OCPCertificationPrint" onClick={() => this.downloadCertificate()}>
            Download
          </div>
          <ReactToPrint
            content={()=> this.componentRef}
            documentTitle="certificate"
            onAfterPrint={this.handleAfterPrint}
            onBeforeGetContent={this.handleBeforeGetContent}
            removeAfterPrint
            trigger={this.reactToPrintTrigger}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  email: state.userinfo.email
}))(injectIntl(Container));
