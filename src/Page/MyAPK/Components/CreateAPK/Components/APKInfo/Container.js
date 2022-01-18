import React, { Component } from "react";
import * as request from "../../../../../../Common/Util/HTTPRequest";
import { URL } from "../../../../../../Common/Util/Constant";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import View from "./View";
import PopUp, { showPopUp } from "../../../../../../Common/Component/PopUp";

const reservedKeywords = [
  "abstract",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "default",
  "do",
  "double",
  "else",
  "extends",
  "final",
  "finally",
  "float",
  "for",
  "future",
  "generic",
  "goto",
  "if",
  "implements",
  "import",
  "inner",
  "instanceof",
  "int",
  "interface",
  "long",
  "native",
  "new",
  "null",
  "operator",
  "outer",
  "package",
  "private",
  "protected",
  "public",
  "rest",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "try",
  "var",
  "void",
  "volatile",
  "while"
];

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // input tag values
      appName: "",
      packageName: "",
      appIcon: undefined,

      // validation
      isValidAppIcon: false,
      isValidAppName: false,
      isCorrectPackageNameRule: false,
      isAvailablePackageName: false,

      //warning
      appNameWarning: "",
      packageNameWarning: "",
      appIconWarning: ""
    };
  }
  /*  app name */
  appNameValidation = () => {
    const { appName } = this.state;
    this.setState({
      isValidAppName: !!appName,
      appNameWarning: !appName ? "앱 이름을 입력해주세요." : ""
    });
  };
  /*  package name */
  packageNameValidation = () => {
    const {
      packageName,
      isCorrectPackageNameRule,
      isAvailablePackageName
    } = this.state;
    if (!packageName) {
      this.setState({
        packageNameWarning: "패키지 이름을 입력하세요."
      });
    } else if (!isCorrectPackageNameRule && !isAvailablePackageName) {
      this.setState({
        packageNameWarning: "패키지 이름 중복 체크 해주세요."
      });
    }
  };
  onClickPackageNameCheck = () => {
    this.checkPackageNameRule(isValidRule => {
      if (isValidRule) {
        this.checkPackageNameDuplicate();
      }
    });
  };
  checkPackageNameRule = async callback => {
    const { packageName } = this.state;
    const english = /^[A-Za-z0-9]*$/.test(packageName);
    const isStartWithCharacter = isNaN(packageName[0]);
    const isReserved = reservedKeywords.includes(packageName);
    let errorPopupMsg;
    if (!packageName) {
      errorPopupMsg = "패키지 이름을 입력하세요.";
    } else if (!english) {
      errorPopupMsg = "영문 및 숫자만 가능합니다.";
    } else if (!isStartWithCharacter) {
      errorPopupMsg = "첫 글자는 영문으로 시작해야합니다.";
    } else if (isReserved) {
      errorPopupMsg = "사용할수 없는 패키지 이름입니다.";
    }
    if (errorPopupMsg) {
      this.setState(
        { packageNameWarning: errorPopupMsg, isCorrectPackageNameRule: false },
        () => {
          this.showWarningPopup(errorPopupMsg);
          callback(false);
        }
      );
    } else {
      this.setState({ isCorrectPackageNameRule: true }, callback(true));
    }
  };
  checkPackageNameDuplicate = async () => {
    const duplicateInfo = await this.isPackageNameDuplicate();

    if (!duplicateInfo || !duplicateInfo.success) {
      let errorMsg = "이미 사용중인 패키지 이름입니다.";
      this.setState(
        {
          packageNameWarning: errorMsg,
          isAvailablePackageName: false
        },
        () => {
          this.showWarningPopup(errorMsg);
        }
      );
    } else {
      this.setState({
        packageNameWarning: "",
        isAvailablePackageName: true
      });
    }
  };
  isPackageNameDuplicate = async () => {
    const { packageName } = this.state;
    const json = await request
      .getIsPackageNameDuplicate({
        packageName
      })
      .then(res => res.json())
      .catch(e => {
        console.error(e.message);
        return undefined;
      });
    return json;
  };
  onClickpackageNameReset = () => {
    this.setState({
      packageName: "",
      isAvailablePackageName: false,
      isCorrectPackageNameRule: false,
      packageNameWarning: ""
    });
  };

  /* app icon */
  appIconValidation = () => {
    const { appIcon } = this.state;
    if (!appIcon) {
      this.setState({
        isValidAppIcon: false,
        appIconWarning: "앱 아이콘을 넣어주세요."
      });
    } else if (!appIcon.endsWith("png")) {
      this.setState({
        isValidAppIcon: false,
        appIconWarning: "앱 아이콘은 png파일만 지원합니다."
      });
    } else {
      this.setState({
        isValidAppIcon: true,
        appIconWarning: ""
      });
    }
  };
  setAppIcon = url => {
    return new Promise(resolve =>
      this.setState(
        {
          appIcon: url
        },
        resolve
      )
    );
  };
  getUploadedImageName = async file => {
    const uploadInfo = await this.uploadImage(file);
    if (!uploadInfo || !uploadInfo.success) {
      // error handling
      return;
    }
    return uploadInfo.filename;
  };
  uploadImage = async file => {
    const data = new FormData();
    data.append("file", file);
    const json = await request
      .uploadWizlabAPKIcon(data)
      .then(res => res.json())
      .catch(e => {
        console.error(e.message);
        return undefined;
      });

    return json;
  };

  onChangeInput = async e => {
    let { name, value } = e.target;
    switch (name) {
      case "appName":
      case "packageName":
        if (name === "packageName" && value.length > 15) return;
        value = value.replace(/(\s*)/g, "");
        this.setState({
          [name]: value
        });
        break;
      case "appIcon":
        const file = e.target.files[0];
        if (!file) return;
        const filename = await this.getUploadedImageName(file);
        const url = URL.S3_WIZLABAPK + "/" + filename;
        await this.setAppIcon(url);
        await this.appIconValidation();
        break;
      default:
        break;
    }
  };
  onClickNext = async () => {
    await this.appNameValidation();
    await this.appIconValidation();
    await this.packageNameValidation();

    const {
      appName,
      packageName,
      appIcon,
      isValidAppIcon,
      isValidAppName,
      isCorrectPackageNameRule,
      isAvailablePackageName,
      appNameWarning,
      appIconWarning,
      packageNameWarning
    } = this.state;

    if (!isValidAppName) {
      this.showWarningPopup(appNameWarning);
      return;
    }
    if (!(isCorrectPackageNameRule && isAvailablePackageName)) {
      this.showWarningPopup(packageNameWarning);
      return;
    }
    if (!isValidAppIcon) {
      this.showWarningPopup(appIconWarning);
      return;
    }

    const payload = {
      appName,
      appIcon,
      packageName
    };
    this.props.handleNextProcessType(payload);
  };
  showWarningPopup = errMsg => {
    showPopUp(
      <PopUp.OneButton
        title={errMsg}
        buttonName={this.props.intl.formatMessage({
          id: "ID_SPAM_POPUP_CONFIRM"
        })}
      />,
      {
        darkmode: true,
        dismissButton: false,
        dismissOverlay: true
      }
    );
  };

  render() {
    const {
      appName,
      packageName,
      appIcon,
      isValidAppName,
      isCorrectPackageNameRule,
      isValidAppIcon,
      isAvailablePackageName,
      appNameWarning,
      packageNameWarning,
      appIconWarning
    } = this.state;

    return (
      <View
        intl={this.props.intl}
        appName={appName}
        packageName={packageName}
        appIcon={appIcon}
        isValidAppName={isValidAppName}
        isCorrectPackageNameRule={isCorrectPackageNameRule}
        isValidAppIcon={isValidAppIcon}
        isAvailablePackageName={isAvailablePackageName}
        onClickPackageNameCheck={this.onClickPackageNameCheck}
        onChangeInput={this.onChangeInput}
        onClickNext={this.onClickNext}
        onClickpackageNameReset={this.onClickpackageNameReset}
        appNameWarning={appNameWarning}
        packageNameWarning={packageNameWarning}
        appIconWarning={appIconWarning}
      />
    );
  }
}

export default connect(state => ({ userinfo: state.userinfo }))(
  injectIntl(Container)
);
