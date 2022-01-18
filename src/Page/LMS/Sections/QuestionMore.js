import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { deleteQna } from "../api"

import { IMAGE } from "./../Constants/Images";
import * as Popup from "../../../Common/Component/PopUp";
import AlertPopup from "../Components/AlertPopup";

const Self = styled.div`
  position: absolute;
  right: 0;

  /* top: 16px; */
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

const MorePopup = styled.div`
  width: 120px;
  padding: 10px;
  border-radius: 16px;
  /* background-color: #1c1c1c; */
  background-color: #000000;
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
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  ${(props) => props.src && `background-image: ${props.src};`}
`

const popupConfig = {
  dismissButton: false,
  dismissOverlay: true,
  defaultPadding: false,
  darkmode: true,
  mobileFullscreen: true,
  overflow: true,
}

const QuestionMore = ({ item, ...props }) => {
  const [show, setShow] = useState(false);
  let history = useHistory();

  const togglePopup = useCallback(() => {
    setShow(!show);
  }, [show]);

  const deleteQuestion = async id => {
    try {
      const result = await deleteQna({ questionId: id })
      if (result.success) goBack();
      
      return result; 
    } catch (err) {
      console.error(err)
    }
  }

  const editQuestion = () => {
    history.push(`/lms/questions/update/${item.id}`, item);
  }

  const goBack = useCallback(
    () => {
      history.goBack();
    },
    [history]
  );

  return (
    <Self {...props}>
      <More onClick={togglePopup} active={show}>
        <Icon alt="세팅 아이콘" src={IMAGE.ICON_SETTING} />
      </More>
      <MorePopup show={show}>
        {item.userId === props.userId && (
          <>
            <PopupItem onClick={editQuestion}>
              <Icon alt="수정 아이콘" src={IMAGE.ICON_EDIT} />
              수정
            </PopupItem>
            <PopupItem onClick={() => {
              Popup.showPopUp(
                <AlertPopup
                  message="질문을 삭제하시겠습니까?"
                  onSubmit={() => deleteQuestion(item.id)}
                />,
                popupConfig
              );
            }}>
              <Icon alt="삭제 아이콘" src={IMAGE.ICON_TRASH} />
              삭제
            </PopupItem>
          </>
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
)(QuestionMore);