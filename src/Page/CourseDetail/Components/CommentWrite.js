import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import TextareaAutosize from "react-textarea-autosize";

const Self = styled.div`
  padding-top: 20px;
  padding-bottom: 30px;
  display: none;

  ${(props) => props.active && `display: block;`}

  @media screen and (max-width: 1169px) {
    width: 88.33%;
    margin: 0 auto;
    padding-top: 0;
    padding-bottom: 46px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;

  ${(props) => props.flexEnd && `justify-content: flex-end;`}
`;

const Image = styled.div`
  width: 45px;
  height: 45px;
  margin-top: 3px;
  margin-right: 15px;
  border-radius: 50%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const InputWrap = styled.div`
  flex: 1;
  display: flex;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  font-size: 16px;
  padding: 14px 16px 13px;
  color: #fff;
  line-height: 1.56;
  resize: none;
  font-family: "Noto Sans KR", sans-serif;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #5b5b5b;
  width: 100px;
  height: 50px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  color: #fff;
  margin-left: 10px;
  margin-top: 10px;
  display: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  ${(props) => (props.focus || props.show) && "display: block;"}
`;

const ButtonCancel = styled(Button)``;

const ButtonSubmit = styled(Button)`
  background-color: rgba(91, 91, 91, 0.4);
  color: rgba(255, 255, 255, 0.3);

  ${(props) => props.focus && props.active && `
    background-color: #ff6f44;
  `}
  
  ${(props) =>
    props.writing &&
    `
    background-color: #ff6f44;
    color: #fff;
  `}
`;

const CommentWrite = ({ commentId, isChild, onAppear, onDisappear, onSubmit, writeMode, hideCommentWrite, ...props }) => {
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState("");

  const inputClickEventRef = useRef((e) => {
    e.stopPropagation();

    if (e.target.name === `comment-write-textarea-${commentId}` ||
      e.target.name === `comment-write-button-${commentId}`) {
      setFocus(true)
    } else {
      setFocus(false)
    }
    
  });
  
  useEffect(() => {
    onAppear(commentId, inputClickEventRef.current)

    return () => {
      onDisappear(commentId)
    }
  }, [])

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    () => {
      if (text) {
        onSubmit(text);
        cancel();
      }
    },
    [text]
  );

  const cancel = useCallback(() => {
    setText("");

    if (hideCommentWrite) {
      hideCommentWrite();
    }
  }, []);

  return (
    <Self active={writeMode} {...props}>
      <Row>
        <Image image={props.userIcon} />
        <InputWrap>
          <Textarea
            name={`comment-write-textarea-${commentId}`}
            minRows={1}
            onChange={handleChange}
            placeholder={props.intl.formatMessage({ id: "ID_COURSE_DETAIL_PLACEHOLDER" })}
            type="text"
            value={text}
          />
        </InputWrap>
      </Row>
      <Row flexEnd>
        <ButtonCancel show={text || isChild} writing={text} focus={focus} onClick={cancel} type="button">
          <FormattedMessage id="ID_COURSE_DETAIL_CANCEL" />
        </ButtonCancel>
        <ButtonSubmit name={`comment-write-button-${commentId}`} show={text || isChild} writing={text} focus={focus} onClick={handleSubmit} type="button">
          <FormattedMessage id="ID_COURSE_DETAIL_WRITE_COMMENT" />
        </ButtonSubmit>
      </Row>
    </Self>
  );
};

export default connect(
  (state) => ({
    userId: state.userinfo.id,
    userIcon: state.userinfo.icon,
    name: state.userinfo.name,
  }),
  {}
)(injectIntl(CommentWrite));
