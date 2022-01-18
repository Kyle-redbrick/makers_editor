import React, { useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { showPopUp } from "../../../Common/Component/PopUp";
import DreamReport from "../../../Common/Component/DreamReport";
import styled from "@emotion/styled";

import IMAGE from "./../Constants/Images";

const Self = styled.div`
  position: absolute;
  right: 0;
  top: 16px;
`;

const More = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 17px;
  cursor: pointer;

  ${(props) => props.active && `background-color: rgba(255, 255, 255, 0.15);`}
`

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin: 0 2px;
  background-color: rgba(255, 255, 255, 0.5);
`

const MorePopup = styled.div`
  width: 120px;
  padding: 10px;
  border-radius: 16px;
  background-color: #1c1c1c;
  position: absolute;
  top: 44px;
  right: 0;
  display: ${(props) => props.show ? 'block' : 'none'};
  z-index: 10;
`

const PopupItem = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  line-height: 1.5;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`

const Icon = styled.img`
  margin-right: 5px;
  margin-left: 8px;
  width: 34px;
`

const CommentMore = ({ 
  item,
  editComment,
  deleteComment,
  reportComment,
  currentIdOnMore,
  handleChangeMore,
  ...props
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (currentIdOnMore !== item.id) {
      setShow(false);
    }
  }, [currentIdOnMore])

  const togglePopup = useCallback(() => {
    if (!show) {
      handleChangeMore(item.id);
    }

    setShow(!show);
  }, [show]);

  const handleDeleteComment = useCallback(() => {
    setShow(false);
    deleteComment();
  }, []);

  const handleReportComment = useCallback(() => {
    setShow(false);
    showPopUp(
      <DreamReport
        targetType="comment"
        targetContentId={item.id}
        targetUserId={item.user.id}
      />,
      { darkmode: true, dismissButton: false }
    );
  }, []);

  return (
    <Self {...props}>
      <More onClick={togglePopup} active={show}>
        <Dot />
        <Dot />
        <Dot />
      </More>
      <MorePopup show={show}>
        {item.user && item.user.id === props.userId ? (
          <>
            <PopupItem onClick={editComment}>
              <Icon alt="수정 아이콘" src={IMAGE.ICON_COMMENT_EDIT} />
              <FormattedMessage id="ID_COURSE_DETAIL_EDIT" />
            </PopupItem>
            <PopupItem onClick={handleDeleteComment}>
              <Icon alt="삭제 아이콘" src={IMAGE.ICON_COMMENT_DELETE} />
              <FormattedMessage id="ID_COURSE_DETAIL_DELETE" />
            </PopupItem>
          </>
        ) : ( 
          <PopupItem onClick={handleReportComment}>
            <Icon alt="신고 아이콘" src={IMAGE.ICON_COMMENT_SHARE} />
            <FormattedMessage id="ID_COURSE_DETAIL_REPORT" />
          </PopupItem>
        )}
      </MorePopup>
    </Self>
  );
};

export default connect(
  state => ({
    userId: state.userinfo.id,
  }),
  {}
)(CommentMore);