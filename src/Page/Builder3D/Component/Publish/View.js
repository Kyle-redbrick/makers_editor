import React from "react";
import "./index.scss";

import closeIcon from "../../../../Image/builder3d/close-popup-icon.svg";
import changeIcon from "../../../../Image/builder3d/change-icon.svg";
import deleteIcon from "../../../../Image/builder3d/delete-icon.svg";

export default function(props) {
  const {
    isHidden,
    name,
    description,
    icon,
    isCopyAllowed,
    tags,
    popularTags,
    didPublish,
    isWarningName,
    isWarningDescription,
    onClickOverlay,
    onClickClose,
    onClickPublish,
    onChangeName,
    onChangeDescription,
    onChangeIsCopyAllowed,
    handleIconChange,
    onClickIconChange,
    onClickIconDelete,
    onClickTagAt,
    onClickTagInputEnter,
    onClickTagInpuBackspace,
    onClickPopularTag
  } = props;
  return (
    <div className={`publish${isHidden ? " publish-hidden" : ""}`}>
      <div className="publish_overlay" onClick={onClickOverlay} />
      <div className="publish_container">
        <div className="publish_header">
          <div className="publish_title">퍼블리싱</div>
          <div className="publish_closeBtn" onClick={onClickClose}>
            <img src={closeIcon} alt="close" />
          </div>
        </div>
        <div className="publish_body">
          <div className="publish_left">
            {/* ==================== icon ========================= */}
            <div className="publish_field publish_field-icon">
              <div className="publish_field_title">앱 아이콘</div>
              <div className="publish_icon">
                {icon && <img src={icon} alt="icon" />}
              </div>
              <input
                id="iconFileInput"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleIconChange}
              />
              <div
                className="publish_btn publish_btn-iconChange"
                onClick={onClickIconChange}
              >
                <img src={changeIcon} alt="" />
                아이콘 변경
              </div>
              <div
                className="publish_btn publish_btn-iconDelete"
                onClick={onClickIconDelete}
              >
                <img src={deleteIcon} alt="" />
                삭제하기
              </div>
            </div>
            {/* ==================== icon ========================= */}
          </div>
          <div className="publish_right">
            {/* ==================== name ========================= */}
            <div
              className={`publish_field publish_field-name${
                isWarningName ? " publish_field-warn" : ""
              }`}
            >
              <label>
                <div className="publish_field_title">앱 이름</div>
                <input
                  id="name"
                  value={name}
                  placeholder="앱 이름을 입력해주세요."
                  onChange={onChangeName}
                />
              </label>
            </div>
            {/* ==================== name ========================= */}
            {/* ==================== description ========================= */}
            <div
              className={`publish_field publish_field-description${
                isWarningDescription ? " publish_field-warn" : ""
              }`}
            >
              <label>
                <div className="publish_field_title">앱 설명</div>
                <textarea
                  id="description"
                  value={description}
                  placeholder="앱 설명을 입력해주세요."
                  onChange={onChangeDescription}
                />
              </label>
            </div>
            {/* ==================== description ========================= */}
            {/* ==================== tags ========================= */}
            <div className="publish_field publish_field-tags">
              <div className="publish_field_title">태그</div>
              <div className="publish_tags">
                {tags.map((tag, index) => {
                  return (
                    <div key={tag} className="publish_tag">
                      {`#${tag}`}
                      <img
                        className="tagDeleteBtn"
                        onClick={() => {
                          onClickTagAt(index);
                        }}
                        src={closeIcon}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
              <input
                placeholder="태그를 선택하거나 입력해주세요."
                autoComplete="off"
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    onClickTagInputEnter(e);
                  } else if (e.keyCode === 8) {
                    onClickTagInpuBackspace(e);
                  }
                }}
              />
              <div className="publish_popular_tags">
                {popularTags.slice(0, 5).map((tag, index) => {
                  return (
                    <div
                      key={tag}
                      className="publish_popular_tag"
                      onClick={() => {
                        onClickPopularTag(tag);
                      }}
                    >{`#${tag}`}</div>
                  );
                })}
              </div>
            </div>
            {/* ==================== tags ========================= */}
            {/* ==================== isCopyAllowed ========================= */}
            <div className="publish_field publish_field-isCopyAllowed">
              <div className="publish_field_title">프로젝트 공개 여부</div>
              <div className="publish_radios">
                <div className="publish_radio">
                  <label>
                    <input
                      type="radio"
                      name="isCopyAllowed"
                      checked={isCopyAllowed}
                      onChange={onChangeIsCopyAllowed}
                    />
                    <div className="publish_radio_title">공개</div>
                    <span className="checkmark" />
                  </label>
                </div>
                <div className="publish_radio">
                  <label>
                    <input
                      type="radio"
                      name="isCopyAllowed"
                      checked={!isCopyAllowed}
                      onChange={onChangeIsCopyAllowed}
                    />
                    <div className="publish_radio_title">비공개</div>
                    <span className="checkmark" />
                  </label>
                </div>
              </div>
            </div>
            {/* ==================== isCopyAllowed ========================= */}
            <div
              className="publish_btn publish_btn-publish"
              onClick={onClickPublish}
            >
              <span>{didPublish ? "업데이트" : "퍼블리싱"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
