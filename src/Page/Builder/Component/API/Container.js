import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import RndWrapper from "../../utils/RndWrapper";
import APILibrary from "../../utils/apiLibrary";
import * as webrtcActions from "../../Store/Reducer/webrtc";
import View from "./View";
import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";

class Container extends Component {
  constructor(props) {
    super(props);
    this.apiList = [...APILibrary.apiList];
    this.apiList.splice(0, 0, {
      name: "ID_ALL",
      api: []
    });
    this.state = {
      selectedCategory: "ID_ALL",
      selectedAPI: undefined,
      searchValue: ""
    };
  }

  handleSelectCategory = categoryName => {
    this.props.setLog({ selectedApi: categoryName });
    if (categoryName !== this.state.selectedCategory) {
      this.setState({
        selectedCategory: categoryName,
        selectedAPI: undefined
      });
    }
  };

  handleSelectAPI = apiName => {
    if (apiName === this.state.selectedAPI) {
      this.setState({ selectedAPI: undefined });
    } else {
      TrackingUtil.sendGAEvent({
        category: "Builder",
        action: `API`,
        label: apiName
      });
      this.setState({ selectedAPI: apiName });
    }
  };

  handleOnChange = e => {
    const value = e.target.value;

    this.setState(
      {
        searchValue: value,
        selectedAPI: undefined
      },
      () => {
        if (this.searchTimer) {
          clearTimeout(this.searchTimer);
        }
        this.searchTimer = setTimeout(() => {
          TrackingUtil.sendGAEvent({
            category: "Builder",
            action: `SearchAPI`
          });
        }, 500);
      }
    );
  };

  getItems = () => {
    // selectedApi에 맞는 methodArray 구하기
    const { selectedCategory, searchValue } = this.state;
    let methodArray =
      selectedCategory === "ID_ALL"
        ? this.apiList.reduce(
            (acc, val) =>
              acc.concat(
                val.api.map(method => ({ ...method, menu: val.name }))
              ),
            []
          )
        : this.apiList
            .find(item => item.name === selectedCategory)
            .api.map(method => ({ ...method, menu: selectedCategory }));

    // 검색어로 methodArray 필터링하기
    if (searchValue && searchValue !== "") {
      methodArray = methodArray.filter(method => {
        const checkMenu = method.menu.toLowerCase().indexOf(searchValue) > -1;
        const checkName = method.name.toLowerCase().indexOf(searchValue) > -1;
        const checkDesc1 =
          method.tip &&
          method.tip.description &&
          method.tip.description.ko.toLowerCase().indexOf(searchValue) > -1;
        const checkDesc2 =
          method.tip &&
          method.tip.description2 &&
          method.tip.description2.ko.toLowerCase().indexOf(searchValue) > -1;
        return checkMenu || checkName || checkDesc1 || checkDesc2;
      });
    }

    // 이름이 중복되는 method 제거
    methodArray.forEach((method, index) => {
      let duplicatedIndex;
      const duplicated = methodArray.find((_method, _index) => {
        duplicatedIndex = _index;
        return _method.name === method.name && _index !== index;
      });
      if (duplicated) {
        methodArray.splice(duplicatedIndex, 1);
      }
    });
    return methodArray;
  };

  render() {
    const {
      isOn,
      handleSelectTab,
      handleChangeZIndex,
      intl,
      zIndex
    } = this.props;
    const {
      handleSelectCategory,
      handleOnChange,
      handleSelectAPI,
      apiList
    } = this;
    const { selectedCategory, selectedAPI, searchValue } = this.state;
    const apiItems = this.getItems();
    if (!isOn) {
      return <div />;
    }
    return (
      <RndWrapper
        id="api"
        style={{ zIndex }}
        defaultWidth={384}
        defaultHeight={400}
        defaultX={500} //temp
        // defaultX={document.body.clientWidth - 470}
        defaultY={16}
        minWidth={400}
        minHeight={370}
      >
        <View
          handleSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
          handleSelectAPI={handleSelectAPI}
          selectedAPI={selectedAPI}
          handleSelectTab={handleSelectTab}
          handleChangeZIndex={handleChangeZIndex}
          formatMessage={intl.formatMessage}
          apiList={apiList}
          apiItems={apiItems}
          zIndex={zIndex}
          searchValue={searchValue}
          handleOnChange={handleOnChange}
        />
      </RndWrapper>
    );
  }
}

export default connect(
  state => ({}),
  { setLog: webrtcActions.setLog }
)(injectIntl(Container));
