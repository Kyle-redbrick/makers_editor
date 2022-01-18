import React, { Component } from "react";
import { connect } from "react-redux";
import RndWrapper from "../../utils/RndWrapper";
import * as request from "../../../../Common/Util/HTTPRequest";
import { showPopUp } from "../../../../Common/Component/PopUp";
import SignIn from "../../../../Common/Component/SignIn";
import store from "../../Store";
import View from "./View";
import { PAGETYPE } from "../../../../Common/Util/Constant";

class Container extends Component {
  constructor(props) {
    super(props);
    this.limit = 10;
    this.state = {
      qnaItems: [],
      offset: 0,
      isLastPage: false,
      detailItem: null,
      listViewMode: "ALL",
      isWriteMode: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const params = { limit: this.limit, offset: this.state.offset };
    if (this.state.listViewMode === "MY" && this.props.userId) {
      params.userId = this.props.userId;
    }
    request
      .getBuilderQuestions(params)
      .then(res => res.json())
      .then(json => {
        this.setState({ qnaItems: json, isLastPage: json.length < this.limit });
      })
      .catch(e => console.error(e));
  };

  onClickPrev = () => {
    if (this.state.offset > 0) {
      this.setState({ offset: this.state.offset - this.limit }, this.getData);
    }
  };

  onClickNext = () => {
    if (!this.state.isLastPage) {
      this.setState({ offset: this.state.offset + this.limit }, this.getData);
    }
  };

  onClickRefresh = () => {
    this.getData();
  };

  onClickItem = id => {
    request
      .getBuilderQuestion({ id })
      .then(res => res.json())
      .then(json => {
        this.setState({ detailItem: json });
      })
      .catch(e => console.error(e));
  };

  onClickDetailBack = () => {
    this.setState({ detailItem: null }, this.getData);
  };

  onClickToggleViewMode = () => {
    const { userId } = this.props;
    if (!userId) {
      showPopUp(<SignIn isBuilder={true} />, { store, mobileFullscreen: true });
      return;
    }
    const { listViewMode } = this.state;
    this.setState(
      { listViewMode: listViewMode === "ALL" ? "MY" : "ALL" },
      this.getData
    );
  };

  onClickWriteQuestion = () => {
    const { userId } = this.props;
    if (!userId) {
      showPopUp(<SignIn isBuilder={true} />, { store, mobileFullscreen: true });
      return;
    }
    this.setState({ isWriteMode: !this.state.isWriteMode });
  };

  onClickWriterBack = () => {
    this.setState({ isWriteMode: false }, this.getData);
  };

  onClickShowProject = detailId => {
    const url = `/${PAGETYPE.QNA_READONLY}/${detailId}`;
    var newWindow = window.open(url, "_blank");
    newWindow.focus();
  };

  onSuccessWrite = () => {
    this.setState({ isWriteMode: false, offset: 0 }, this.getData);
  };

  render() {
    const {
      userId,
      isOn,
      handleSelectTab,
      handleChangeZIndex,
      zIndex
    } = this.props;
    const {
      qnaItems,
      offset,
      isLastPage,
      detailItem,
      listViewMode,
      isWriteMode
    } = this.state;
    const {
      onClickPrev,
      onClickNext,
      onClickItem,
      onClickDetailBack,
      onClickRefresh,
      onClickToggleViewMode,
      onClickWriteQuestion,
      onClickWriterBack,
      onSuccessWrite,
      onClickShowProject
    } = this;

    if (!isOn) {
      return <div />;
    }
    return (
      <RndWrapper
        id="qna"
        style={{ zIndex }}
        defaultX={document.body.clientWidth - 665}
        defaultY={16}
        enableResizing={false}
      >
        <View
          userId={userId}
          handleSelectTab={handleSelectTab}
          handleChangeZIndex={handleChangeZIndex}
          zIndex={zIndex}
          qnaItems={qnaItems}
          listViewMode={listViewMode}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
          onClickItem={onClickItem}
          onClickDetailBack={onClickDetailBack}
          onClickRefresh={onClickRefresh}
          onClickToggleViewMode={onClickToggleViewMode}
          onClickWriteQuestion={onClickWriteQuestion}
          onClickWriterBack={onClickWriterBack}
          onClickShowProject={onClickShowProject}
          onSuccessWrite={onSuccessWrite}
          onSuccessWriteAnswer={onClickItem}
          offset={offset}
          isLastPage={isLastPage}
          detailItem={detailItem}
          isWriteMode={isWriteMode}
        />
      </RndWrapper>
    );
  }
}

export default connect(
  state => ({ userId: state.userinfo.id }),
  {}
)(Container);
