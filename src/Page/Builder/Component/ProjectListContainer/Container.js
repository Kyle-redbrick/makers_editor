import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import * as modalActions from "../../Store/Reducer/modal"
import * as popupAction from "../../../../Common/Store/Reducer/Popup"
import * as projectActions from "../../Store/Reducer/project"
import * as videoActions from "../../Store/Reducer/video"
import { injectIntl } from "react-intl"
import View from "./View"
import onClickOutside from "react-onclickoutside"
import * as request from "../../../../Common/Util/HTTPRequest"
import AssetLibrary from "../../utils/assetLibrary"
import { showTwoBtnAlert } from "../../../../Common/Util/AlertManager"

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemArray: [],
      selectedProject: undefined,
    }
  }
  componentDidMount = async () => {
    try {
      const res = await request.getProjectListForTutor()
      const json = await res.json()
      const itemArray = json.filter(({ curriculumId }) => curriculumId === 1)
      const freeTrialArray = json.filter(
        ({ curriculumId, id }) => curriculumId === 2 && (id === 53 || id === 54)
      )

      // 12/14 이후 삭제
      // 연습용으로 직접 추가 (신규 1 ,2 단계)
      // const _newPracticeTemplate = [
      //   { id: 101, title: "(신) 1-1 큐브를 찾으러 가는 길" },
      //   { id: 102, title: "(신) 1-2 미로를 탈출하는 방법" },
      //   { id: 103, title: "(신) 1-3 여정을 가로막는 수수께끼" },
      //   { id: 104, title: "(신) 1-4 금빛 큐브는 어디에? " },
      //   { id: 201, title: "(신) 2-1 차원문을 향해서" },
      //   { id: 202, title: "(신) 2-2 발판을 소환하라" },
      //   { id: 203, title: "(신) 2-3 계속해서 위를 향해" },
      //   { id: 204, title: "(신) 2-4 관문을 지키는 몬스터" },
      // ]

      this.setState({
        itemArray: [...freeTrialArray, ...itemArray],
      })
    } catch (err) {
      console.error(err)
    }
  }
  handleCloseBtn = (e) => {
    e.preventDefault()
    this.props.setIsAppModalOn(false, null)
  }
  handleProjectItem = (projectId) => {
    this.setState((state) => ({
      selectedProject: state.selectedProject !== projectId ? projectId : undefined,
    }))
  }
  handleLoadprojectBtn = (e) => {
    e.preventDefault()
    showTwoBtnAlert(
      `ID_BUILDER_PROJECTLIST_CONFIRM`,
      `ID_BUILDER_PROJECTLIST_OK`,
      `ID_BUILDER_PROJECTLIST_CANCEL`,
      (e) => {
        request
          .getProjectLoadForTutor({ id: this.state.selectedProject })
          .then((res) => res.json())
          .then((json) => {
            if (json) {
              const project = {}

              // 신규 WJ 1,2 단계 연습용 id는 100 이상이다.
              if (this.state.selectedProject < 100) {
                project.state = JSON.parse(json.state)
              } else {
                project.state = JSON.parse(json).state
              }

              // 기존 방식
              // project.state = JSON.parse(json.state);
              AssetLibrary.loadAssetsFromScene(project.state.scene, () => {
                this.props.setTemplate(project)
              })

              /* 가이드 비디오 셋팅 */
              this.props.setVideoURL(
                this.state.selectedProject < 100 ? json.guideVideo : JSON.parse(json).guideVideo
              )

              // 기존 방식
              // this.props.setVideoURL(json.guideVideo)
              this.props.handleSelectTab("video")

              /**
               *  12/14 이후 원복 코드
               */
              //  project.state = JSON.parse(json.state);
              // AssetLibrary.loadAssetsFromScene(project.state.scene, () => {
              //   this.props.setTemplate(project);
              // });

              // /* 가이드 비디오 셋팅 */
              // this.props.setVideoURL(json.guideVideo);
              // this.props.handleSelectTab("video");
              /**
               *  12/14 이후 원복 코드
               */

              // const isWizlive = this.props.location.pathname.startsWith(
              //   "/wizlive"
              // );
              // if (json.guideVideo && !isWizlive) {
              //   this.props.setVideoURL(json.guideVideo);
              //   this.props.handleSelectTab("video");
              // } else {
              //   this.props.setVideoURL(DEFAULT_VIDEO_URL);
              // }
            }
            this.props.setIsAppModalOn(false, null)
          })
          .catch((e) => console.error(e))
      },
      true
    )
  }
  render() {
    const { handleCloseBtn, handleLoadprojectBtn, handleProjectItem } = this
    const { itemArray, selectedProject } = this.state

    return (
      <View
        handleCloseBtn={handleCloseBtn}
        itemArray={itemArray}
        handleLoadprojectBtn={handleLoadprojectBtn}
        handleProjectItem={handleProjectItem}
        selectedProject={selectedProject}
      />
    )
  }
}

export default connect(
  (state) => ({
    project: state.project,
    isAppModalOn: state.modal.isAppModalOn,
    videoURL: state.video.videoURL,
  }),
  {
    setIsAppModalOn: modalActions.setIsAppModalOn,
    setMainPopup: popupAction.setMainPopup,
    setVideoURL: videoActions.setVideoURL,
    setTemplate: projectActions.setTemplate,
  }
)(withRouter(injectIntl(onClickOutside(Container))))
