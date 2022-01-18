import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { PAGETYPE } from "../../../../Common/Util/Constant";
import generatePID from "../../../../Common/Util/PIDGenerator";
import * as request from "../../../../Common/Util/HTTPRequest";
import View from "./View";

function Container(props) {
  const [templateProjects, setTemplateProjects] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const projectsRef = useRef();

  const PAGE_SIZE = 50;

  useEffect(() => {
    getMyProjects();
    if (templateProjects.length === 0) {
      getTemplateProjects();
    }
  }, [props.email, currentPage]);

  const getMyProjects = () => {
    if (!props.email) {
      return;
    }

    let pageOffset = Math.ceil((currentPage - 1) * PAGE_SIZE);
    let params = {
      email: props.email,
      offset: pageOffset,
      limit: PAGE_SIZE,
      type: "js3d"
    };
    request
      .getDevelopingProjectsByType(params)
      .then(res => res.json())
      .then(result => {
        const { rows } = result;
        setMyProjects(currentPage === 1 ? rows : myProjects.concat(rows));
      })
      .catch(err => console.error(err));
  };

  const getTemplateProjects = () => {
    request
      .getTemplateProjectsByType({ type: "js3d" })
      .then(res => res.json())
      .then(json => {
        setTemplateProjects(json);
      })
      .catch(e => {
        console.error(e);
      });
  };

  const createNewProject = template => {
    const { email, history } = props;
    if (email) {
      let pageURL = `/${PAGETYPE.BUILDER3D}/${generatePID(email)}`;
      if (template) {
        pageURL += `/${template.id}`;
      }

      history.replace({
        pathname: pageURL
      });
      window.location.reload();
    } else {
      let pageURL = `/${PAGETYPE.BUILDER3D}?t=${template.id}`;
      history.replace({
        pathname: pageURL
      });
      window.location.reload();
    }
  };

  const loadProject = pId => {
    props.history.replace({
      pathname: `/${PAGETYPE.BUILDER3D}/${pId}`
    });
    window.location.reload();
  };

  const handleOnScroll = () => {
    const container = projectsRef.current;
    if (
      container.offsetHeight + container.scrollTop >=
      container.scrollHeight
    ) {
      loadMore();
    }
  };

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <View
      email={props.email}
      templateProjects={templateProjects}
      myProjects={myProjects}
      loadProject={loadProject}
      createNewProject={createNewProject}
      handleOnScroll={handleOnScroll}
      projectsRef={projectsRef}
    />
  );
}

export default connect(state => ({
  email: state.userinfo.email,
  userId: state.userinfo.id
}))(injectIntl(withRouter(Container)));
