import React, { useCallback, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as dreamActions from "../../../Store/Reducer/dream"
import Slide from "../../../../../Common/Component/DreamSlide"
import "./index.scss"

function Mission(props) {
  const slideRef = useRef();
  const title = props.mission && props.mission.title;
  const slide = props.mission && props.mission.slide;
  const number = props.missionIndex + 1;
  const total = props.missions.length;

  const isPrevEnabled = props.missionIndex > 0;
  const isNextEnabled = props.missionIndex < props.missions.length - 1;

  useEffect(() => {
    slideRef.current.scrollIntoView({block: "start"})
  }, [props.missionIndex])

  const onClickPrev = useCallback(
    e => {
      if(isPrevEnabled) {
        props.setCurrentDreamMissionIndex(props.missionIndex - 1);
      }
    },
    [props.missionIndex, isPrevEnabled]
  )
  const onClickNext = useCallback(
    e => {
      if(!isNextEnabled) {
        return;
      }
    if(!props.mission.isCompleted) {
      const confirm = window.confirm(props.intl.formatMessage({ id: "ID_DREAM_BUILDER_MISSION_NOT_COMPLETE" }));
      if(!confirm) {
        return;
      }
    } else {
      props.setCurrentDreamMissionIndex(props.missionIndex + 1);
    }
  },
    [props.mission, props.missionIndex, isNextEnabled]
  )

  return (
    <div className="dream_mission">
      <div className="dream_mission-header">
        <button className="menu-list-btn" onClick={props.openDreamMenu} />
        <p className="dream_mission-title">{title}</p>
      </div>
      <div className="dream_mission-body">
        <Slide markdown={slide} shouldRerender={props.shouldSlideRerender} slideRef={slideRef}/>
      </div>
      <div className="dream_mission-footer">
        <button 
          className={`slide-prev-btn ${isPrevEnabled ? "on" : "off"}`}
          onClick={onClickPrev}
        >
          <span className="icon"/>
        </button>
        <span className="dream_mission-current">
          {number} / {total}
        </span>
        <button 
          className={`slide-next-btn ${isNextEnabled ? "on" : "off"}`}
          onClick={onClickNext}
        >
          <span className="icon"/>
        </button>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    missions: state.dream.missions,
    mission: state.dream.currentMission,
    missionIndex: state.dream.currentMissionIndex
  }),
  {
    openDreamMenu: dreamActions.openDreamMenu,
    setCurrentDreamMissionIndex: dreamActions.setCurrentDreamMissionIndex
  }
)(injectIntl(Mission));
