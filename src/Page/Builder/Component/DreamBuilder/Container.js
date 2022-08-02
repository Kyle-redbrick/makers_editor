import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import generatePID from "../../../../Common/Util/PIDGenerator"
import { showPopUp } from "../../../../Common/Component/PopUp"
import * as request from "../../../../Common/Util/HTTPRequest";
import * as projectActions from "../../Store/Reducer/project";
import * as previewActions from "../../Store/Reducer/preview";
import * as dreamActions from "../../Store/Reducer/dream"
import AssetLibrary from "../../utils/assetLibrary";
import MissionClearPopUp from "./PopUp/MissionClear";
import ProjectClearPopUp from "./PopUp/ProjectClear";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldSlideRerender: false,
      isTutorialShow: false,
      isAstroBoyProject: false,
      it: "",
      stem: "",
      sdg: ""
    };
  }
  componentDidMount() {
    this.load();
  }
  load() {
    const { id: myDreamLectureProjectId ,email} = this.props.match.params;
    request
      .getMyDreamProject(myDreamLectureProjectId + "/" + email)
      .then(res => res.json())
      .then(myDreamProject => {
        if (!myDreamProject) {
          window.alert("no myDreamProject");
          return;
        }

        // temp: 테스트 계정의 프로젝트는 유저 인증 생략하기
        // if (myDreamProject.email !== "test@wizschool.io" && myDreamProject.email !== this.props.email) {
        //   window.alert("invalid user");
        //   return;
        // }
        // if(myDreamProject.email !== this.props.email) {
        //   window.alert("invalid user");
        //   return;
        // }

        try {
          myDreamProject.project.template = JSON.parse(myDreamProject.project.localized[0].template)
        } catch (err) {
          window.alert("wrong template");
          return;
        }

        this.props.setMyDreamProject(myDreamProject);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.myProject) {
      if (!prevProps.myProject || prevProps.myProject.id !== this.props.myProject.id) {
        this.didSetMyProject();
      }
    }
    if (prevProps.currentMission !== this.props.currentMission) {
      this.didSetCurrentMission();
    }
    if (prevProps.isConditionsClear !== this.props.isConditionsClear) {
      if (this.props.currentMission && this.props.isConditionsClear) {
        this.didClearConditions();
      }
    }
    if (prevProps.editorMode !== this.props.editorMode) {
      this.didShowTutorialPopup();
    }
  }
  didSetMyProject() {
    const { myProject } = this.props;

    const missions =
      (myProject.project.template.missions || [])
        .map((mission, index) => ({
          ...mission,
          isCompleted: index < myProject.completedMissionNum
        }))

    let currentMissionIndex = this.props.isReplaying ? 0 : myProject.completedMissionNum;
    if (currentMissionIndex > missions.length - 1) {
      currentMissionIndex = missions.length - 1
    }

    this.props.setDreamMissions(missions);
    this.props.setCurrentDreamMissionIndex(currentMissionIndex);
    this.save();
  }
  didSetCurrentMission() {
    if (!this.props.currentMission) return;

    if (this.missionSetTimer) {
      clearTimeout(this.missionSetTimer);
    }

    // TODO: Refer to the following issue.
    // Issue Link: https://www.notion.so/wizschool/b77303a59acc4be7886ec81875607bf6
    this.missionSetTimer = setTimeout(() => {
      try {
        const state = JSON.parse(this.props.currentMission.state);
        AssetLibrary.loadAssetsFromScene(state.scene, () => {
          this.props.setProject({ state });
          this.forceSlideRerender();
        });
      } catch (err) {
        window.alert("wrong mission state");
      }
    }, 200);
  }
  didClearConditions() {
    if (!this.props.currentMission.isCompleted || this.props.isReplaying) {
      this.props.completeCurrentDreamMission();

      if (this.props.currentMissionIndex < this.props.missions.length - 1) {
        this.didClearMission();
      } else {
        this.didClearProject();
      }
    }
  }
  didClearMission() {
    this.saveMissionClear();
    this.alertMissionClear();
  }
  didClearProject() {
    this.saveProjectClear();
    this.alertProjectClear();
  }

  saveMissionClear() {
    if (this.props.isReplaying) {
      return;
    }

    this.save({ completedMissionNum: this.props.currentMissionIndex + 1 });
  }
  saveProjectClear() {
    if (this.props.isReplaying) {
      return;
    }

    this.save({
      completedMissionNum: this.props.missions.length,
      completed: true
    });
  }
  save(values) {
    const { id: myDreamLectureProjectId } = this.props.match.params;
    request
      .saveAstroMission(myDreamLectureProjectId, values)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          console.log(this.props.intl.formatMessage({ id: "ID_DREAMBUILDER_SAVE_LECTURE" }));
        } else {
          console.warn(`${this.props.intl.formatMessage({ id: "ID_DREAMBUILDER_SAVE_LECTURE_ERROR" })}(${json.reason})`);
        }
      });
  }

  alertMissionClear() {
    if (!this.props.currentMission.conditions || this.props.currentMission.conditions.length < 1) return;
    setTimeout(() => {
      showPopUp(
        <MissionClearPopUp
          onClickConfirm={() => {
            this.props.setIsPlaying(false);
            this.props.setCurrentDreamMissionIndex(this.props.currentMissionIndex + 1);
          }}
        />, {
        dismissButton: false,
        defaultPadding: false
      }
      );
    }, 2000);
  }
  alertProjectClear() {
    request
      .getAstroMissionCompleteInfo(this.props.project.id)
      .then(res => res.json())
      .then(json => {
        console.log(111, json);
        this.setState({ it: json.it });
        this.setState({ stem: json.stem });
        this.setState({ sdg: json.sdg });
        this.setState({ certficate: json.certficate });

        // setTimeout(() => {
          showPopUp(
            <ProjectClearPopUp
              it={json.it}
              stem={json.stem}
              sdg={json.sdg}
              certificate={json.certificate}
              onClickConfirm={() => {
                window.opener=null;
                window.open('','_self');
                window.close();
              }}
            />,
            {
              dismissButton: false,
              defaultPadding: false
            }
          );
        }, 1000);
      // });
  }

  createDeveloping(callback) {
    const { id, project } = this.props.myProject;
    const params = {
      pId: generatePID(this.props.email),
      email: this.props.email,
      name: project.title,
      type: { javascript: "js", oobc: "wizlabOOBC" }[project.lecture.course.type],
      icon: project.localized && project.localized[0].thumbnailURL.toDreamclassS3URL() || "",
      useCustomIcon: true,
      state: JSON.stringify(this.getManipulatedProjectState()),
      myDreamProjectId: id
    }
    request
      .postDevelopingProject(params)
      .then(res => res.json())
      .then(developing => {
        if (callback) {
          callback(developing);
        }
      })
  }
  getManipulatedProjectState() {
    const state = JSON.parse(JSON.stringify(this.props.projectState));
    state.preview.isPlaying = false;
    for (let sceneId in state.scene.scenes) {
      const scene = state.scene.scenes[sceneId];
      scene.isHiddenLockSprites = false;
      for (let spriteId in scene.sprites) {
        const sprite = scene.sprites[spriteId];
        sprite.locked = false;
      }
    }
    return state;
  }
  linkToDeveloping = developing => {
    this.props.history.replace(`/builder/${developing.pId}`);
    this.props.history.go(0);
  }

  forceSlideRerender = () => {
    this.setState({ shouldSlideRerender: true }, () => {
      this.setState({ shouldSlideRerender: false });
    });
  }

  didShowTutorialPopup = async () => {
    // temp : astro boy 동영상을 보여주기 위한 임시조치
    const title =
      this.props.project
      && this.props.project.localized[0]
      && this.props.project.localized[0].title
    if (title === "Catch the Super Magnet") {
      return this.setState({ isAstroBoyProject: true });
    }

    const didShowTutorialPopup = localStorage.getItem(`didShowTutorial_${this.props.editorMode}`);
    if (didShowTutorialPopup) this.setState({ isTutorialShow: false });
    else this.setState({ isTutorialShow: true });
  }

  hiddenTutorial = () => {
    this.setState({ isTutorialShow: false });
  }

  showTutorial = () => {
    this.setState({ isTutorialShow: true });
  }

  hiddenAstroBoyPopup = () => {
    this.setState({ isAstroBoyProject: false });
  }

  render() {
    return (
      <View
        {...this.props}
        shouldSlideRerender={this.state.shouldSlideRerender}
        isTutorialShow={this.state.isTutorialShow}
        isAstroBoyProject={this.state.isAstroBoyProject}
        hiddenTutorial={this.hiddenTutorial}
        showTutorial={this.showTutorial}
        hiddenAstroBoyPopup={this.hiddenAstroBoyPopup}
      />
    );
  }
}

export default connect(
  state => ({
    project: state.dream.myProject && state.dream.myProject.project,
    editorMode: state.scene.editorMode,
    email: state.userinfo.email,
    myProject: state.dream.myProject,
    isReplaying: state.dream.isReplaying,
    missions: state.dream.missions,
    currentMission: state.dream.currentMission,
    currentMissionIndex: state.dream.currentMissionIndex,
    isConditionsClear: state.dream.isConditionsClear,
    isCodeConditionsClear: state.dream.isCodeConditionsClear,
    projectState: {
      scene: state.scene,
      interaction: state.interaction,
      preview: state.preview
    }
  }),
  {
    setProject: projectActions.setProject,
    setIsPlaying: previewActions.setIsPlaying,
    setMyDreamProject: dreamActions.setMyDreamProject,
    setDreamMissions: dreamActions.setDreamMissions,
    setCurrentDreamMissionIndex: dreamActions.setCurrentDreamMissionIndex,
    completeCurrentDreamMission: dreamActions.completeCurrentDreamMission
  }
)(withRouter(injectIntl(Container)));
