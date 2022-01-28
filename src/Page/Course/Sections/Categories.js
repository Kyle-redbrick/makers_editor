import React, { useCallback, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import styled from "@emotion/styled";
import TitleLabel from "../Components/TitleLabel";
import Title from "../Components/Title";
import Category from "../Components/Category";
import CategoryIntro from "../Components/CategoryIntro";
import CategorizedItem from "../Components/CategorizedItem";
import Container from "../Components/Container";

const Self = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding-bottom: 160px;
  min-height: 700px;

  @media screen and (max-width: 1169px){
    padding-bottom: 50px;
  }
`;

const CategoriesRow = styled.div`
  display: flex;
  justify-content: flex-start;

  @media screen and (max-width: 1169px) {
    width: 88.33vw;
    flex-wrap: wrap;
    margin: 20px auto 10px;
  }
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 270px);
  grid-column-gap: 30px;
  grid-row-gap: 40px;

  @media screen and (max-width: 1169px) {
    width: 88.33vw;
    margin: 0 auto;
    grid-template-columns: repeat(2, 42.7vw);
    grid-column-gap: 10px;
    grid-row-gap: 30px;
  }
`;

const Categories = ({ children, courses = [], items, ...props }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const handleClickCategory = useCallback(
    (categoryId) => {
      setSelectedCategoryId(categoryId);
    },
    [setSelectedCategoryId]
  );

  const COURSES = [
    {
      id: "all",
      title: props.intl.formatMessage({ id: "ID_ALL" }),
    },
    ...courses,
  ];

  return (
    <Self {...props}>
      <Container>
        <TitleLabel>
          <FormattedMessage id="ID_DREAM_CATEGORY_TITLE_LABEL" />
        </TitleLabel>

        <Title>
          <FormattedMessage id="ID_DREAM_CATEGORY_TITLE" />
        </Title>

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

        {COURSES.map((course) => (
          <CategoryIntro
            active={selectedCategoryId === course.id}
            categoryId={course.id}
            key={course.id}
            onClick={handleClickCategory}
          >
            {selectedCategoryId === course.id && course.introduction}
          </CategoryIntro>
        ))}

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
      </Container>
    </Self>
  );
};

export default injectIntl(Categories);
