import React, { Component } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import { URL } from "../../../../Common/Util/Constant";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import View from "./View";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowAPKInfo: false,
      appName: "",
      isValidAppName: false,
      packageName: "",
      isValidPackageName: false,
      appIcon: undefined,
      isValidAppIcon: false
    };
  }

  componentDidMount = () => {};

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.isShowAPKInfo !== this.props.isShowAPKInfo) {
      this.handleIsShowAPKInfo(this.props.isShowAPKInfo);
    }
  };

  handleIsShowAPKInfo = isShowAPKInfo => {
    this.setState({
      isShowAPKInfo
    });
  };

  checkIsValidAppName = () => {
    const { appName } = this.state;
    const emptyString = appName === "";
    const whiteSpace = appName[0] === " ";

    const isValidAppName = !emptyString && !whiteSpace;
    this.setState({
      isValidAppName
    });
  };

  onClickDuplicationCheck = async () => {
    this.checkIsValidPackageName();
  };

  checkIsValidPackageName = async () => {
    const { packageName } = this.state;
    const emptyString = packageName === "";
    const whiteSpace = packageName[0] === " ";
    const koreanString = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(packageName);
    const duplication = await this.checkIsDuplicatePackageName();

    const isValidPackageName =
      !emptyString && !whiteSpace && !koreanString && !duplication;
    this.setState({
      isValidPackageName
    });
  };

  checkIsDuplicatePackageName = async () => {
    const duplicateInfo = await this.getIsPackageNameDuplicate();
    if (!duplicateInfo || !duplicateInfo.success) {
      // error handling for user exercise
      return false;
    }

    // duplicateInfo.isValid;
    return duplicateInfo.isDuplicate;
  };

  getIsPackageNameDuplicate = async () => {
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

  checkIsValidAppIcon = () => {
    const emptyIcon = this.state.appIcon === undefined;
    this.setState({
      isValidAppIcon: !emptyIcon
    });
  };

  onClickCreate = async () => {
    const { isValidAppName, isValidPackageName, isValidAppIcon } = this.state;
    if (isValidAppName && isValidPackageName && isValidAppIcon) {
      // validation success
      const isSuccess = await this.postCreateWizlabAPK();
      if (!isSuccess || !isSuccess.success) {
        // error handling
        showPopUp(<PopUp.OneButton title="실패" />);
        return;
      }
      // apk 생성 success popup
      showPopUp(<PopUp.OneButton title="성공" />);
    }
  };

  postCreateWizlabAPK = async () => {
    const { packageName, appName, appIcon } = this.state;
    const json = await request
      .createWizlabAPK({
        userId: this.props.userinfo.id,
        packageName,
        appName,
        appIcon,
        pId: this.props.selectedProject.pId
      })
      .then(res => res.json())
      .catch(e => {
        console.error(e);
        return undefined;
      });
    return json;
  };

  onChangeInput = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.checkIsValidAppName();
      }
    );
  };

  onChangeIconImage = async e => {
    //TODO : upload Image
    const file = e.target.files[0];
    if (!file) return;
    const filename = await this.getUploadedImageName(file);
    const url = URL.S3_WIZLABAPK + "/" + filename;
    this.setState(
      {
        appIcon: url
      },
      () => {
        this.checkIsValidAppIcon();
      }
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

  render() {
    const {
      isShowAPKInfo,
      appName,
      packageName,
      appIcon,
      isValidAppName,
      isValidPackageName,
      isValidAppIcon
    } = this.state;

    return (
      <View
        intl={this.props.intl}
        isShowAPKInfo={isShowAPKInfo}
        appName={appName}
        packageName={packageName}
        appIcon={appIcon}
        isValidAppName={isValidAppName}
        isValidPackageName={isValidPackageName}
        isValidAppIcon={isValidAppIcon}
        onClickDuplicationCheck={this.onClickDuplicationCheck}
        onClickCreate={this.onClickCreate}
        onChangeInput={this.onChangeInput}
        onChangeIconImage={this.onChangeIconImage}
      />
    );
  }
}

export default connect(state => ({ userinfo: state.userinfo }))(
  injectIntl(Container)
);
