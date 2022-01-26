import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import Layout from "../../Common/Component/Layout";
import * as Popup from "../../Common/Component/PopUp";

import IntroPopup from "./Components/IntroPopup";
import Banners from "./Sections/Banners";
import Categories from "./Sections/Categories";
import Contents from "./Sections/Contents";
import SubBanner from "./Sections/SubBanner";

import arrowPrev from "../../Image/course/arrow-prev.svg";
import arrowNext from "../../Image/course/arrow-next.svg";

import { getBanners, getCourses, getLectures, getPopularLectures } from "./api";

import "./index.scss";
import { Banner, Course, Lecture } from "../../models";

const GlobalStyle = css`
  *:focus {
    outline:none;
  }

  .slick-list {
    font-size: 0;
  }

  .slick-track {
    min-width: 1200px;
  }

  .slick-slide {
    position: relative;

    &:not(.slick-active) {
      &:before {
        content: "";
        position: absolute;
        left: 15px;
        top: 0;
        background-color: rgba(0, 0, 0, 0.75);
        width: calc(100% - 30px);
        height: 100%;
        border-radius: 16px;
        z-index: 10;
        @media screen and (max-width: 1169px) {
          background-color: transparent;
        }
      }
    }
  }

  .slick-contents {
    .slick-slide:not(.slick-active):before {
      height: 360px;
    }
  }

  .slick-arrow {
    font-size: 0;
    border: none;
    padding: 0;
    width: 52px;
    height: 52px;
    background-color: transparent;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 50%;
    margin-top: -26px;
    z-index: 100;
    cursor: pointer;

    &:before {
      display: none;
    }
    
    &.slick-prev,
    &.slick-next {
      width: 52px;
      height: 52px;
    }

    &.slick-prev {
      background-image: url(${arrowPrev});
      left: -67px;

      &:hover {
        background-image: url(${arrowPrev});
      }
      @media (max-width: 1300px) {
        left: 15px;
      }
    }

    &.slick-next {
      background-image: url(${arrowNext});
      right: -67px;

      &:hover {
        background-image: url(${arrowNext});
      }
      @media (max-width: 1300px) {
        right: 15px;
      }
    }

    &:focus {
      outline: none;
    }
  }

  .slick-dots {
    list-style: none;
    padding: 0;
    margin: 14px 0 18px;
    display: flex !important;
    justify-content: center;
    position: relative;
    bottom: 0;

    li {
      margin: 0 5px;
      font-size: 0;
      width: 8px !important;
      height: 8px !important;

      button {
        font-size: 0;
        width: 8px !important;
        height: 8px !important;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 4px;
        border: none;
        padding: 0;
        cursor: pointer;

        &:before {
          display: none;
        }
      }

      &.slick-active {
        button {
          background-color: #fff;
        }
      }

      &:not(.slick-active) {
        button {
          background-color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
`;

const Self = styled.div`
  overflow: hidden;
`;

const Br = styled.div`
  margin: 39.5px auto 19.5px;
  width: 100%;
  max-width: 1170px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);

  @media screen and (max-width: 1169px) {
    width: 88.33%;
    margin-top: 29.5px;
  }
`;

const View = (props) => {
  let history = useHistory();

  const [courses, setCourses] = useState(new Map());
  const [lectures, setLectures] = useState([]);
  const [mainBanners, setMainBanners] = useState([]);
  const [subBanners, setSubBanners] = useState([]);
  const [popularLectures, setPopularLectures] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1169);

  useEffect(() => {
    getBanners().then((_banners) => {
      const banners = _banners.map(_banner => new Banner(_banner));
      setMainBanners(banners.filter(banner => banner.type === "main"));
      setSubBanners(banners.filter(banner => banner.type === "sub"));
    });

    getPopularLectures().then((lectures) => {
      setPopularLectures(lectures.map((l) => new Lecture(l)));
    });

    init();
    // getCoursesDetail()
    //   .then((courses) => {
    //     const _courses = new Map();
    //     const _lectures = [];
    //     const _projects = [];

    //     courses.forEach((_course) => {
    //       const course = new Course(_course);

    //       _course.lectures.forEach((_lecture) => {
    //         const lecture = new Lecture(_lecture, _course.id);
    //         _lectures.push(lecture);

    //         _lecture.projects.forEach((_project) => {
    //           const project = new Project(_project, _lecture.id, _course.id);
    //           _projects.push(project);
    //         });
    //       });

    //       _courses.set(_course.id, course);
    //     });

    //     setCourses(_courses);
    //     setLectures(_lectures);
    //     setProjects(_projects);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });

    //showIntroPopup();
  }, []);

  const init = async () => {
    const _coursesResult = await getCourses();

    console.log("_coursesResult",_coursesResult)


    const _courses = new Map();
    _coursesResult.forEach((_course) => {
      const course = new Course(_course);
      _courses.set(_course.id, course);
    });
    setCourses(_courses);

    const _lecturesResult = await getLectures({ keyword: props.keyword });

    console.log("_lecturesResult",_lecturesResult)

    const _lectures = [];
    _lecturesResult.rows.forEach((_lecture) => {
      const lecture = new Lecture(_lecture);
      _lectures.push(lecture);
    });
    setLectures(_lectures);
  };

  const showIntroPopup = useCallback(
    () => {
      const didIntroPopup = localStorage.getItem("didIntroPopup");

      if (!didIntroPopup) {
        Popup.showPopUp(<IntroPopup history={history} />, {
          dismissButton: false,
          defaultPadding: false,
          darkmode: true,
          mobileFullscreen: true,
        });
      }
    },
    [IntroPopup, Popup.showPopUp]
  );

  const resize = () => {
    setIsMobile(window.innerWidth < 1169 ? true : false)
  }

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  })
  const courseCategories = [];
  courses.forEach((value) => {
    courseCategories.push(value);
  });

  return (
    <Layout isHome={true}>
      <Global styles={GlobalStyle} />
      <Self>
        <Banners items={mainBanners} isMobile={isMobile}/>
        <SubBanner items={subBanners} />

        <Br />

        <Contents items={popularLectures} />

        <Br />

        <Categories courses={courseCategories} items={lectures} />
      </Self>
    </Layout>
  );
};

export default View;
