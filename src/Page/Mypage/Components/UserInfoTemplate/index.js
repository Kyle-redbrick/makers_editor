import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import View from "./View";
import * as request from "../../../../Common/Util/HTTPRequest";
import { showPopUp } from "../../../../Common/Component/PopUp";
import { withSubscribe } from "../../../../Common/Util/Subscribe";
import NameSetting from "../NameSetting";
import "./index.scss";

class UserInfoTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : props.isMyPage ? props.userinfo : null 
    }
  }
  
  componentDidMount() {
    this.getUserProfile();
  }

  componentDidUpdate(prevProps) {
    if(this.props.isMyPage) {
      if(JSON.stringify(prevProps.userinfo) !== JSON.stringify(this.props.userinfo)) {
        // 내 프로필이 변경될 경우 state가 아닌 props가 변경되기에, 내 프로필 props가 변경될 때 그 값을 state에도 sync하는 로직.
        // 다른유저의 프로필을 표시할 때와, 내 프로필을 표시할때 공통으로 사용하고 있는 컴포넌트인데,
        // 내 프로필일 경우, redux로부터 값을 불러오지만 (props)
        // 다른유저일 경우는 api호출을 통해 받아옴 (state)
        // 공통된 처리를 위해서 두 상황 모두 state에서 유저 정보를 저장하고 있음
        this.setState({user: this.props.userinfo})
      }
    }
  }

  getUserProfile = async () => {
    const user = await request
      .userProfile({ email: this.props.targetEmail })
      .then(res => res.json())
      .catch(e => console.error(e));
    this.setState({ user });
  }

  onClickSettingBtn = () => {
    showPopUp(
      <NameSetting />,
      { 
        darkmode: true, 
        defaultPadding: false, 
        mobileFullscreen: window.innerWidth < 1170
      }
    );
  }

  render() {
    const { user } = this.state;
    const {
      isMyPage,
      handleSelectTab,
      selectedTab,
      intl,
      subscribeInfo
    } = this.props;

    const { onClickSettingBtn } = this;

    return (
      <View
        intl={intl}
        user={user}
        isMyPage={isMyPage}
        handleSelectTab={handleSelectTab}
        selectedTab={selectedTab}
        onClickSettingBtn={onClickSettingBtn}
        subscribeInfo={subscribeInfo}
      />
    );
  }
};

export default connect(
  state => ({ userinfo: state.userinfo }),
  {}
)(injectIntl(withSubscribe(UserInfoTemplate)));

