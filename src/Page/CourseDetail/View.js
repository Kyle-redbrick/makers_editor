import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Layout from "../../Common/Component/Layout";

import Intro from "./Sections/Intro";
import Lectures from "./Sections/Lectures";
import { Lecture, Project, Game } from "../../models";

import { getLecture } from "./api";
import { getLearn } from "../../Common/Util/HTTPRequest";

const Self = styled.div``;

const Br = styled.div`
  margin: 0 auto 19.5px;
  width: 100%;
  max-width: 1170px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);

  @media screen and (max-width: 1169px) { 
    width: 88.33vw;
    margin: 0 auto;
  }
`;

const View = ({ courseId }) => {
  const [scrollFixed, setScrollFixed] = useState(false);
  const [selectedCurr, setSelectedCurr] = useState({});
  const [lecture, setLecture] = useState({});
  const [projects, setProjects] = useState([]);
  const [publishedGames, setPublishedGames] = useState([]);

  const init = async() => {
    getLecture({ id: courseId }).then((lecture) => {
      if (lecture) {
        setProjects(lecture.projects.map((p) => new Project(p, lecture)));
        if(lecture.publishedList) {
          setPublishedGames(lecture.publishedList.map((game) => new Game(game)));
        }
        setLecture(new Lecture(lecture));
      }
    });

    const curriculum = await getLearn().then(json => json.body.curriculum);
    for(let i = 0; i < curriculum.length; i++) {
      if(curriculum[i].course.lectureId == courseId) {
        setSelectedCurr(curriculum[i]);
      }
    }
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [courseId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    function watchScroll() {
      window.addEventListener("scroll", scroll);
    }

    watchScroll();

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  const scroll = useCallback(() => {
    if (window.pageYOffset > 330) {
      setScrollFixed(true);
    } else {
      setScrollFixed(false);
    }
  }, []);

  const onWindowFocus = useCallback(init, []);
  useEffect(() => {
    window.addEventListener("focus", onWindowFocus);
    return () => {
      window.removeEventListener("focus", onWindowFocus);
    }
  }, [onWindowFocus]);

  return (
    <Layout isHome={true} hideHeader={scrollFixed ? true : false}>
      <Self>
        <Intro
          lecture={lecture} 
          fixed={scrollFixed}
        />
        <Lectures
          curriculum={selectedCurr}
          projects={selectedCurr.projects}
          items={projects}
        />
      </Self>
    </Layout>
  );
};

export default View;
