import React, { Component } from "react";
import View from "./View";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import { URL } from "../../../Common/Util/Constant";
import generatePID from "../../Util/PIDGenerator";
import * as request from "../../Util/HTTPRequest";
import Publish from "../../../Common/Component/Publish";
import store from "../../Store";
import PopUp, { showPopUp } from "../../../Common/Component/PopUp";
import SignIn from "../../../Common/Component/SignIn";
import DreamReport from "../DreamReport";
import "./index.scss";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: undefined,
      isLiked: undefined,
      creator: undefined,
      subscribeCount: undefined,
      isSubscribed: undefined,
      randomGames: [],
      isMobile: window.innerWidth <= 1080,
      isDescFold: undefined,
      allCommentCount: 0,
      isShareBoxOpen: false
    };
    this.commentRef = React.createRef();
  }

  componentDidMount() {
    if (!this.props.pId) {
      this.handleClose();
      return;
    }
    this.setProject();
    window.addEventListener("resize", this.handleRandomProjectCount);
    //뒷 페이지 스크롤 막기
    const rootElement = document.documentElement;
    if (rootElement) rootElement.style.overflow = "hidden";
  }
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleRandomProjectCount);
    //뒷 페이지 스크롤 막기
    const rootElement = document.documentElement;
    if (rootElement) rootElement.style.overflow = "initial";
  };
  componentDidUpdate(prevProps) {
    if (prevProps.pId !== this.props.pId) {
      this.setProject();
    }
  }
  setProject = pId => {
    const email = this.props.userinfo.email;
    pId = pId ? pId : this.props.pId;

    request
      .getPublishedProjectV2({ pId })
      .then(res => res.json())
      .then(json => {
        if (!json || !json.live) {
          showPopUp(
            <PopUp.OneButton
              title={this.props.intl.formatMessage({
                id: "PLAY_DETAIL_CANNOT_ACCESS"
              })}
              buttonName={this.props.intl.formatMessage({
                id: "ID_WIZLIVE_CLASS_MESSAGE_SUCCESS_OK"
              })}
              buttonAction={() => {
                this.props.history.replace({
                  pathname: "/game"
                });
              }}
            />,
            { darkmode: true }
          );
        } else {
          json.viewCount += 1;
          this.setState(
            { project: json, allCommentCount: json.commentCount },
            () => {
              this.getRandomProjects();
              this.getCreator();

              this.setState({
                isDescFold:
                  this.state.project.description.length > 180 ||
                  this.state.project.description.split("\n").length > 5
              });

              const curElement = document.querySelector(".wizappDetail__inner");
              //scroll top
              if (curElement) {
                curElement.scrollTop = 0;
              }
            }
          );
        }
      })
      .catch(e => console.error(e));
    request
      .getPublishedLike({ pId, email })
      .then(res => res.json())
      .then(json => this.setState({ isLiked: json.isLiked }))
      .catch(e => console.error(e));

    request.updatePublishedProjectsViewCount({ pId });
  };
  getCreator = () => {
    const { project } = this.state;
    request
      .userProfile({ email: project.user.email })
      .then(res => res.json())
      .then(json => {
        const creator = json;
        creator.email = project.user.email;
        this.setState(
          { creator: creator, subscribeCount: creator.subscribeCount },
          () => {
            const { creator } = this.state;
            request
              .isSubscribe({
                email: this.props.userinfo.email,
                creatorEmail: creator.email
              })
              .then(res => res.json())
              .then(json => {
                const { isSubscribe } = json;
                this.setState({ isSubscribed: isSubscribe });
              });
          }
        );
      })
      .catch(e => console.error(e));
  };
  async getDevProject(pId) {
    return await request
      .getDevelopingProjectInfo({ pId })
      .then(res => res.json())
      .catch(e => console.error(e));
  }

  getRandomProjects = () => {
    request
      .getProjectsByType({
        type: "random",
        limit: 6,
        offset: 0
      })
      .then(res => res.json())
      .then(json => {
        this.setState({ randomGames: json });
      });
  };
  handleRandomProjectCount = () => {
    if (window.innerWidth <= 1080 && !this.state.isMobile) {
      this.setState({ isMobile: true });
    }
    if (window.innerWidth > 1080 && this.state.isMobile) {
      this.setState({ isMobile: false });
    }
  };
  handleClose = () => {
    this.props.history.push(this.props.location.pathname);
    //뒷 페이지 스크롤 풀기
    const rootElement = document.documentElement;
    if (rootElement) rootElement.style.overflow = "initial";
  };

  handleLikeToggle = e => {
    e.preventDefault();
    if (this.props.userinfo.email) {
      const { isLiked, project } = this.state;
      request
        .updatePublishedLike({
          email: this.props.userinfo.email,
          pId: this.props.pId,
          ownerEmail: project.user.email
        })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            const likeCount = isLiked
              ? project.likeCount - 1
              : project.likeCount + 1;
            this.setState({
              isLiked: !isLiked,
              project: { ...project, likeCount: likeCount }
            });
          } else {
            showPopUp(
              <PopUp.OneButton
                title={this.props.intl.formatMessage({
                  id: "ID_POPUP_WARNING_REPEAT_CLICK_TITLE"
                })}
                buttonName={this.props.intl.formatMessage({
                  id: "ID_POPUP_WARNING_REPEAT_CLICK_BTN"
                })}
              />,
              { darkmode: true }
            );
          }
        })
        .catch(e => console.error(e));
    } else {
      showPopUp(<SignIn />, {
        darkmode: true,
        mobileFullscreen: true
      });
    }
  };

  handleSubscribe = creatorEmail => {
    if (this.lastLikeTime) {
      if (new Date().getTime() - this.lastLikeTime < 800) {
        this.lastLikeTime = new Date().getTime();
        showPopUp(
          <PopUp.OneButton
            title={this.props.intl.formatMessage({
              id: "ID_POPUP_WARNING_REPEAT_CLICK_TITLE"
            })}
            buttonName={this.props.intl.formatMessage({
              id: "ID_POPUP_WARNING_REPEAT_CLICK_BTN"
            })}
          />,
          { darkmode: true }
        );
        return;
      }
    }
    this.lastLikeTime = new Date().getTime();

    const { userinfo, intl } = this.props;
    const params = { creatorEmail, email: userinfo.email };
    if (!userinfo.email) {
      showPopUp(<SignIn />, {
        darkmode: true,
        mobileFullscreen: true
      });
      return;
    }
    if (!this.state.isSubscribed) {
      request
        .addSubscribe(params)
        .then(res => res.json())
        .then(json => {
          if (json) {
            this.setState({
              isSubscribed: true,
              subscribeCount: this.state.subscribeCount + 1
            });
          } else {
            showPopUp(
              <PopUp.OneButton
                title={intl.formatMessage({
                  id: "ID_POPUP_WARNING_REPEAT_CLICK_TITLE"
                })}
                buttonName={intl.formatMessage({
                  id: "ID_POPUP_WARNING_REPEAT_CLICK_BTN"
                })}
              />,
              { darkmode: true }
            );
          }
        });
    } else {
      request
        .removeSubscribe(params)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              isSubscribed: false,
              subscribeCount: this.state.subscribeCount - 1
            });
          } else {
            showPopUp(
              <PopUp.OneButton
                title={intl.formatMessage({
                  id: "ID_POPUP_WARNING_REPEAT_CLICK_TITLE"
                })}
                buttonName={intl.formatMessage({
                  id: "ID_POPUP_WARNING_REPEAT_CLICK_BTN"
                })}
              />,
              { darkmode: true }
            );
          }
        });
    }
  };

  moveToComment = () => {
    this.commentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  handleShareProject = (e) => {
    e.stopPropagation();
    this.setState({ isShareBoxOpen : !this.state.isShareBoxOpen });
  }

  handleShareKakao = (pId) => {
    window.Kakao.Link.sendCustom({
      templateId: 30669,
      templateArgs: { path: `detail/${pId}` },
      fail: function(error) {
        console.log(error);
        alert("Error while sharing.");
      },
      callback: () => {
        request.checkShareGame({type: "kakao"});
      }
    });
  };

  handleShareFB = (pId) => {
    const url = URL.WIZ_APP + pId;
    window.FB.ui(
      {
        method: "share",
        href: url,
        quote: url
      },
      function(response) {
        if (response && !response.error_message) {
          request.checkShareGame({type: "facebook"});
        } else {
          alert("Error while posting.");
        }
      }
    );
  };

  handleCopyUrl = (pId) => {
    const url = URL.WIZ_APP + pId;
    navigator.clipboard.writeText(url);
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  };

  handleEditProject = e => {
    const { project } = this.state;
    e.preventDefault();
    showPopUp(
      <Publish pId={project.pId} isDeveloping={false} isBuilder={false} buttonAction={this.setProject} />,
      {
        store,
        dismissOverlay: false,
        defaultPadding: false,
        scrollable: true
      }
    );
  };

  handleCopyProject = async e => {
    e.preventDefault();
    const { project } = this.state;
    const { type } = await this.getDevProject(project.pId);

    if (this.props.userinfo.email) {
      const params = {
        ...project,
        type,
        email: this.props.userinfo.email,
        pId: generatePID(this.props.userinfo.email),
        targetPID: project.pId
      };
      delete params["createdAt"];
      delete params["updatedAt"];

      try {
        await request.postDevelopingProject(params);
        let builderURL;
        switch (type) {
          case "js3d":
            builderURL = `/builder3d/${params.pId}`;
            break;
          default:
            builderURL = `/builder/${params.pId}`;
            break;
        }
        var newWindow = window.open(builderURL, "_blank");
        newWindow.focus();
      } catch (e) {
        console.error(e);
      }
    } else {
      const { formatMessage } = this.props.intl;
      showPopUp(
        <PopUp.OneButton
          title={formatMessage({ id: "ID_LOGIN_ALERT_TITLE" })}
          subtitle={formatMessage({ id: "ID_LOGIN_ALERT_MSG" })}
          buttonName={formatMessage({ id: "ID_LOGIN_ALERT_LOGINBTN" })}
          buttonAction={() => {
            showPopUp(<SignIn />, {
              darkmode: true,
              mobileFullscreen: true
            });
          }}
        />,
        { darkmode: true }
      );
    }
  };
  handleFold = () => {
    this.setState({ isDescFold: !this.state.isDescFold });
  };
  handleProjectCommentCount = count => {
    this.setState({ allCommentCount: count });
  };
  handleRandomGame = pId => {
    this.setState(
      {
        project: undefined,
        isLiked: undefined,
        creator: undefined,
        subscribeCount: undefined,
        isSubscribed: undefined,
        randomGames: [],
        isMobile: window.innerWidth <= 1080,
        isDescFold: undefined,
        allCommentCount: 0
      },
      () => {
        this.props.history.push(`?pId=${pId}`);
        this.setProject(pId);
      }
    );
  };
  handleReport = () => {
    if (this.props.userinfo.email) {
      showPopUp(
        <DreamReport
          targetType="game"
          targetContentId={this.state.project.pId}
          targetUserId={this.state.creator.id}
        />,
        {
          darkmode: true,
          mobileFullscreen: false,
          dismissButton: false
        }
      );
    } else {
      showPopUp(<SignIn />, {
        darkmode: true,
        mobileFullscreen: true
      });
    }
  };

  render() {
    const { pId, userinfo } = this.props;
    const {
      project,
      randomGames,
      isLiked,
      creator,
      isSubscribed,
      subscribeCount,
      isDescFold,
      isMobile,
      allCommentCount,
      isShareBoxOpen
    } = this.state;
    const {
      handleClose,
      handleLikeToggle,
      handleSubscribe,
      commentRef,
      moveToComment,
      handleReport,
      handleEditProject,
      handleShareProject,
      handleCopyProject,
      handleFold,
      handleProjectCommentCount,
      handleRandomGame,
      handleShareKakao,
      handleShareFB,
      handleCopyUrl
    } = this;
    if (!project) {
      return <div />;
    }
    return (
      <View
        project={project}
        randomGames={randomGames}
        handleLikeToggle={handleLikeToggle}
        handleShareProject={handleShareProject}
        handleEditProject={handleEditProject}
        handleCopyProject={handleCopyProject}
        isLiked={isLiked}
        isShareBoxOpen={isShareBoxOpen}
        creator={creator}
        isSubscribed={isSubscribed}
        subscribeCount={subscribeCount}
        handleSubscribe={handleSubscribe}
        commentRef={commentRef}
        moveToComment={moveToComment}
        pId={pId}
        userinfo={userinfo}
        handleClose={handleClose}
        isDescFold={isDescFold}
        handleFold={handleFold}
        isMobile={isMobile}
        handleProjectCommentCount={handleProjectCommentCount}
        allCommentCount={allCommentCount}
        handleRandomGame={handleRandomGame}
        handleReport={handleReport}
        handleShareKakao={handleShareKakao}
        handleShareFB={handleShareFB}
        handleCopyUrl={handleCopyUrl}
      />
    );
  }
}

export default connect(
  state => ({
    userinfo: state.userinfo
  }),
  {}
)(withRouter(injectIntl(Container)));
