import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import RndWrapper from "../RndProvider/RndWrapper";
import ApiLibrary from "../../Util/ApiLibrary3d";
import * as builderActions from "../../Store/Reducer/builder";
import View from "./View";

function Container(props) {
  const { rndId, rndOrder, bringRndToTop, setIsApiOn, isApiOn, intl } = props;

  const [selectedCategory, setSelectedCategory] = useState("ID_ALL");
  const [selectedApi, setSelectedApi] = useState();
  const [searchValue, setSearchValue] = useState("");

  const apiList = useRef([...ApiLibrary.apiList]);

  useEffect(() => {
    apiList.current.splice(0, 0, {
      name: "ID_ALL",
      api: []
    });
  }, []);

  useEffect(() => {
    if (isApiOn) {
      bringRndToTop();
    }
  }, [isApiOn]);

  const onClickClose = () => {
    setIsApiOn(false);
  };

  const onCategorySelect = name => {
    if (name !== selectedCategory) {
      setSelectedCategory(name);
      setSelectedApi(undefined);
    }
  };

  const onApiSelect = name => {
    if (name === selectedApi) {
      setSelectedApi(undefined);
    } else {
      setSelectedApi(name);
    }
  };

  const onChange = e => {
    const value = e.target.value;
    setSearchValue(value);
    setSelectedApi(undefined);
  };

  const getApis = () => {
    let apiArray =
      selectedCategory === "ID_ALL"
        ? apiList.current.reduce(
            (acc, val) =>
              acc.concat(
                val.api.map(method => ({ ...method, menu: val.name }))
              ),
            []
          )
        : apiList.current
            .find(item => item.name === selectedCategory)
            .api.map(method => ({ ...method, menu: selectedCategory }));

    if (searchValue && searchValue !== "") {
      apiArray = apiArray.filter(method => {
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

    apiArray.forEach((method, index) => {
      let duplicatedIndex;
      const duplicated = apiArray.find((_method, _index) => {
        duplicatedIndex = _index;
        return _method.name === method.name && _index !== index;
      });
      if (duplicated) {
        apiArray.splice(duplicatedIndex, 1);
      }
    });
    return apiArray;
  };

  const getRndWrapperConfig = () => {
    const rndProvider = document.getElementById("editor_3d");
    const providerWidth = rndProvider
      ? rndProvider.offsetWidth
      : window.innerWidth;
    const providerHeight = rndProvider
      ? rndProvider.offsetHeight
      : window.innerHeight;
    const defaultWidth = 400;
    const defaultHeight = 400;
    const defaultX = (providerWidth - defaultWidth) / 2;
    const defaultY = (providerHeight - defaultHeight) / 2;
    const minWidth = 400;
    const minHeight = 370;
    return {
      defaultX,
      defaultY,
      defaultWidth,
      defaultHeight,
      minWidth,
      minHeight
    };
  };

  return isApiOn ? (
    <RndWrapper
      rndId={rndId}
      rndOrder={rndOrder}
      bringRndToTop={bringRndToTop}
      {...getRndWrapperConfig()}
    >
      <View
        onCategorySelect={onCategorySelect}
        selectedCategory={selectedCategory}
        onApiSelect={onApiSelect}
        selectedApi={selectedApi}
        formatMessage={intl.formatMessage}
        apiLibrary={ApiLibrary}
        apiList={apiList.current}
        apiItems={getApis()}
        searchValue={searchValue}
        onChange={onChange}
        onClickClose={onClickClose}
      />
    </RndWrapper>
  ) : (
    <></>
  );
}

export default connect(
  state => {
    return { isApiOn: state.builder.isApiOn };
  },
  { setIsApiOn: builderActions.setIsApiOn }
)(injectIntl(Container));
