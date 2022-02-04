import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
import "moment/locale/ko";


import styled from "@emotion/styled";

import IMAGE from "./../Constants/Images";

const Self = styled.div``;

const NameWrap = styled.div`
  display: flex;
  align-items: center;
  padding-top: 4px;  
  margin-bottom: 5px;
`

const Name = styled.div`
  font-size: 15px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  margin-right: 5px;
`

const Time = styled.div`
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);
`

const Text = styled.div`
  font-size: 16px;
  line-height: 1.56;
  color: #ffffff;
  margin-bottom: 5px;

  ${(props) => props.isDeletedPopup && `
    color: rgba(255, 255, 255, 0.5);
  `}
`

const Tag = styled.span`
  margin-right: 5px;
  padding-left: 5px;
  padding-right: 5px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 23px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    left: 0;
    top: 1px;
  }
`

const Reply = styled.div`
  display: inline-block;
`

const ReplyTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: 0.16px;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  cursor: pointer;
`

const IconReply = styled.img`
  width: 22px;
`

const CommentDetail = ({ item, showWriteComponent, ...props }) => {
  return (
    <Self {...props}>
      <NameWrap>
        <Name>{item.user && item.user.name}</Name>
        <Time>{moment(item.createdAt).locale(props.intl.locale).fromNow()}</Time>
      </NameWrap>
      {
        item.isDeleted ? (
          <Text isDeletedPopup><FormattedMessage id="ID_COURSE_DETAIL_DELETE_POPUP" /></Text>
        ) : (
          <Text>
            {item.parent && <Tag>@{item.parent.user.name}</Tag>}
            {item.text}
          </Text>
        )
      }
      <Reply>
        <ReplyTitle onClick={showWriteComponent}>
          <IconReply src={IMAGE.ICON_REPLY} alt="말풍선 아이콘" />
          <FormattedMessage id="ID_COURSE_DETAIL_REPLY" />
        </ReplyTitle>
      </Reply>
    </Self>
  );
};

export default injectIntl(CommentDetail);
