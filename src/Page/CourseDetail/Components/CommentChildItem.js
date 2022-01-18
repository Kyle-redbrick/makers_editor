import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";

import CommentDetail from "./CommentDetail";
import CommentMore from "./CommentMore";
import CommentWrite from "./CommentWrite";
import { deleteComment, postComment, /*putComment,*/ reportComment } from "../api";

const Self = styled.div``;

const Image = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 15px;
  border-radius: 50%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 1169px) {
    width: 35px;
    height: 35px;
  }
`;

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 16px;
  position: relative;
`;

const CommentBody = styled.div`
  flex: 1;
`;

const CommentChildItem = ({ 
  lectureId,
  item,
  parents,
  onAfterSubmit,
  currentIdOnComment,
  currentIdOnMore,
  handleChangeComment,
  handleChangeMore,
  onAppearCommentWrite,
  onDisappearCommentWrite,
  ...props
}) => {
  const [writeMode, setWriteMode] = useState(false);

  useEffect(() => {
    if (currentIdOnComment !== item.id) {
      setWriteMode(false);
    }
  }, [currentIdOnComment])

  const showWriteComponent = useCallback(() => {
    setWriteMode(true);
    handleChangeComment(item.id);
  }, []);

  const hideWriteComponent = useCallback(() => {
    setWriteMode(false);
  }, []);

  const onSubmit = useCallback(
    async (text) => {
      try {
        await postComment({
          email: props.email,
          lectureId,
          message: text,
          parentCommentId: item.id,
        });
        onAfterSubmit();
      } catch (e) {
        window.alert(e.message);
      }
    },
    [postComment]
  );

  const editComment = useCallback(() => {});

  const handleDeleteComment = useCallback(
    async () => {
      try {
        await deleteComment({ commentId: item.id });
        onAfterSubmit();
      } catch (e) {
        window.alert(e.message);
      }
    },
    [deleteComment]
  );

  const handleReportComment = useCallback(
    async () => {
      try {
        await reportComment({ 
          commentId: item.id,
          email: props.email,
        });
        onAfterSubmit();
      } catch (e) {
        window.alert(e.message);
      }
    },
    [reportComment]
  );

  return (
    <Self {...props}>
      <Comment>
        <Image image={item.user && item.user.icon} />
        <CommentBody>
          <CommentDetail
            item={item}
            showWriteComponent={showWriteComponent}
          />
          <CommentWrite
            isChild={true}
            onSubmit={onSubmit}
            writeMode={writeMode}
            hideCommentWrite={hideWriteComponent}
            onAppear={onAppearCommentWrite}
            onDisappear={onDisappearCommentWrite}
          />
        </CommentBody>
        <CommentMore
          item={item}
          editComment={editComment}
          deleteComment={handleDeleteComment}
          reportComment={handleReportComment}
          currentIdOnMore={currentIdOnMore}
          handleChangeMore={handleChangeMore}
        />
      </Comment>
    </Self>
  );
};

export default connect(
  (state) => ({
    email: state.userinfo.email,
  }),
  {}
)(CommentChildItem);
