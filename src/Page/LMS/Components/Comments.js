import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";

import Container from "../../CourseDetail/Components/Container";
import Title from "../../CourseDetail/Components/Title";
import CommentItem from "../../CourseDetail/Components/CommentItem";
import CommentWrite from "../../CourseDetail/Components/CommentWrite";
import { Comment } from "../../../models"

import { getComments, postComment } from "../api";

import {FormattedMessage} from "react-intl";

const Self = styled.div`
  width: 100%;
  padding-bottom: 160px;

  @media screen and (max-width: 1334px){
    padding-bottom: 50px;
  }
`;

const CommentsWrap = styled.div``;

const Comments = ({ questionId, items, onAfterSubmit, ...props }) => {
  const [currentIdOnComment, setCurrentIdOnComment] = useState(null);
  const [currentIdOnMore, setCurrentIdOnMore] = useState(null);
  const inputClicksEventRef = useRef(new Map());
  const inputClickEventRef = useRef((e) => {
    inputClicksEventRef.current.forEach(v => v(e))
  }, []);
  const [comments, setComments] = useState([]);

  const init = useCallback(() => {
    fetchComments();
  }, [questionId])

  useEffect(init, []);

  useEffect(() => {
    window.addEventListener("click", inputClickEventRef.current);
    return () => {
      window.removeEventListener("click", inputClickEventRef.current);
    };
  }, []);

  const handleChangeMore = useCallback((id) => {
    setCurrentIdOnMore(id);
  }, [])

  const handleChangeComment = useCallback((id) => {
    setCurrentIdOnComment(id);
  }, [])

  const handleCreateComment = useCallback(
    async (text) => {
      try {
        await postComment({
          email: props.email,
          contentId: questionId,
          message: text,
          contentType: "dreamQuestion"
        });

        onAfterSubmit();
        fetchComments();
      } catch (e) {
        window.alert(e.message);
      }
    },
    [postComment]
  );

  const handleAppearCommentWrite = useCallback((id, callback) => {
    inputClicksEventRef.current.set(id, callback)
  }, [])


  const handleDisappearCommentWrite = useCallback((id) => {
    inputClicksEventRef.current.delete(id)
  }, [])

  const fetchComments = useCallback(
    () => {
      getComments({ contentId: questionId, contentType: "dreamQuestion" }).then((comments) => {
        setComments(comments.rows.map((c) => new Comment(c)));
      });
    },
    [getComments]
  );

  return (
    <Self {...props}>
      <Container>
        <Title><FormattedMessage id="ID_COMMENT_TITLE" /></Title>
        <CommentWrite
          commentId="root"
          onDisappear={handleDisappearCommentWrite}
          onAppear={handleAppearCommentWrite}
          onSubmit={handleCreateComment}
          writeMode={true}
        />
        <CommentsWrap>
          {comments.map((item) => (
            <CommentItem 
              lectureId={questionId}
              key={item.id}
              item={item}
              onAfterSubmit={onAfterSubmit}
              currentIdOnComment={currentIdOnComment}
              currentIdOnMore={currentIdOnMore}
              handleChangeComment={handleChangeComment}
              handleChangeMore={handleChangeMore}
              onAppearCommentWrite={handleAppearCommentWrite}
              onDisappearCommentWrite={handleDisappearCommentWrite}
            />
          ))}
        </CommentsWrap>
      </Container>
    </Self>
  );
};


export default connect(
  state => ({
    email: state.userinfo.email,
  }),
  {}
)(Comments);
