import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";

import Container from "../Components/Container";
import Title from "../Components/Title";
import CommentItem from "../Components/CommentItem"; 
import CommentWrite from "../Components/CommentWrite";
import { postComment } from "../api";

const Self = styled.div`
  width: 100%;
  padding-bottom: 160px;
  display: none;

  @media screen and (max-width: 1169px){
    padding-bottom: 50px;
  }
`;

const CommentsWrap = styled.div``;

const Comments = ({ courseId, items, onAfterSubmit, ...props }) => {  
  const [currentIdOnComment, setCurrentIdOnComment] = useState(null);
  const [currentIdOnMore, setCurrentIdOnMore] = useState(null);
  const inputClicksEventRef = useRef(new Map());
  const inputClickEventRef = useRef((e) => {
    inputClicksEventRef.current.forEach(v => v(e))
  }, []);
  

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
          lectureId: courseId, 
          message: text,
        });

        onAfterSubmit();
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

  return (
    <Self {...props}>
      <Container>
        <Title><FormattedMessage id="ID_COURSE_DETAIL_COMMENT_REVIEW" /></Title>
        <CommentWrite commentId="root" onDisappear={handleDisappearCommentWrite} onAppear={handleAppearCommentWrite} onSubmit={handleCreateComment} writeMode={true} />
        <CommentsWrap>
          {items.map((item) => (
            <CommentItem 
              lectureId={courseId}
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
