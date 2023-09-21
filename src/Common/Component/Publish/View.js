import React from "react";
import { injectIntl } from "react-intl";
import closeImg from "../../../Image/builder/x-copy-3.svg";
import closeImg_darkmode from "../../../Image/dreamclass/close-preview.svg";
import { getColorTheme } from "../../../Page/Builder/utils/colorThemeUtil";
import deleteTagIcon from "../../../Image/dreamclass/delete-tag.svg";
import badgeJsShadow from "../../../Image/dreamclass/badge-js-shadow@2x.png";
import badgePuzzleShadow from "../../../Image/dreamclass/badge-oobc-shadow@2x.png";

const View = (props) => {
  const {
    name,
    description,
    tags,
    isCopyAllowed,
    icon,
    isDeveloping,
    handleInputChange,
    handleIsCopyAllowedChange,
    handleImgClick,
    handleAddClick,
    handleSubmit,
    handleCloseBtn,
    handleFileInput,
    handleFileDelete,
    onAddTag,
    onDeleteTag,
    popularTags,
    nameValidation,
    descriptionValidation,
  } = props;
  const colorTheme = getColorTheme();

  const badgeIcon = (type) => {
    switch (type) {
      case "javascript":
        return badgeJsShadow;
      case "oobc":
        return badgePuzzleShadow;
      default:
        break;
    }
  };

  return (
    <div className="publishpopup">
      <div className="publishpopup__header">
        <div className="header__title">
          {props.intl.formatMessage({ id: "ID_BUILDER_EDITPOP" })}
        </div>
        <img
          className="popup__closebtn"
          onClick={handleCloseBtn}
          src={colorTheme === "darkMode" ? closeImg_darkmode : closeImg}
          alt="img"
        />
      </div>
      <form className="publishform">
        {/* name */}
        <div className="publishform__row">
          <p className="publishform__title">
            {props.intl.formatMessage({ id: "ID_BUILDER_EDITPOP_TITLE" })}
          </p>

          <input
            type="text"
            name="name"
            value={name}
            // placeholder={props.intl.formatMessage({
            //   id: "ID_BUILDER_EDITPOP_TITLE_PH",
            // })}
            placeholder="게임 이름을 변경할 시에만 입력하세요"
            onChange={handleInputChange}
            className={`publishform__input ${
              !nameValidation && "validationFalse"
            }`}
            autoComplete="off"
          />
          {!nameValidation && (
            <p className="publishform__validation_check">
              {props.intl.formatMessage({
                id: "ID_BUILDER_EDITPOP_TITLE_VALIDATION",
              })}
            </p>
          )}
        </div>
        {/* desc */}
        <div className="publishform__row">
          <p className="publishform__title">
            {props.intl.formatMessage({ id: "ID_BUILDER_EDITPOP_DESC" })}
          </p>

          <textarea
            type="text"
            name="description"
            value={description}
            onChange={handleInputChange}
            className={`publishform__textarea ${
              !descriptionValidation && "validationFalse"
            }`}
            placeholder={props.intl.formatMessage({
              id: "ID_BUILDER_EDITPOP_DESC_PH",
            })}
          />
          {!descriptionValidation && (
            <p className="publishform__validation_check">
              {props.intl.formatMessage({
                id: "ID_BUILDER_EDITPOP_DESC_VALIDATION",
              })}
            </p>
          )}
        </div>

        {/* icon */}

        <div className="publishform__row">
          <p className="publishform__title">
            {props.intl.formatMessage({ id: "ID_BUILDER_EDITPOP_ICON" })}
          </p>

          <div className="publishform__icon">
            <div className="publishform__icon__img__wrapper">
              <img
                className="publishform__icon__img"
                src={
                  icon
                    ? icon
                    : "https://png.pngtree.com/thumb_back/fh260/background/20200821/pngtree-pure-black-background-wallpaper-image_396550.jpg"
                }
                alt="icon"
                onClick={handleImgClick}
              />
              {/* <img className="thumbnailIcon" src={badgeIcon("oobc")} alt="" /> */}
            </div>
            <div className="publishform__icon__buttons">
              {isDeveloping ? (
                <React.Fragment>
                  <div
                    className="publishform__icon__button"
                    onClick={handleAddClick}
                  >
                    {props.intl.formatMessage({
                      id: "ID_BUILDER_EDITPOP_IMAGE_CHANGE",
                    })}
                  </div>
                  {/* <div
                    className="publishform__icon__button"
                    onClick={handleFileDelete}
                  >
                    {props.intl.formatMessage({
                      id: "ID_BUILDER_EDITPOP_IMAGE_DELETE",
                    })}
                  </div> */}
                </React.Fragment>
              ) : (
                <div
                  className="publishform__icon__button"
                  onClick={handleAddClick}
                >
                  {props.intl.formatMessage({
                    id: "ID_BUILDER_EDITPOP_IMAGE_CHANGE",
                  })}
                </div>
              )}
            </div>
            <input
              id="PublishForm__icon__input"
              className="publishform__icon__input"
              type="file"
              accept=".jpg,.jpeg,.png,.mov"
              onChange={handleFileInput}
            />
          </div>
        </div>

        {/* tag */}
        {/* <div className="publishform__row">
          <div className="publishform__title__wrapper">
            <p className="publishform__title publishform__title__tag">
              {props.intl.formatMessage({
                id: "ID_BUILDER_EDITPOP_TAG"
              })}
            </p>
          </div>
          <div className="tag--added">
            {tags.map((item, index) => {
              return (
                <span
                  key={index}
                  className="tag--added__item"
                >
                  {`#${item}`}
                  <img src={deleteTagIcon} alt="" onClick={() => {onDeleteTag(index);}}/>
                </span>
              );
            })}
          </div>
          <input
            type="text"
            name="tag"
            placeholder={props.intl.formatMessage({
              id: "ID_BUILDER_EDITPOP_TAG_PLACEHOLDER"
            })}
            onChange={handleInputChange}
            className="publishform__input tag"
            autoComplete="off"
            onKeyDown={e => {
              const tag = e.target.value;
              if (e.keyCode === 13 && tag !== "") {
                onAddTag(tag);
                e.target.value = "";
              } else if (e.keyCode === 8 && tag === "" && tags.length > 0) {
                onDeleteTag(tags.length - 1);
              }
            }}
          />
          <div className="tag--recommend">
            {popularTags.map((item, index) => {
              return (
                <span
                  key={index}
                  className="tag--recommend__item"
                  onClick={() => onAddTag(item)}
                >{`#${item}`}</span>
              );
            })}
          </div>
        </div> */}

        {/* code open */}
        <div className="publishform__row">
          <div className="publishform__title__wrapper">
            <p className="publishform__title">
              {props.intl.formatMessage({ id: "ID_BUILDER_EDITPOP_CODE" })}
            </p>
          </div>

          <div className="publishform__code_allow__wrapper">
            <div
              className={`publishform__code_allow ${
                isCopyAllowed ? "On" : "Off"
              }`}
              onClick={handleIsCopyAllowedChange}
            >
              <span />
            </div>

            <span className="text">
              {isCopyAllowed
                ? props.intl.formatMessage({
                    id: "ID_BUILDER_EDITPOP_CODE_OPEN",
                  })
                : props.intl.formatMessage({
                    id: "ID_BUILDER_EDITPOP_CODE_CLOSE",
                  })}
            </span>
          </div>
        </div>

        <div className="publishform__row button_wrapper">
          <div className="cancleBtn" onClick={handleCloseBtn}>
            <span>
              {props.intl.formatMessage({ id: "ID_BUILDER_EDITPOP_CANCEL" })}
            </span>
          </div>
          <div className="publishbtn" onClick={handleSubmit}>
            <span>
              {props.intl.formatMessage({ id: "ID_BUILDER_EDITPOP_UPLOAD" })}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default injectIntl(View);
