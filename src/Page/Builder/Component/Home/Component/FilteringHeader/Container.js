import React, { Component } from "react";
import { injectIntl } from "react-intl";
import View from "./View";
import { connect } from "react-redux";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimension: "ALL",
      editorFormat: "ALL",
      keyword: "",
      isClickedDropDown: "",
    };
    this.dimensionType = { ALL: "ALL", "3D": "3D", "2D": "2D" };
    this.editorType = { ALL: "ALL", BLOCK: "BLOCK", TEXT: "TEXT" };
  }
  componentDidMount = () => {
    this.setFilteringCondition();
  };

  onClickDimension = (dimension) => {
    this.setState({ dimension }, () => {
      this.setFilteringCondition();
    });
  };
  onClickEditorFormat = (editorFormat) => {
    this.setState({ editorFormat }, () => {
      this.setFilteringCondition();
    });
  };
  onChangeSearch = (e) => {
    this.setState({ keyword: e.target.value });
    // this.setState({ keyword: e.target.value }, () => {
    //   this.setFilteringCondition();
    // });
  };
  onClickSearch = () => {
    this.setFilteringCondition({ keyword: this.state.keyword });
  };
  onClickTitle = (type) => {
    this.setState({
      isClickedDropDown: type,
    });
  };

  onKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      this.onClickSearch();
    }
  };

  getTemplateType = () => {
    const { dimension, editorFormat } = this.state;
    let type = [];
    if (dimension === "ALL") {
      if (editorFormat === "ALL") {
        type = ["js3d", "js", "wizlabOOBC"];
      } else if (editorFormat === "TEXT") {
        type = ["js3d", "js"];
      } else {
        type = ["wizlabOOBC"];
      }
    }

    if (dimension === "2D") {
      if (editorFormat === "ALL") {
        type = ["js", "wizlabOOBC"];
      } else if (editorFormat === "TEXT") {
        type = ["js"];
      } else {
        type = ["wizlabOOBC"];
      }
    }

    if (dimension === "3D") {
      if (editorFormat === "ALL" || editorFormat === "TEXT") {
        type = ["js3d"];
      } else {
        type = [];
      }
    }
    return type;
  };

  setFilteringCondition = () => {
    let type = this.getTemplateType();
    this.props.setFilteringData(type, this.state.keyword);
    this.setState({ isClickedDropDown: "" });
  };

  render() {
    const { dimension, editorFormat, keyword, isClickedDropDown } = this.state;
    const {
      onClickDimension,
      dimensionType,
      editorType,
      onClickEditorFormat,
      onChangeSearch,
      onClickTitle,
      onClickSearch,
      onKeyPressSearch,
    } = this;

    return (
      <View
        onClickDimension={onClickDimension}
        dimensionType={dimensionType}
        editorType={editorType}
        onClickEditorFormat={onClickEditorFormat}
        dimension={dimension}
        editorFormat={editorFormat}
        keyword={keyword}
        onChangeSearch={onChangeSearch}
        isClickedDropDown={isClickedDropDown}
        onClickTitle={onClickTitle}
        onClickSearch={onClickSearch}
        onKeyPressSearch={onKeyPressSearch}
      />
    );
  }
}
export default connect(
  (state) => ({ email: state.userinfo.email }),
  {}
)(injectIntl(Container));
