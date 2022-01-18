import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import QueryString from "query-string"
import styled from "@emotion/styled";

import IMAGE from "./../Constants/Images";

const Self = styled.div`
  margin-top: 15px;

  &:nth-child(n + 3) .game-content {
    border-top: solid 1px rgba(255, 255, 255, 0.2);
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15px;
`

const Icon = styled.div`
  width: 53px;
  height: 53px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;

  ${(props) =>
    props.type === "javascript" &&
    `
      background-image: url(${IMAGE.BADGE_JS});
  `}

  ${(props) =>
    props.type === "python" &&
    `
      background-image: url(${IMAGE.BADGE_PYTHON});
  `}

  ${(props) =>
    props.type === "oobc" &&
    `
      background-image: url(${IMAGE.BADGE_PUZZLE});
  `}
`

const Image = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 16px;
  border: solid 1px rgba(255, 255, 255, 0.1);
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  margin-top: 15px;
  margin-right: 15px;
`

const Item = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
`

const User = styled.div`
  display: flex;
  align-items: center;
`

const UserIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50%;
`

const UserName = styled.div`
  margin-left: 6px;
  font-size: 18px;
  line-height: 1.22;
  color: rgba(255, 255, 255, 0.5);

  @media screen and (max-width: 1169px){
    font-size: 14px;
  }
`

const Counts = styled.div`
  display: flex;
`

const Count = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;
`

const CountIcon = styled.img`
  display: block;
  margin-right: 6px;
  width: 16px;
  height: 16px;
`

const CountNumber = styled.span`
  padding-bottom: 2px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);
`

const Title = styled.div`
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
  color: #fff;

  @media screen and (max-width: 1169px){
    font-size: 16px;
    line-height: 1.38;
    white-space: normal; 
    height: 2.76em; 
    overflow: hidden;
    text-align: left; 
    word-wrap: break-word; 
    display: -webkit-box; 
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical; 
  }
`

const TitleWrap = styled.div``

const GameItem = ({ item, ...props }) => {
  const history = useHistory();
  const location = useLocation();

  const onClickItem = useCallback(() => {
    const query = QueryString.parse(location.search);
    query.pId = item.id;
    const queryString = QueryString.stringify(query);
    history.push(location.pathname + "?" + queryString);
  }, [item]);

  return (
    <Self {...props}>
      <Item onClick={onClickItem}>
        <Image image={item.icon}>
          <Icon type={item.type} />
        </Image>
        <Content className="game-content">
          <TitleWrap>
            <Title>{item.title}</Title>
            <User>
              <UserIcon src={item.userIcon} />
              <UserName>{item.userName}</UserName>
            </User>
          </TitleWrap>
          <Counts>
            <Count>
              <CountIcon src={IMAGE.ICON_LIKE} />
              <CountNumber>{item.likeCount}</CountNumber>
            </Count>
            <Count>
              <CountIcon src={IMAGE.ICON_VIEW} />
              <CountNumber>{item.viewCount}</CountNumber>
            </Count>
            <Count>
              <CountIcon src={IMAGE.ICON_COMMENT} />
              <CountNumber>{item.commentCount}</CountNumber>
            </Count>
          </Counts>
        </Content>
      </Item>
    </Self>
  );
};

export default GameItem;
