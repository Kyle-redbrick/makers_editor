import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Layout from "../../Common/Component/Layout";

import Intro from "./Sections/Intro";
import Lectures from "./Sections/Lectures";
import Games from "./Sections/Games";
import Comments from "./Sections/Comments";
import { Comment, Lecture, Project, Game } from "../../models";

import { getComments, getLecture } from "./api";

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

  const [lecture, setLecture] = useState({});
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState([]);
  const [publishedGames, setPublishedGames] = useState([]);

  const init = useCallback(() => {
    getLecture({ id: courseId }).then((lecture) => {

      console.log("lecture~~~~~~~~~~~~~~",lecture)


      if (lecture) {
        setProjects(lecture.projects.map((p) => new Project(p, lecture)));
        if(lecture.publishedList) {
          setPublishedGames(lecture.publishedList.map((game) => new Game(game)));
        }
        setLecture(new Lecture(lecture));
      }
    });

    fetchComments();
  }, [courseId])

  useEffect(init, []);

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

  const fetchComments = useCallback(
    () => {
      getComments({ lectureId: courseId }).then((comments) => {
        setComments(comments.rows.map((c) => new Comment(c)));
      });
    },
    [getComments]
  );

  const onAfterCommentSubmit = useCallback(() => {
    fetchComments();
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
          // onClickLearnNow={handleClickLearnNow}
        />
        {/* <Br /> */}
        <Lectures items={projects} />
        {/* <Br /> */}
        {
          lecture.type !== 'python' && (
            <>
              <Games items={publishedGames} />
              <Br />
            </>
          )
        }
        <Comments courseId={courseId} items={comments} onAfterSubmit={onAfterCommentSubmit} />
      </Self>
    </Layout>
  );
};

export default View;
