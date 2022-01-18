import React from "react";
import { injectIntl } from "react-intl";
import * as request from "../../../../Common/Util/HTTPRequest";
import PublishPopup from "../../../../Common/Component/Publish";
import { showPopUp } from "../../../../Common/Component/PopUp";
import View from "./View";


class Publish extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      publisheds : [],
      offset: 0,
      loading: true
    }
    this.limit = 40;
  }

  componentDidMount() {
    this.getPublishedProjects();
    window.addEventListener("scroll", this.onScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  getPublishedProjects = () => {
    this.setState(
      {
        loading: true
      },
      () => {
        let params = {
          email: this.props.targetEmail,
          offset: this.state.offset,
          limit: this.limit
        };
        request
        .getPublishedProjectsByLive(params)
        .then(res => res.json())
        .then(result => {
            const { rows } = result;
            this.setState(
              prev => ({
                publisheds: [].concat(prev.publisheds, rows),
                loading: false
              }),
              () => {
                if (rows.length < this.limit) {
                  window.removeEventListener("scroll", this.onScroll);
                }
              }
            );
          })
          .catch(err => console.error(err));
      }
    );
  };

  onScroll = e => {
    if ( window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100 ) {
      const { offset, loading } = this.state;
      if(!loading){
        this.setState({offset: offset + this.limit}, this.getPublishedProjects);
      }
    }
  }

  onClickPublishedSetting = published => {
    showPopUp(
      <PublishPopup
        pId={published.pId}
        isDeveloping={false}
        publishCallback={this.updatePublishedInfo}
        isBuilder={false}
      />,
      { 
        defaultPadding: false, 
        scrollable: true, 
        mobileFullscreen: window.innerWidth < 1170
      }
    );
  };

  updatePublishedInfo = params => {
    this.setState(prev => ({
      publisheds: prev.publisheds.map(item => {
        if (item.pId === params.pId) {
          return {
            ...item,
            ...params
          };
        } else {
          return item;
        }
      })
    }));
  };

  handleProjectLive = async project => {
    project.live = !project.live;
    if (!project.tags) {
      project.tags = [];
    }
    try {
      await request.postPublishedProject(project);
      this.updatePublishedInfo(project);
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { intl, isMyPage } = this.props;
    const { publisheds } = this.state;
    const { onClickPublishedSetting, handleProjectLive } = this;
  
    return (
      <View
        intl={intl}
        isMyPage={isMyPage}
        publisheds={publisheds}
        onClickPublishedSetting={onClickPublishedSetting}
        handleProjectLive={handleProjectLive}
      />
    );
  }
};

export default injectIntl(Publish);