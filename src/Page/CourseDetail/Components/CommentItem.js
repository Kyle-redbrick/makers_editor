import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";

import CommentChildItem from "./CommentChildItem";
import CommentDetail from "./CommentDetail";
import CommentMore from "./CommentMore";
import CommentWrite from "./CommentWrite";
import { deleteComment, postComment, /*putComment,*/ reportComment, getCommentsOnComment } from "../api";
import { Comment } from "../../../models";

const Self = styled.div`
  margin: 0 auto;

  @media screen and (max-width:1169px) {
    width: 88.33%;
  }
`;

const Image = styled.div`
  width: 45px;
  height: 45px;
  margin-right: 15px;
  border-radius: 50%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Comments = styled.div``;

const StyledComment = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 16px;
  position: relative;

  @media screen and (max-width : 1169px) {
    padding-top: 0;
    padding-bottom: 16px;
  }
`;

const CommentBody = styled.div`
  flex: 1;
`;

const CommentItem = ({
  lectureId,
  item,
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
  const [comments, setComments] = useState([]);

  useEffect(
    () => {
      fetchCommentsOnComment();
    },
    []
  );

  useEffect(
    () => {
      if (currentIdOnComment !== item.id) {
        setWriteMode(false);
      }
    },
    [currentIdOnComment]
  );

  const fetchCommentsOnComment = useCallback(
    () => {
      getCommentsOnComment({ commentId: item.id }).then(({ count, rows }) => {
        setComments(rows.map((c) => new Comment(c)));
      });
    },
    [getCommentsOnComment, setComments]
  );

  const showWriteComponent = useCallback(() => {
    setWriteMode(true);
    handleChangeComment(item.id);
  }, []);

  const hideWriteComponent = useCallback(() => {
    setWriteMode(false);
  }, []);

  const handleCreateComment = useCallback(
    async (text) => {
      try {
        await postComment({
          email: props.email,
          lectureId,
          message: text,
          parentCommentId: item.id,
        });

        onAfterSubmit();
        fetchCommentsOnComment();
      } catch (e) {
        window.alert(e.message);
      }
    },
    [postComment]
  );

  const handleEditComment = useCallback(async () => {
    // await putComment();
  });

  const handleDeleteComment = useCallback(
    async () => {
      try {
        await deleteComment({ commentId: item.id });
        onAfterSubmit();
        fetchCommentsOnComment();
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
        fetchCommentsOnComment();
      } catch (e) {
        window.alert(e.message);
      }
    },
    [reportComment]
  );

  const onAfterSubmitOnChild = useCallback(() => {
    onAfterSubmit();
    fetchCommentsOnComment();
  }, []);

  return (
    <Self {...props}>
      <StyledComment>
        <Image image={item.user.icon} />
        <CommentBody>
          <CommentDetail item={item} showWriteComponent={showWriteComponent} />
          <CommentWrite
            commentId={item.id}
            isChild={true}
            onSubmit={handleCreateComment}
            writeMode={writeMode}
            hideCommentWrite={hideWriteComponent}
            onAppear={onAppearCommentWrite}
            onDisappear={onDisappearCommentWrite}
          />
          <Comments>
            {comments.map((reply) => (
              <CommentChildItem
                key={reply.id}
                lectureId={lectureId}
                parents={item}
                item={reply}
                onAfterSubmit={onAfterSubmitOnChild}
                currentIdOnComment={currentIdOnComment}
                currentIdOnMore={currentIdOnMore}
                handleChangeComment={handleChangeComment}
                handleChangeMore={handleChangeMore}
                onAppearCommentWrite={onAppearCommentWrite}
                onDisappearCommentWrite={onDisappearCommentWrite}
              />
            ))}
          </Comments>
        </CommentBody>
        <CommentMore
          item={item}
          editComment={handleEditComment}
          deleteComment={handleDeleteComment}
          reportComment={handleReportComment}
          currentIdOnMore={currentIdOnMore}
          handleChangeMore={handleChangeMore}
        />
      </StyledComment>
    </Self>
  );
};

export default connect(
  (state) => ({
    email: state.userinfo.email,
  }),
  {}
)(CommentItem);
