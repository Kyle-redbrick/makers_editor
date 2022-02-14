import React, { memo, useCallback, useEffect, useState } from "react";
import { FormattedMessage, injectIntl} from "react-intl";
import { useLocation } from "react-router";
import QueryString from "query-string"
import styled from "@emotion/styled";
import Category from "../Components/Category";
import CategorizedItem from "../Components/CategorizedItem";
import IMAGE from "./../Constants/Images";

const Self = styled.div`
  border-top: solid 1px rgba(255, 255, 255, 0.2);
  padding-bottom: 160px;

  @media screen and (max-width: 1169px){
    width: 88.33vw;
    padding-bottom: 50px;
  }
`;

const ResultText = styled.div`
  padding-top: 9.5px;
  padding-bottom: 20px;
  font-size: 16px;
  line-height: 1.38;
  color: rgba(255, 255, 255, 0.5);
`;

const CategoriesRow = styled.div`
  display: flex;
  justify-content: flex-start;

  @media screen and (max-width: 1169px){
    flex-wrap: wrap;
  }
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 40px;

  @media screen and (max-width: 1169px){
    margin-top: 10px;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 30px;
  }
`;

const ResultEmpty = styled.div`
  text-align: center;
  padding-bottom: 39.5px;
`;

const EmptyIcon = styled.img`
  width: 150px;
  margin-bottom: 20px;

  @media screen and (max-width: 1169px){
    width: 75px;
    height: 75px;
  }
`;

const EmptyText = styled.div`
  font-size: 22px;
  font-weight: 500;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);

  @media screen and (max-width: 1169px){
    white-space: pre-wrap;
    line-height: 1.36;
  }
`;

const RecommendedItems = styled.div`
  border-top: solid 1px rgba(255, 255, 255, 0.2);
  padding-top: 19.5px;
`;

const RecommendedTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  margin-bottom: 30px;
`;

const Results = memo(({ children, courses, items, ...props }) => {
  const location = useLocation();
  const { courseType } = QueryString.parse(location.search);
  const {intl} = props;
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  useEffect(() => {
    if (courseType) {
      let courseId = 0;

      switch (courseType) {
        case 'oobc':
          courseId = 1;
          break;
        case 'javascript':
          courseId = 2;
          break;
        case 'python':
          courseId = 3;
          break;
        default:
          break;
      }

      if (courseId !== selectedCategoryId) {
        setSelectedCategoryId(courseId);
      }
    }
  }, [])

  const handleClickCategory = useCallback(
    (categoryId) => {
      setSelectedCategoryId(categoryId);
    },
    [setSelectedCategoryId]
  );

  const COURSES = [
    {
      id: "all",
      title: intl.formatMessage({id: "ID_GAME_LIST_TAB_ALL"}),
    },
  ];
  courses.forEach((course) => {
    COURSES.push(course);
  });

  return (
    <Self {...props}>
      <ResultText>{items.length}<FormattedMessage id="ID_COURSES_RESULT_TEXT" /></ResultText>

      {items.length ? (
        <>
          <CategoriesRow>
            {COURSES.map((course) => (
              <Category
                active={selectedCategoryId === course.id}
                categoryId={course.id}
                key={course.id}
                onClick={handleClickCategory}
              >
                {course.title}
              </Category>
            ))}
          </CategoriesRow>

          <Items>
            {items
              .filter((item) => {
                if (selectedCategoryId === "all") {
                  return true;
                }

                return item.course.id === selectedCategoryId;
              })
              .map((item) => (
                <CategorizedItem key={item.id} item={item} />
              ))}
          </Items>
        </>
      ) : (
        <>
          <ResultEmpty>
            <EmptyIcon alt="검색 결과 없음 아이콘" src={IMAGE.NO_RESULT} />
            <EmptyText><FormattedMessage id="ID_COURSES_RECOMMEND_EMPTY_TEXT" /></EmptyText>
          </ResultEmpty>
          <RecommendedItems>
            <RecommendedTitle><FormattedMessage id="ID_COURSES_RECOMMEND_PROJECT" /></RecommendedTitle>
            <Items>
              {/* 추천 게임 표시 */}
              {items
                .filter((item) => {
                  if (selectedCategoryId === "all") {
                    return true;
                  }

                  return item.course.id === selectedCategoryId;
                })
                .map((item) => (
                  <CategorizedItem key={item.id} item={item} />
                ))}
            </Items>
          </RecommendedItems>
        </>
      )}
    </Self>
  );
});

export default injectIntl(Results);
