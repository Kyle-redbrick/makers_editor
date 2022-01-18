import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { ImageCompressor } from "../../../../Common/Util/FileCompressor";
import Popup, { showPopUp } from "../../../../Common/Component/PopUp";
import * as userInfoActions from "../../../../Common/Store/Reducer/UserInfo";
import * as request from "../../../../Common/Util/HTTPRequest";
import View from "./View";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.userinfo.name,
      icon: props.userinfo.icon,
      statusMessage: props.userinfo.statusMessage
    }
    this.fileInputRef = React.createRef();
  }

  handleOnChange = e => {
    this.setState({[e.target.name]: e.target.value });
  }

  isValid = value => {
    if (value && value.length>0) {
      return true;
    } else {
      return false;
    }
  }

  getChangedData = () => {
    const { name, icon, statusMessage } = this.state;
    const { userinfo } = this.props;
    const changedData = {};
    if(name !== userinfo.name) changedData.name = name;
    if(icon !== userinfo.icon) changedData.icon = icon;
    if(statusMessage !== userinfo.statusMessage) changedData.statusMessage = statusMessage;

    return changedData;
  }

  handleOnClickFileUpload = () => {
    this.fileInputRef.current.click();
  }

  handleOnFileChange = async e => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const compressed = await ImageCompressor(selectedFile);
    
    const data = new FormData();
    data.append("file", compressed);

    try{
      const response = await request.upload(data);
      const json = await response.json();
      const icon = json.url;
      this.setState({icon: icon});
    }catch(e){
      console.error(e);
    }
  }

  handleSubmit = e => {
    const changedData = this.getChangedData();
    request.updateUserInfo(changedData)
      .then(()=>{
        this.props.updateUserInfo(changedData);
        showPopUp(
          <Popup.OneButton
            titleId="ID_SETTING_ALERT_TITLE_SUCC"
            subtitleId="ID_SETTING_ALERT_PROFILE_SUCC"
            buttonNameId="ID_SETTING_ALERT_CLOSEBTN"
            intl={this.props.intl}
          />,
          { darkmode: true, defaultPadding: true }
        );
      })
      .catch(e=>console.error(e));
  }

  render() {
    const {
      name,
      icon,
      statusMessage
    } = this.state;
    const {
      handleOnChange,
      handleSubmit,
      handleOnFileChange,
      handleOnClickFileUpload,
      isValid,
      getChangedData,
      fileInputRef
    } = this;
    const { dismiss, intl } = this.props;
    const isValidate = isValid(name); //현재는 validation check가 필요한 항목이 name이 유일함
    const isDataChanged = Object.keys(getChangedData()).length > 0; //변경된 데이터가 있는지 확인

    return (
      <View
        intl={intl}
        isValidate={isValidate}
        isDataChanged={isDataChanged}
        name={name}
        icon={icon}
        statusMessage={statusMessage}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        handleOnFileChange={handleOnFileChange}
        handleOnClickFileUpload={handleOnClickFileUpload}
        dismiss={dismiss}
        fileInputRef={fileInputRef}
      />
    );
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  { updateUserInfo: userInfoActions.updateUserInfo }
)(injectIntl(Container));
