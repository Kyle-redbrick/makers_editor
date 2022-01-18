import React, { Component } from "react";
import { connect } from "react-redux";
import ReactToolTip from "react-tooltip";
import { injectIntl } from "react-intl";
import * as request from "../../Util/HTTPRequest";
import * as projectActions from "../../../Page/Builder/Store/Reducer/project";
import * as webrtcActions from "../../../Page/Builder/Store/Reducer/webrtc";
import generateGamePage from "../../../Page/Builder/utils/gamePageGenerator";
import { getColorTheme } from "../../../Page/Builder/utils/colorThemeUtil";
import { generatePIDForTutorial } from "../../Util/PIDGenerator";
import { ImageCompressor } from "../../Util/FileCompressor";
import stringify from "json-stringify-safe";
import PopUp, { showPopUp } from "../PopUp";
import View from "./View";
import "./index.scss";

// import { showBingoPopup } from "../PopUp/BingoPopup";
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      icon: "",
      iconUpdated: false,
      isCopyAllowed: undefined,
      tags: [],
      popularTags: [],
      challengeEventAttend: false,
      nameValidation: true,
      descriptionValidation: true
    };
    if (this.props.isBuilder) {
      require("./index_builder.scss");
    }
  }
  componentDidMount = async () => {
    const pId = this.getPID();
    request
      .getPublishedProject({ pId })
      .then(res => res.json())
      .then(json => {
        if (json) {
          const { name, description, category, icon, isCopyAllowed } = json;
          let tag = json.tag.map(item => {
            return item.gameTag.name;
          });
          this.setState({
            name,
            description,
            category,
            icon,
            isCopyAllowed,
            tags: tag
          });
          if (this.props.isDeveloping) {
            this.props.setScreenshotURL(icon, this.props.project.useCustomIcon);
          }
        } else {
          this.setState({ isCopyAllowed: true });
        }
      })
      .catch(e => console.error(e));

    request
      .getPopularTag()
      .then(res => res.json())
      .then(json => {
        let popular = json.map(item => {
          return item.name;
        });
        this.setState({ popularTags: popular.slice(0, 5) });
      });

    request
      .checkAttendEventChallenge({ pId })
      .then(res => res.json())
      .then(json => {
        if (json) this.setState({ challengeEventAttend: true });
      });
    /*for css */
    const popup = document
      .querySelector(".publishpopup")
      .closest(".popup_contents");
    const dismissBtn = popup.querySelector("#popup_dismissbtn");
    dismissBtn.style.display = "none";
  };
  handleCheckValidation = target => {
    const stateName = `${target.name}Validation`;
    this.setState({ [stateName]: target.value ? true : false });
  };
  handleInputChange = e => {
    const target = e.target;
    this.setState({ [target.name]: target.value });
    if (target.name !== "tag") {
      this.handleCheckValidation(target);
    }
  };
  handleIsCopyAllowedChange = e => {
    this.setState(state => ({
      isCopyAllowed: !state.isCopyAllowed
    }));
  };
  handleImgClick = () => {
    document.getElementById("PublishForm__icon__input").click();
  };
  handleAddClick = () => {
    document.getElementById("PublishForm__icon__input").click();
  };
  handleSubmit = async e => {
    e.preventDefault();
    const {
      name,
      description,
      isCopyAllowed,
      category = "Game",
      tags,
      challengeEventAttend
    } = this.state;

    // input validation
    if (!name) {
      this.setState({ nameValidation: false });
      return;
    } else if (!description) {
      this.setState({ descriptionValidation: false });
      return;
    }

    const pId = this.getPID();
    let icon = this.getIcon();

    // create tutorial developingProject
    const { email, tutorialLevel } = this.props;
    if (tutorialLevel) {
      icon = this.props.project.screenshotURL;
      const name = this.props.intl.formatMessage({ id: "ID_PUBLISH_TUTORIAL" });
      const state = stringify({
        scene: this.props.scene,
        preview: this.props.preview,
        interaction: this.props.interaction
      });
      const useCustomIcon = this.props.project.useCustomIcon;
      await request.postDevelopingProject({
        pId,
        icon,
        email,
        name,
        state,
        useCustomIcon
      });
    }

    // update custom icon
    if (!this.props.isDeveloping & this.state.iconUpdated) {
      await request.postDevelopingProject({
        pId,
        icon,
        useCustomIcon: true
      });
    }

    // create/update publishedProject
    let params = {
      pId,
      email,
      icon,
      name,
      description,
      category,
      isCopyAllowed,
      tags,
      live: true
    };
    if (this.props.organization) {
      params.isSsafy = this.props.organization.toLowerCase() === "ssafy";
    }
    if (this.props.organization) {
      params.isJJ = this.props.organization.includes("전주");
    }

    let publishedURL = undefined;
    if (this.props.scene) {
      const state = {
        editorMode: this.props.scene.editorMode,
        scene: {
          scenes: this.props.scene.scenes,
          sceneIds: this.props.scene.sceneIds,
          soundIds: this.props.scene.soundIds
        },
        preview: {
          screenMode: this.props.preview.screenMode
        }
      };
      const gameMeta = { pId, gameTitle: name };
      const doc = await generateGamePage(state, gameMeta);
      let url = await request.uploadPublished({ doc });
      url = await url.json();
      url = url.url;
      publishedURL = url;
    }
    if (publishedURL) {
      params["url"] = publishedURL;
      params["copyStateFromDev"] = true;
    }

    try {
      request
        .postPublishedProject(params)
        .then(res => res.json())
        .then(json => {
          this.handleCloseBtn();
          if (this.props.publishProject) {
            this.props.publishProject();
          }
          if (this.props.publishCallback) {
            this.props.publishCallback({
              pId,
              icon,
              name,
              description,
              category,
              isCopyAllowed
            });
          }
          showPopUp(
            <PopUp.OneButton
              title={this.props.intl.formatMessage({
                id: "ID_BUILDER_ALERT_MSG_SUCC"
              })}
              buttonName={this.props.intl.formatMessage({
                id: "ID_BUILDER_ALERT_CONFIRMBTN"
              })}
              buttonAction={this.props.buttonAction}
            />,
            {
              dismissButton: false,
              darkmode: getColorTheme() === "darkMode"
            }
          );

          // /** event request */
          if (challengeEventAttend) {
            request.addChallenge({ pId });
            showPopUp(
              <PopUp.OneButton
                title={this.props.intl.formatMessage({
                  id: "ID_BUILDER_CONFIRM_INFO"
                })}
                buttonName={this.props.intl.formatMessage({
                  id: "ID_BUILDER_ALERT_CONFIRMBTN"
                })}
              />,
              {
                dismissButton: false,
                darkmode: getColorTheme() === "darkMode"
              }
            );
          }
          // if (json.bingoType) {
          //   showBingoPopup(email, json.bingoType);
          // }
        });
    } catch (e) {
      console.error(e);
      showPopUp(
        <PopUp.OneButton
          title={this.props.intl.formatMessage({
            id: "ID_BUILDER_ALERT_MSG_RETRY"
          })}
          buttonName="확인"
        />,
        {
          dismissButton: false,
          darkmode: getColorTheme() === "darkMode"
        }
      );
    }
  };
  handleCloseBtn = () => {
    // 퍼블리싱 팝업 종료
    this.props.setLog({ publish: false });
    this.props.dismiss();
  };
  handleFileInput = async e => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const data = new FormData();
    let compressed = await ImageCompressor(selectedFile);
    data.append("file", compressed);
    const { isDeveloping } = this.props;
    if (isDeveloping) {
      try {
        const response = await request.upload(data);
        const json = await response.json();
        const icon = json.url;
        const { pId } = this.props.project;
        const params = { pId, icon, useCustomIcon: true };
        request.updateDevelopingProject(params);
        this.props.setScreenshotURL(icon, true);
      } catch (e) {
        console.error(e);
      }
    } else {
      const response = await request.upload(data);
      const json = await response.json();
      const icon = json.url;
      this.setState({ icon, iconUpdated: true });
    }
  };
  handleFileDelete = () => {
    const { isDeveloping } = this.props;
    if (isDeveloping) {
      document.getElementById("PublishForm__icon__input").value = "";
      this.props.setScreenshotURL(null, false);
    }
  };

  getIcon = () => {
    const { isDeveloping } = this.props;
    if (isDeveloping) {
      return this.props.project.screenshotURL;
    } else {
      return this.state.icon;
    }
  };
  getPID = () => {
    const { email, isDeveloping, tutorialLevel } = this.props;
    if (isDeveloping) {
      if (tutorialLevel) {
        return generatePIDForTutorial(email, tutorialLevel);
      } else {
        return this.props.project.pId;
      }
    } else {
      return this.props.pId;
    }
  };

  onAddTag = tag => {
    const { tags } = this.state;
    if (tags.indexOf(tag) < 0 && tags.length <= 10) {
      if (tag.length > 10) {
        tag = tag.substring(0, 10);
      }
      this.setState({ tags: [].concat(tags, tag) });
    }
  };
  onDeleteTag = index => {
    const tags = [...this.state.tags];
    tags.splice(index, 1);
    this.setState({ tags });
  };

  handleChallengeEvent = e => {
    this.setState({ challengeEventAttend: e.target.checked });
    if (e.target.checked) this.onAddTag("챌린지");
  };
  render() {
    const {
      name,
      description,
      isCopyAllowed,
      tags,
      popularTags,
      challengeEventAttend,
      nameValidation,
      descriptionValidation
    } = this.state;
    const icon = this.getIcon();
    const { isDeveloping, isTutorial, project } = this.props;
    return (
      <div>
        <View
          name={name}
          description={description}
          isCopyAllowed={isCopyAllowed}
          icon={icon}
          tags={tags}
          isDeveloping={isDeveloping}
          isTutorial={isTutorial}
          useCustomIcon={project ? project.useCustomIcon : false}
          handleInputChange={this.handleInputChange}
          handleIsCopyAllowedChange={this.handleIsCopyAllowedChange}
          handleImgClick={this.handleImgClick}
          handleAddClick={this.handleAddClick}
          handleSubmit={this.handleSubmit}
          handleCloseBtn={this.handleCloseBtn}
          handleFileInput={this.handleFileInput}
          handleFileDelete={this.handleFileDelete}
          onDeleteTag={this.onDeleteTag}
          onAddTag={this.onAddTag}
          popularTags={popularTags}
          handleChallengeEvent={this.handleChallengeEvent}
          challengeEventAttend={challengeEventAttend}
          nameValidation={nameValidation}
          descriptionValidation={descriptionValidation}
        />

        <ReactToolTip multiline={true} className="publish__tooltip" />
      </div>
    );
  }
}

export default connect(
  state => ({
    email: state.userinfo.email,
    organization: state.userinfo.organization,
    project: state.project,
    scene: state.scene,
    preview: state.preview,
    interaction: state.interaction
  }),
  {
    setScreenshotURL: projectActions.setScreenshotURL,
    publishProject: projectActions.publishProject,
    setLog: webrtcActions.setLog
  }
)(injectIntl(Container));
