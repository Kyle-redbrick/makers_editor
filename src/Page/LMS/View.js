import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import Layout from "../../Common/Component/Layout";
import { PAGE } from "./Constants";
import Lnb from "./Sections/Lnb";
import CourseById from "./Sections/Course";
import Inventory from "./Sections/Inventory";
import "./index.scss";

const View = (props) => {

  const [scrollFixed, setScrollFixed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1169);
  const [isLmsMobileMenuOn, setIsLmsMobileMenuOn] = useState(false);

  const scroll = useCallback(() => {
    if (window.pageYOffset > 5 && window.innerWidth < 1169) {
      setScrollFixed(true);
    } else {
      setScrollFixed(false);
    }
  }, []);

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", scroll);
    }
    window.addEventListener('resize', resize);
    watchScroll();
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener('resize', resize);
    };
  });

  const resize = useCallback(() => {
    setIsMobile(window.innerWidth < 1169);
  })

  const onClickLmsMobileMenu = () => {
    setIsLmsMobileMenuOn(!isLmsMobileMenuOn);
  }
  
  const Self = styled.div`
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    padding-top: 20px;
  
    @media screen and (max-width: 1169px) {
      flex-direction: column;
      padding: 0;
    }
  `;

  return (
    <Layout hideHeader={scrollFixed ? true : false}>
      <Self>
        <Lnb
          path={props.path}
          fixed={scrollFixed}
          isMobile={isMobile}
          isLmsMobileMenuOn={isLmsMobileMenuOn}
          onClickLmsMobileMenu={onClickLmsMobileMenu}
         // coursesProgress={props.coursesProgress}
         // updateCourses={props.updateCourses}
        />
        {props.path === PAGE.MISSION && <CourseById {...props} />}
        {props.path === PAGE.INVENTORY && <Inventory />}
      </Self>
    </Layout>
  );
};

export default View;
