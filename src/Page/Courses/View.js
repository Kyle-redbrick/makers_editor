import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import QueryString from "query-string"
import styled from "@emotion/styled";

import Layout from "../../Common/Component/Layout";
import { Course, Lecture } from "../../models";
import { getCourses, getLectures } from "../Course/api";
import Container from "./Components/Container";
import Results from "./Sections/Results";

import iconSearch from "../../Image/course/icon-search.svg";

const SearchFormWrapper = styled.div`
  padding: 20px 0 39.5px;
  
  @media screen and (max-width: 1169px){
    width: 100%;
    padding: 10px 0 29.5px;
  }
`;

const Form = styled.form``;

const FormGroup = styled.div`
  width: 370px;
  display: flex;
  position: relative;

  @media screen and (max-width: 1169px){
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 52px;
  padding-left: 16px;
  padding-right: 50px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  font-size: 16px;
  line-height: 1.38;
  color: #fff;
  outline: none;

  @media screen and (max-width: 1169px){
    box-sizing: border-box;
    height: 40px;
    padding-left: 13px;
  }
`;

const SearchIcon = styled.img`
  width: 24px;
  position: absolute;
  right: 13px;
  top: 13px;
  z-index: 10;

  @media screen and (max-width: 1169px){
    right: 8px;
    top: 8px;
  }
`;

export default function View(props) {
  const [courses, setCourses] = useState(new Map());
  const [lectures, setLectures] = useState([]);
  const [defaultValue, setDefaultValue] = useState('');
  const history = useHistory();
  const location = useLocation();
  const { keyword, courseType } = QueryString.parse(location.search);

  useEffect(() => {
    if(courseType) {
      switch (courseType) {
        case 'oobc':
          setDefaultValue('도전! 게임 메이커');
          break;
        case 'javascript':
          setDefaultValue('개발본능! 게임 프로듀서');
          break;
        case 'python':
          setDefaultValue('사건 해결: 프로젝트 X');
          break;
        default:
          break;
      }
    }
  }, [])

  useEffect(() => {
    fetch(keyword, courseType);
  }, [keyword, courseType]);

  const handleChange = e => {
    const query = { keyword: e.currentTarget.value, courseType };
    const queryString = QueryString.stringify(query);
    history.replace("?" + queryString);
  }

  const fetch = useCallback(
    async (_keyword, _courseType) => {
      const _coursesResult = await getCourses();

      console.log("_coursesResult",_coursesResult)

      const _courses = new Map();
      _coursesResult.forEach((_course) => {
        const course = new Course(_course);
        _courses.set(_course.id, course);
      });

      setCourses(_courses);

      const queryString = QueryString.stringify({ keyword: _keyword, courseType: _courseType });
      const _lecturesResult = await getLectures({ queryString });
      console.log("_lecturesResult",_lecturesResult)

      const _lectures = [];
      _lecturesResult.rows.forEach((_lecture) => {
        const lecture = new Lecture(_lecture);
        _lectures.push(lecture);
      });

      setLectures(_lectures);
    },
    [getCourses, setCourses, setLectures]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (keyword) {
        handleChange(e);
      } else {
        history.push(`/`);
      }
    },
    [history, fetch, keyword]
  );

  const handleFocus = (e) => {
    if (courseType) {
      e.currentTarget.value = '';
      setDefaultValue('');
    }
  }

  return (
    <Layout isHome={true}>
      <Container>
        <SearchFormWrapper>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input onChange={handleChange} onFocus={handleFocus} value={defaultValue !== '' ? defaultValue : keyword} />
              <SearchIcon alt="돋보기 아이콘" src={iconSearch} />
            </FormGroup>
          </Form>
        </SearchFormWrapper>
        <Results courses={courses} items={lectures} />
      </Container>
    </Layout>
  );
}
