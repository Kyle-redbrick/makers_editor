import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import styled from "@emotion/styled";
import { getQnas } from "../api";
import { Question } from "../../../models";

import Button from "../Components/Button";
import Title from "../Components/Title";

import { COLOR } from "./../Constants";
import { IMAGE } from "./../Constants/Images";
import { FormattedMessage } from "react-intl";

const Self = styled.div` flex: 1;
  padding-bottom: 100px;

  @media screen and (max-width: 1169px){
    width: 88.33vw;
    margin: 0 auto;
  }
`;

const StyledLink = styled(Link)`
  font-size: 0;
`;

const StyledTitle = styled(Title)`
  padding-top: 10px;
  margin-bottom: 0;
  align-items: flex-end;

  @media screen and (max-width: 1169px){
    padding-top: 0;
    align-items: center;
  }
`;

const TitleText = styled.div`
  flex: 1;

  @media screen and (max-width: 1169px){
    font-size: 24px;
  }
`;

const TitleButton = styled(Button)`
  background-color: ${COLOR.ORANGE};

  @media screen and (max-width: 1169px){
    width: 120px;
    height: 40px;
    font-size: 14px;
    font-weight: 500
  }
`;

const PrevButton = styled(Button)`
  width: 92px;
  height: 34px;
  margin-right: 28px;
  border-radius: 17px;
  color: rgba(255, 255, 255, 0.5);
  background-color: #1a1a1a;
`

const NextButton = styled(Button)`
  width: 92px;
  height: 34px;
  margin-left: 28px;
  border-radius: 17px;
  background-color: rgba(255, 255, 255, 0.3);
`
const PageButton = styled(Button)`
  width: 44px;
  height: 34px;
  margin: 0 0 0 10px;
  /* padding: 11px 17px 9px 18px; */
  border-radius: 17px;
  background-color: ${(props) => (props.active ? COLOR.ORANGE : "rgba(255, 255, 255, 0.2)")};
`

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin: 39px 0 67px 0;
`

const EmptyQuestions = styled.div`
  padding-top: 51.5px;
  padding-bottom: 118px;
  text-align: center;
`;

const EmptyIcon = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
`;

const EmptyDesc = styled.div`
  width: 296px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.56;
  color: rgba(255, 255, 255, 0.5);
`;

const StyledQuestions = styled.div`
  margin-bottom: 16px;
`;

const StyledQuestion = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
`;

// const QuestionId = styled.div`
//   width: 72px;
//   font-size: 16px;
//   line-height: 1.38;
//   text-align: center;
//   color: rgba(255, 255, 255, 0.5);
// `;

const QuestionType = styled.div`
  width: 72px;
  font-size: 16px;
  line-height: 1.38;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 16px;

  @media screen and (max-width: 1169px){
    width: 63px;
    margin-left: 0;
  }
`;

const QuestionTitle = styled.div`
  flex: 1;
  font-size: 16px;
  line-height: 1.38;
  color: #fff;
  margin-left: 25px;

  @media screen and (max-width: 1169px){
    max-width: calc(100% - 63px - 100px); // 63px: 타입, 100px: 답변 상태
    margin-left: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const QuestionLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  /* max-width: 870px;
  overflow: hidden;
  padding-right: 1rem;
  position: relative;

  &:after {
    position: absolute;
    content: "...";
  } */
`;

const QuestionCreatedAt = styled.div`
  font-size: 16px;
  line-height: 1.38;
  color: rgba(255, 255, 255, 0.5);
  width: 138px;

  @media screen and (max-width: 1169px){
    display: none;
  }
`;

const StyledQuestionReplied = styled.div`
  width: 150px;
  font-size: 16px;
  line-height: 1.38;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 25px;

  @media screen and (max-width: 1169px){
    width: 100px;
    padding: 0 0 0 20px;
  }
`;

const QuestionRepliedIcon = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  background-color: ${(props) => (props.active ? COLOR.MINT : "rgba(255, 255, 255, 0.2)")};
  border-radius: 5px;
`;

// const More = styled.div`
//   width: 52px;
//   height: 52px;
//   cursor: pointer;
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;
//   background-image: url(${IMAGE.ICON_MORE});
//   margin: 0 auto;
// `;

const NewTag = styled.span`
  width: 27px;
  height: 22px;
  font-size: 11px;
  font-weight: bold;
  line-height: 2;
  letter-spacing: 0.6px;
  text-align: center;
  color: ${COLOR.ORANGE};
  margin-left: 10px;
`

const TypeSelect = styled.div`
  width: 120px;
  height: 52px;
  padding: 16px;
  border-radius: 10px;
  background-color: #1c1c1c;
  font-size: 16px;
  line-height: 1.38;
  color: ${COLOR.ORANGE};
  position: relative;
  cursor: pointer;
  margin-right: 10px;

  @media screen and (max-width: 1169px){
    display: none;
  }
`

const MobileTypeSelect = styled.button`
  display: none;

  @media screen and (max-width: 1169px){
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: #252525;
    border: none;
    outline: none;
  }
`;

const MobileTypeIcon = styled.img`
  width: 34px;
  height: 34px;
`;

const IconSelect = styled.div`
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${props => props.active ? `url(${IMAGE.ICON_SELECT_OPEN})` : `url(${IMAGE.ICON_SELECT})`};
  position: absolute;
  right: 16px;
  top: 16px;
`

const SelectOptions = styled.div`
  position: absolute;
  top: 62px;
  left: 0;
  width: 100%;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.5);
  background-color: #1c1c1c;
  z-index: 10;
  display: ${(props) => props.active ? 'block' : 'none'};
`

const Option = styled.div`
  padding: 14px 16px 12px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.5;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  ${(props) => props.selected && `
    background-color: rgba(255, 255, 255, 0.05);

    @media screen and (max-width: 1169px){
      background-color: #1c1c1c;
      color: #ff6f44;
    }
  `}
`
const DeletedQuestionMessage = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 1.38;
  color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const MobileFilterWrap = styled.div`
  position: absolute;
  z-index: 10; // 모바일 공통 메뉴 가리기 위함
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: calc(100% - 50px);
  padding-top: 20px;
  background: #000000;
  color: #ffffff;
`;

const MobileFilterTop = styled.div`
  position: relative;
  width: calc(100% - 42px);
  margin: 0 auto;
`;
const BackBtn = styled.img`
  position: absolute;
  left: 0;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
const MobileFilterTitle = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.33;
  text-align: center;
`;
const MobileFilterBody = styled.div`
  width: calc(100% - 42px);
  margin: 0 auto;
`;
const MobileFilterOption = styled.div`
  padding: 19.5px 0;

  &:nth-child(2){
    border-top: solid 1px rgba(255, 255, 255, 0.2);
  }
`;
const MobileFilterSubTitle = styled.div`
  line-height: 50px;
  padding-left: 12px;
  font-size: 18px;
  font-weight: 500;
`;

const QuestionReplied = ({ replied = false }) => {
  return (
    <StyledQuestionReplied>
      <QuestionRepliedIcon active={replied} />
      {
        replied ? 
        <FormattedMessage id="ID_QNA_QUESTION_ANSWERED"/> : 
        <FormattedMessage id="ID_QNA_QUESTION_UNANSWERED"/>
      }
    </StyledQuestionReplied>
  );
};

const QuestionSection = ({ question }) => {
  return (
    <StyledQuestion>
      <QuestionType>
        {
          question.type === "tech" ? 
            <FormattedMessage id="ID_QNA_QUESTION_TECH"/> : 
            <FormattedMessage id="ID_QNA_QUESTION_STUDY"/>
        }
      </QuestionType>
      <QuestionTitle>
        {question.isDeleted ? (
          <DeletedQuestionMessage>(관리자에 의해 삭제된 질문입니다)</DeletedQuestionMessage>
        ) : (
          <>
            <QuestionLink to={`/lms/questions/detail/${question.id}`}>{question.title}</QuestionLink>
            {isNew24(question.createdAt, Date.now()) && <NewTag>New</NewTag>}
          </>
        )}
      </QuestionTitle>
      <QuestionCreatedAt>{question.formattedCreatedAt()}</QuestionCreatedAt>
      <QuestionReplied replied={!!question.reply} />
    </StyledQuestion>
  );
};

const QuestionPagination = ({ page, pageCount, onChange }) => {
  const PER_PAGE = 5

  const pagination = buildPagination(page, pageCount, PER_PAGE)

  return (
    <PaginationWrap>
      <PrevButton onClick={() => {
        if (page === 1) return 
        onChange(page - 1)
      }}>
        <FormattedMessage id="ID_QNA_PREV"/>
      </PrevButton>
      {pagination.map(num => (
        <PageButton
          key={num}
          active={num === page}
          onClick={() => onChange(num)}
        >{num}
        </PageButton>
      ))}
      <NextButton onClick={() => {
        if (page === pageCount) return
        onChange(page + 1)
      }}>
        <FormattedMessage id="ID_QNA_NEXT"/>
      </NextButton>
    </PaginationWrap>
  )
}

const ALL = <FormattedMessage id="ID_ALL"/>;
const ANSWERED = <FormattedMessage id="ID_QNA_QUESTION_ANSWERED"/>;
const UNANSWERED = <FormattedMessage id="ID_QNA_QUESTION_UNANSWERED"/>;
const ORDER_BY_CREATED = <FormattedMessage id="ID_QNA_ORDER_CREATE"/>;
const ORDER_BY_UPDATED = <FormattedMessage id="ID_QNA_ORDER_UPDATE"/>

const REPLY_STATUS = [
  ALL,
  ANSWERED,
  UNANSWERED
];

const SORT_TYPE = [
  ORDER_BY_CREATED,
  ORDER_BY_UPDATED
];

const QuestionsPage = ({ ...props }) => {
  const [page, setPage] = useState(1);
  // const [offset, setOffset] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [showOptions, setShowOptions] = useState({
    reply: false,
    sort: false
  });
  const [replyStatus, setReplyStatus] = useState(ALL);
  const [sortType, setSortType] = useState(ORDER_BY_UPDATED);
  const PAGE_SIZE = 10;
  const [isMobileFilterOn, setIsMobileFilterOn] = useState("");

  useEffect(
    () => {
      fetch();
    },
    [page]
  );

  useEffect(() => {
    setShowOptions({ ...showOptions, reply: false });
    fetch();
  }, [replyStatus])

  useEffect(() => {
    setShowOptions({ ...showOptions, sort: false });
    fetch();
  }, [sortType])

  const fetch = useCallback(
    async () => {
      let params = {
        offset: Number(page - 1) * Number(PAGE_SIZE),
        limit: Number(PAGE_SIZE),
        userId: props.userId,
        order: ["", ALL, ORDER_BY_CREATED].includes(sortType) ? "createdAt" : "updatedAt",
        reply: ["", ALL].includes(replyStatus) ? "all" : replyStatus === ANSWERED ? "complete" : "ready"
      }

      const _questions = await getQnas(params);

      setQuestionsCount(_questions.count);
      setQuestions(_questions.rows.map((q) => new Question(q)));
    },
    [page, setQuestions, questions, sortType, replyStatus]
  );

  const toggleOptions = useCallback((type, isShow) => {
    setShowOptions({ ...showOptions, [type]: !isShow });
  }, [showOptions]);

  const handleChangeReplyStatus = status => {
    setReplyStatus(status);
  }

  const handleChangeSortType = type => {
    setSortType(type);
  }

  return (
    <Self {...props}>
      {isMobileFilterOn ? (
        <MobileFilterWrap>
          <MobileFilterTop>
            <BackBtn src={IMAGE.ICON_BACK} onClick={() => {setIsMobileFilterOn(false)}}/>
            <MobileFilterTitle>필터</MobileFilterTitle>
          </MobileFilterTop>
          <MobileFilterBody>
            <MobileFilterOption>
              <MobileFilterSubTitle>
                <FormattedMessage id="ID_QNA_QUESTION_RESULT"/>
              </MobileFilterSubTitle>
              {REPLY_STATUS.map((status, i) => (
                <Option
                  onClick={() => handleChangeReplyStatus(status)}
                  selected={replyStatus === status}
                  key={i}
                >
                  {status}
                </Option>
              ))}
            </MobileFilterOption>
            <MobileFilterOption>
              <MobileFilterSubTitle>
                <FormattedMessage id="ID_QNA_QUESTION_SORT"/>
              </MobileFilterSubTitle>
              {SORT_TYPE.map((type, i) => (
                <Option
                  onClick={() => handleChangeSortType(type)}
                  selected={sortType === type}
                  key={i}
                >
                  {type}
                </Option>
              ))}
            </MobileFilterOption>
          </MobileFilterBody>
        </MobileFilterWrap>
        ) : (
        <>
          <StyledTitle>
            <TitleText>
              <FormattedMessage id="ID_LMS_QUESTION"/>
            </TitleText>
            {/* 답변 상태 선택 */}
            <TypeSelect
              selected={replyStatus !== ""}
              onClick={() => toggleOptions("reply", showOptions.reply)}
            >
              <FormattedMessage id="ID_QNA_QUESTION_RESULT"/>
              <IconSelect active={showOptions.reply} />
              <SelectOptions active={showOptions.reply}>
                {REPLY_STATUS.map((status, i) => (
                  <Option
                    onClick={() => handleChangeReplyStatus(status)}
                    selected={replyStatus === status}
                    key={i}
                  >
                    {status}
                  </Option>
                ))}
              </SelectOptions>
            </TypeSelect>
            {/* 정렬 선택 */}
            <TypeSelect
              selected={sortType !== ""}
              onClick={() => toggleOptions("sort", showOptions.sort)}
            >
              <FormattedMessage id="ID_QNA_QUESTION_SORT"/>
              <IconSelect active={showOptions.sort} />
              <SelectOptions active={showOptions.sort}>
                {SORT_TYPE.map((type, i) => (
                  <Option
                    onClick={() => handleChangeSortType(type)}
                    selected={sortType === type}
                    key={i}
                  >
                    {type}
                  </Option>
                ))}
              </SelectOptions>
            </TypeSelect>
            {/* mobile 답변 상태, 정렬 선택 화면 열기 필터 버튼 */}
            <MobileTypeSelect onClick={() => setIsMobileFilterOn(true)}>
              <MobileTypeIcon src={IMAGE.MOBILE_QUESTION_FILTER}/>
            </MobileTypeSelect>
            <StyledLink to="/lms/questions/new">
              <TitleButton width={150} height={50}>
                <FormattedMessage id="ID_QNA_WRITE_QUESTION_TITLE"/>
              </TitleButton>
            </StyledLink>
          </StyledTitle>

          {questions.length ? (
            <>
              <StyledQuestions>
                {questions.map((question, i) => (
                  <QuestionSection question={question} key={i}/>
                ))}
              </StyledQuestions>

              <QuestionPagination
                page={page}
                pageCount={Math.ceil(questionsCount / PAGE_SIZE)}
                onChange={setPage}
              />
            </>
          ) : (
            <EmptyQuestions>
              <EmptyIcon alt="질문하기 아이콘" src={IMAGE.ICON_NOTE} />
              <EmptyTitle>
                <FormattedMessage id="ID_QNA_IS_NEW_QUESTION"/>
              </EmptyTitle>
              <EmptyDesc>
                <FormattedMessage id="ID_QNA_ABOUT_QUETION"/>
                <br />
                <FormattedMessage id="ID_QNA_DO_QUETION"/>
              </EmptyDesc>
            </EmptyQuestions>
          )}
        </>
      )}
    </Self>
  );
};

export default connect(
  (state) => ({
    userId: state.userinfo.id,
  }),
  {}
)(QuestionsPage);

function isNew24(targetTime, nowDate) {
  return moment(nowDate).isBefore(moment(targetTime).add(24, "hours"));
};

function buildPagination(page, pages, perPage) {
  const a = Math.floor(page / perPage);
  const pageNumbers = Array(pages)
    .fill(1)
    .map((num, i) => num + i);

  // 총 페이지가 페이지 사이즈보다 작을 때
  if (pages <= perPage) {
    return pageNumbers.slice(0, perPage);
    // 현재 페이지가 페이지 사이즈보다 크고 총 페이지에서 현재 페이지를 뺀 값이 페이지 사이즈 보다 작을 때
  } else if (page > perPage && pages - page < perPage) {
    return pageNumbers.slice(a * perPage, pages);
    // 현재 페이지와 페이지 사이즈가 같을 때
  } else if (page % perPage === 0) {
    return pageNumbers.slice((a - 1) * perPage, a * perPage);
    // 현재 페이지가 페이지 사이즈보다 클 때
  } else if (page > a * perPage) {
    return pageNumbers.slice(a * perPage, (a + 1) * perPage);
  }
};
