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
import jwt_decode from "jwt-decode";
import View from "./View";
import "./index.scss";

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
      descriptionValidation: true,
    };
    if (this.props.isBuilder) {
      require("./index_builder.scss");
    }
  }
  componentDidMount = async () => {
    // const pId = this.getPID();
    // request
    //   .getPublishedProject({ pId })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json) {
    //       const { name, description, category, icon, isCopyAllowed } = json;
    //       let tag = json.tag.map((item) => {
    //         return item.gameTag.name;
    //       });
    //       this.setState({
    //         name,
    //         description,
    //         category,
    //         icon,
    //         isCopyAllowed,
    //         tags: tag,
    //       });
    //       if (this.props.isDeveloping) {
    //         this.props.setScreenshotURL(icon, this.props.project.useCustomIcon);
    //       }
    //     } else {
    //       this.setState({ isCopyAllowed: true });
    //     }
    //   })
    //   .catch((e) => console.error(e));

    // request
    //   .getPopularTag()
    //   .then((res) => res.json())
    //   .then((json) => {
    //     let popular = json.map((item) => {
    //       return item.name;
    //     });
    //     this.setState({ popularTags: popular.slice(0, 5) });
    //   });

    // request
    //   .checkAttendEventChallenge({ pId })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json) this.setState({ challengeEventAttend: true });
    //   });
    /*for css */
    const popup = document
      .querySelector(".publishpopup")
      .closest(".popup_contents");
    const dismissBtn = popup.querySelector("#popup_dismissbtn");
    dismissBtn.style.display = "none";
  };
  handleCheckValidation = (target) => {
    const stateName = `${target.name}Validation`;
    this.setState({ [stateName]: target.value ? true : false });
  };
  handleInputChange = (e) => {
    const target = e.target;
    this.setState({ [target.name]: target.value });
    if (target.name !== "tag") {
      this.handleCheckValidation(target);
    }
  };
  handleIsCopyAllowedChange = (e) => {
    this.setState((state) => ({
      isCopyAllowed: !state.isCopyAllowed,
    }));
  };
  handleImgClick = () => {
    document.getElementById("PublishForm__icon__input").click();
  };
  handleAddClick = () => {
    document.getElementById("PublishForm__icon__input").click();
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      description,
      isCopyAllowed,
      category = "Game",
      tags,
      challengeEventAttend,
    } = this.state;

    // input validation
    // if (!name) {
    //   this.setState({ nameValidation: false });
    //   return;
    // } else if (!description) {
    //   this.setState({ descriptionValidation: false });
    //   return;
    // }

    // let icon = this.getIcon();

    // // update custom icon
    // if (!this.props.isDeveloping & this.state.iconUpdated) {
    //   await request.postDevelopingProject({
    //     pId,
    //     icon,
    //     useCustomIcon: true,
    //   });
    // }
    const pId = window.location.pathname.split("/")[2];
    let state;
    if (this.props.scene) {
      state = {
        interaction: this.props.interaction,
        scene: {
          editorMode: this.props.scene.editorMode,
          scenes: this.props.scene.scenes,
          sceneIds: this.props.scene.sceneIds,
          soundIds: this.props.scene.soundIds,
          timeStamp: this.props.scene.timeStamp,
        },
        preview: this.props.preview,
      };
    }
    let params;
    if (name && this.state.icon) {
      params = {
        title: name,
        state: state,
        isVisible: isCopyAllowed,
        icon: this.state.icon,
      };
    } else if (name) {
      params = {
        title: name,
        state: state,
        isVisible: isCopyAllowed,
      };
    } else if (this.state.icon) {
      params = {
        state: state,
        isVisible: isCopyAllowed,
        icon: this.state.icon,
      };
    } else {
      params = {
        state: state,
        isVisible: isCopyAllowed,
      };
    }
    if (description) {
      params.description = description;
    }
    try {
      request
        .updateSaasProject({ params, pId })
        .then((res) => res.json())
        .then((json) => console.log("json", json));
    } catch (e) {
      console.error(e);
    }
    // // create/update publishedProject
    // let params = {
    //   pId,
    //   email: emailData,
    //   icon,
    //   name,
    //   description,
    //   category,
    //   isCopyAllowed,
    //   tags,
    //   live: true,
    // };
    // if (this.props.organization) {
    //   params.isSsafy = this.props.organization.toLowerCase() === "ssafy";
    // }
    // if (this.props.organization) {
    //   params.isJJ = this.props.organization.includes("전주");
    // }

    // let publishedURL = undefined;
    // if (this.props.scene) {
    //   const state = {
    //     editorMode: this.props.scene.editorMode,
    //     scene: {
    //       scenes: this.props.scene.scenes,
    //       sceneIds: this.props.scene.sceneIds,
    //       soundIds: this.props.scene.soundIds,
    //     },
    //     preview: {
    //       screenMode: this.props.preview.screenMode,
    //     },
    //   };
    //   const gameMeta = { pId, gameTitle: name };
    //   const doc = await generateGamePage(
    //     state,
    //     gameMeta,
    //     null,
    //     this.props.intl
    //   );
    //   let url = await request.uploadPublished({ doc });
    //   url = await url.json();
    //   url = url.url;
    //   publishedURL = url;
    // }
    // if (publishedURL) {
    //   params["url"] = publishedURL;
    //   params["copyStateFromDev"] = true;
    // }

    if (isCopyAllowed) {
      showPopUp(
        <PopUp.OneButton
          title={this.props.intl.formatMessage({
            id: "ID_BUILDER_ALERT_MSG_SUCC",
          })}
          buttonName={this.props.intl.formatMessage({
            id: "ID_BUILDER_ALERT_CONFIRMBTN",
          })}
          buttonAction={this.props.buttonAction}
        />,
        {
          dismissButton: false,
          darkmode: getColorTheme() === "darkMode",
        }
      );
    } else {
      showPopUp(
        <PopUp.OneButton
          title={this.props.intl.formatMessage({
            id: "ID_BUILDER_ALERT_MSG_SUCC_SAVE",
          })}
          buttonName={this.props.intl.formatMessage({
            id: "ID_BUILDER_ALERT_CONFIRMBTN",
          })}
          buttonAction={this.props.buttonAction}
        />,
        {
          dismissButton: false,
          darkmode: getColorTheme() === "darkMode",
        }
      );
    }

    // try {
    //   request
    //     .postPublishedProject(params)
    //     .then((res) => res.json())
    //     .then((json) => {
    //       this.handleCloseBtn();
    //       if (this.props.publishProject) {
    //         this.props.publishProject();
    //       }
    //       if (this.props.publishCallback) {
    //         this.props.publishCallback({
    //           pId,
    //           icon,
    //           email: emailData,
    //           name,
    //           description,
    //           category,
    //           isCopyAllowed,
    //         });
    //       }
    //       showPopUp(
    //         <PopUp.OneButton
    //           title={this.props.intl.formatMessage({
    //             id: "ID_BUILDER_ALERT_MSG_SUCC",
    //           })}
    //           buttonName={this.props.intl.formatMessage({
    //             id: "ID_BUILDER_ALERT_CONFIRMBTN",
    //           })}
    //           buttonAction={this.props.buttonAction}
    //         />,
    //         {
    //           dismissButton: false,
    //           darkmode: getColorTheme() === "darkMode",
    //         }
    //       );

    //       // /** event request */
    //       if (challengeEventAttend) {
    //         request.addChallenge({ pId });
    //         showPopUp(
    //           <PopUp.OneButton
    //             title={this.props.intl.formatMessage({
    //               id: "ID_BUILDER_CONFIRM_INFO",
    //             })}
    //             buttonName={this.props.intl.formatMessage({
    //               id: "ID_BUILDER_ALERT_CONFIRMBTN",
    //             })}
    //           />,
    //           {
    //             dismissButton: false,
    //             darkmode: getColorTheme() === "darkMode",
    //           }
    //         );
    //       }
    //     });
    // } catch (e) {
    //   console.error(e);
    //   showPopUp(
    //     <PopUp.OneButton
    //       title={this.props.intl.formatMessage({
    //         id: "ID_BUILDER_ALERT_MSG_RETRY",
    //       })}
    //       buttonName="확인"
    //     />,
    //     {
    //       dismissButton: false,
    //       darkmode: getColorTheme() === "darkMode",
    //     }
    //   );
    // }
  };
  handleCloseBtn = () => {
    // 퍼블리싱 팝업 종료
    this.props.setLog({ publish: false });
    this.props.dismiss();
  };

  // const uploadFile = async (selectedFile, lectureName) => {
  //   try {
  //     const uploadResponse = await request.thumbnailUpload(lectureName);
  //     const uploadData = await uploadResponse.json();
  //     const putUrl = uploadData.data.uploadUrl;
  //     const downloadUrl = uploadData.data.downloadUrl;

  //     const putResponse = await fetch(putUrl, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "image/jpeg",
  //       },
  //       body: selectedFile,
  //     });

  //     console.log("PUT response", putResponse);

  //     return downloadUrl;
  //   } catch (error) {
  //     console.error("파일 업로드 실패:", error);
  //   }
  // };
  // 게임 썸네일 등록하기 (수정)
  handleFileInput = async (e) => {
    console.log("pId", window.location.pathname.split("/")[2]);
    const selectedFile = e.target.files[0];
    console.log("file =>", selectedFile);

    if (!selectedFile) return;

    try {
      const uploadResponse = await request.projectIconUpload(
        window.location.pathname.split("/")[2]
      );
      const uploadData = await uploadResponse.json();
      const temporaryPutUrl = uploadData.data.uploadUrl;
      const putUrl = temporaryPutUrl.slice(0, 4) + temporaryPutUrl.slice(5);
      const temporaryDownloadUrl = uploadData.data.downloadUrl;
      const putResponse = await fetch(putUrl, {
        method: "PUT",
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "image/jpeg",
        },
        body: selectedFile,
      });

      const downloadUrl =
        "http://redbrick-makers.oss-ap-northeast-2.aliyuncs.com/" +
        temporaryDownloadUrl;

      console.log("putResponse", putResponse);
      this.setState({ icon: downloadUrl });
    } catch (error) {
      console.error("파일 업로드 실패 : ", error);
    }

    // const { isDeveloping } = this.props;
    // console.log("isDeveloping", this.props.isDeveloping);
    // if (isDeveloping) {
    //   try {
    //     const response = await request.upload(data);
    //     const json = await response.json();
    //     const icon = json.url;
    //     // const { pId } = this.props.project;
    //     // const params = { pId, icon, useCustomIcon: true };
    //     // request.updateDevelopingProject(params);
    //     this.props.setScreenshotURL(icon, true);
    //   } catch (e) {
    //     console.log("에러다 ㅜㅜ");
    //     console.error(e);
    //   }
    // } else {
    //   const response = await request.upload(data);
    //   const json = await response.json();
    //   const icon = json.url;
    //   this.setState({ icon, iconUpdated: true });
    // }
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

  onAddTag = (tag) => {
    const { tags } = this.state;
    if (tags.indexOf(tag) < 0 && tags.length <= 10) {
      if (tag.length > 10) {
        tag = tag.substring(0, 10);
      }
      this.setState({ tags: [].concat(tags, tag) });
    }
  };
  onDeleteTag = (index) => {
    const tags = [...this.state.tags];
    tags.splice(index, 1);
    this.setState({ tags });
  };

  handleChallengeEvent = (e) => {
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
      descriptionValidation,
    } = this.state;
    const icon = this.state.icon;
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
  (state) => ({
    email: state.userinfo.email,
    organization: state.userinfo.organization,
    project: state.project,
    scene: state.scene,
    preview: state.preview,
    interaction: state.interaction,
  }),
  {
    setScreenshotURL: projectActions.setScreenshotURL,
    publishProject: projectActions.publishProject,
    setLog: webrtcActions.setLog,
  }
)(injectIntl(Container));
