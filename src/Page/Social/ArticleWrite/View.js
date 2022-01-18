import React from "react";
import ReactToolTip from "react-tooltip";
import Layout from "../../../Common/Component/Layout";
import DraftEditor from "../../../Common/Component/DraftEditor";
import "./index.scss";

import mediaImageImg from "../../../Image/social_media_image.svg";
import tooltipImg from "../../../Image/social_tooltip.svg";

export default function View(props) {
  const {
    intl,
    title,
    tags,
    onChangeTitle,
    onClickFile,
    setDraftEditorRef,
    onClickSubmit,
    onAddTag,
    onDeleteTag
  } = props;
  const { formatMessage } = intl;

  const tagSuggestions = [
    formatMessage({ id: "ID_SOCIAL_TAG_QUESTION" }),
    formatMessage({ id: "ID_SOCIAL_TAG_GAME_AD" }),
    formatMessage({ id: "ID_SOCIAL_TAG_GAME_RECOMMEND" }),
    formatMessage({ id: "ID_SOCIAL_TAG_SRPITE_SHARE" }),
    formatMessage({ id: "ID_SOCIAL_TAG_BACKGROUND_SHARE" })
  ];

  return (
    <Layout>
      <div className="socialwrite">
        <ReactToolTip multiline={true} className="socialwrite_tooltip" />
        <div className="socialwrite_header">
          {formatMessage({ id: "ID_SOCIAL_WRITE_HEADER" })}
        </div>
        <input
          className="socialwrite_title_input"
          placeholder={formatMessage({
            id: "ID_SOCIAL_WRITE_TITLE_PLACEHOLER"
          })}
          value={title}
          onChange={onChangeTitle}
        />
        <div className="socialwrite_mediabtns">
          <img
            className="socialwrite_mediabtn"
            src={mediaImageImg}
            alt="mediaImage"
            onClick={onClickFile}
          />
        </div>
        <div className="socialwrite_editor">
          <DraftEditor
            ref={setDraftEditorRef}
            placeholder={formatMessage({
              id: "ID_SOCIAL_WRITE_EDITOR_PLACEHOLER"
            })}
          />
        </div>
        <div className="socialwrite_tag_wrapper">
          <div className="socialwrite_header">
            {formatMessage({ id: "ID_SOCIAL_WRITE_TAG" })}
            <img
              className="socialwrite_tooltip_img"
              src={tooltipImg}
              alt="tooltip-tag"
              data-tip={formatMessage({ id: "ID_SOCIAL_WRITE_TAG_TIP" })}
              data-place="right"
            />
          </div>
          <div className="socialwrite_tag_input_wrapper">
            {tags.map((tag, index) => (
              <div
                className="socialwrite_tag"
                key={index}
                onClick={() => {
                  onDeleteTag(index);
                }}
              >
                <div style={{ width: "100%" }}>#{tag}</div>
              </div>
            ))}
            <input
              className="socialwrite_tag_input"
              placeholder={formatMessage({
                id: "ID_SOCIAL_WRITE_TAG_PLACEHOLER"
              })}
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
          </div>
          <div className="socialwrite_tag_suggestions">
            {tagSuggestions.map((tag, index) => (
              <div
                className="socialwrite_tag"
                key={index}
                onClick={() => {
                  onAddTag(tag);
                }}
              >
                <div style={{ width: "100%" }}>#{tag}</div>
              </div>
            ))}
          </div>
        </div>
        <button className="socialwrite_submitbtn" onClick={onClickSubmit}>
          {formatMessage({ id: "ID_SOCIAL_WRITE_SUBMIT" })}
        </button>
      </div>
    </Layout>
  );
}
