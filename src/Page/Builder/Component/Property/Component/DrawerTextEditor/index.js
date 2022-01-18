import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import FontDropDown from "../../../../../../Common/Component/FontDropDown";
import AssetLibrary from "../../../../utils/assetLibrary";
import { SketchPicker } from "react-color";
import * as sceneActions from "../../../../Store/Reducer/scene";
import "./index.scss";

class DrawerTextEditor extends Component {
  presetColors = [
    "#20a1ec",
    "#ffd185",
    "#77d354",
    "#ffba5c",
    "#23d8af",
    "#f96063",
    "#916cc5",
    "#3e4852",
    "#ffffff"
  ];
  fontFamilies = AssetLibrary.fonts;

  setINTL = item => {
    return this.props.intl.formatMessage({ id: item.name });
  };

  // fontFamily
  handleFontChange = value => {
    const { setSpritePreview, selectedSceneId } = this.props;
    const spriteName = this.props.textPreviewData.name;
    setSpritePreview(selectedSceneId, spriteName, { fontFamily: value });
  };
  // fontSize
  handleSizeChange = event => {
    const { setSpritePreview, selectedSceneId } = this.props;
    const spriteName = this.props.textPreviewData.name;
    const { value } = event.target;
    setSpritePreview(selectedSceneId, spriteName, { fontSize: value });
  };
  // fontWeight, fontStyle
  handleOnToggle = event => {
    event.preventDefault();
    const { setSpritePreview, selectedSceneId } = this.props;
    const spriteName = this.props.textPreviewData.name;
    const { name } = event.target;
    const { fontWeight, fontStyle } = this.props.textPreviewData;
    let value;
    switch (name) {
      case "fontWeight":
        value = fontWeight === "normal" ? "bold" : "normal";
        setSpritePreview(selectedSceneId, spriteName, { [name]: value });
        break;
      case "fontStyle":
        value = fontStyle === "normal" ? "italic" : "normal";
        setSpritePreview(selectedSceneId, spriteName, { [name]: value });
        break;
      default:
        break;
    }
  };
  // fontColor
  handleColorPick = color => {
    const fontColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    const { setSpritePreview, selectedSceneId } = this.props;
    const spriteName = this.props.textPreviewData.name;
    setSpritePreview(selectedSceneId, spriteName, { fontColor });
  };

  componentDidMount() {
    // forcibly inject some inline style values to picker element
    const picker = document.getElementsByClassName("sketch-picker")[0];
    // set specific style while leaving other inline style values untouched
    picker.style.width = "100%";
    picker.style.boxSizing = "border-box";
    picker.style.padding = "14px 17px";
    picker.style.boxShadow = "";
    picker.style.borderRadius = "0";
    picker.style.backgroundColor = "transparent";
  }

  render() {
    const {
      fontColor,
      fontFamily,
      fontSize,
      fontStyle,
      fontWeight
    } = this.props.textPreviewData;
    const fontWeightToggle = fontWeight === "bold" ? "on" : "off";
    const fontStyleToggle = fontStyle === "italic" ? "on" : "off";
    return (
      <div className="DrawerTextEditor">
        <div className="DrawerTextEditor__top">
          <div className="top__row1">
            <FontDropDown
              defaultValue={fontFamily}
              list={this.fontFamilies}
              handleSelectItem={this.handleFontChange}
            />
            <input
              className="TextEditorInput__fontsize"
              type="number"
              value={fontSize}
              name="fontSize"
              onChange={this.handleSizeChange}
            />
          </div>
          <div className="DrawerTextEditor__sizeStyleRow">
            <div className="TextEditorBar__styleGroup">
              <button
                className={`TextEditorButton TextEditorButton__fontweight--${fontWeightToggle}`}
                name="fontWeight"
                onClick={this.handleOnToggle}
              />
              <button
                className={`TextEditorButton TextEditorButton__fontstyle--${fontStyleToggle}`}
                name="fontStyle"
                onClick={this.handleOnToggle}
              />
              <div
                className={`TextEditorButton TextEditorButton__color`}
                onClick={this.handlePaletteBtn}
              >
                <span
                  className="TextEditorButton__color__A"
                  style={{ color: fontColor }}
                >
                  U
                </span>
                <span
                  className="TextEditorButton__color__line"
                  style={{ backgroundColor: fontColor }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="DrawerTextEditor__bottom">
          <SketchPicker
            color={fontColor}
            presetColors={this.presetColors}
            onChangeComplete={this.handleColorPick}
          />
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({ selectedSceneId: state.interaction.selected.scene }),
  {
    setSpritePreview: sceneActions.setSpritePreview
  }
)(injectIntl(DrawerTextEditor));
