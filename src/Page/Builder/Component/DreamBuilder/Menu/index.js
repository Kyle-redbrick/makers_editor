import React, { useCallback } from "react";
import { connect } from "react-redux"
import { injectIntl } from "react-intl";
import * as dreamActions from "../../../Store/Reducer/dream"
import PopUp, { showPopUp } from "../../../../../Common/Component/PopUp";
import "./index.scss"

function Menu(props) {
  const title =
    props.project
    && props.project.localized[0]
    && props.project.localized[0].title
  const missions = props.missions || [];

  const onClickClose = useCallback(e => {
    showPopUp(
      <PopUp.TwoButton 
        title={props.intl.formatMessage({ id: "ID_DREAM_BUILDER_MENU_CLOSE_TITLE" })}
        confirmButtonName={props.intl.formatMessage({ id: "ID_DREAM_BUILDER_MENU_CLOSE_CONFIRM_BUTTON" })}
        cancelButtonName={props.intl.formatMessage({ id: "ID_DREAM_BUILDER_MENU_CLOSE_CANCEL_BUTTON" })}
        cancelAction={window.close}
      />
    );
  }, []);

  return (
    <div className={`dream_menu dream_menu-${props.isOpen ? "open" : "close"}`}>
      <div className="dream_mission-menu-header">
        <button className="slide-home-btn" onClick={onClickClose} />
        <button className="slide-close-btn" onClick={props.closeDreamMenu} />
      </div>
      <div className="dream_mission-list-wrapper">
        <p className="dream_mission-list-title">{title}</p>
        <ol className="dream_mission-list">
          {missions.map(
            (mission, index) => {
              const classes = [];
              
              if(mission === props.currentMission) {
                classes.push("selected");
              }
              
              if(mission.isCompleted) {
                classes.push("completed");
              }
              
              const isDisabled = missions[index - 1] && !missions[index - 1].isCompleted;
              if(isDisabled) {
                classes.push("disabled");
              }
              
              return (
                <li 
                  key={index}
                  className={classes.join(" ")}
                  onClick={()=> {
                    if(isDisabled) {
                      return;
                    }
                    props.setCurrentDreamMissionIndex(index);
                    props.closeDreamMenu();
                  }}
                >
                  {mission.title}
                </li>
              );
            }
          )}
        </ol>
      </div>
    </div>
  );
}

export default connect(
  state => ({ 
    isOpen: state.dream.isMenuOpen,
    project: state.dream.myProject && state.dream.myProject.project,
    missions: state.dream.missions,
    currentMission: state.dream.currentMission,
  }),
  { 
    closeDreamMenu: dreamActions.closeDreamMenu,
    setCurrentDreamMissionIndex: dreamActions.setCurrentDreamMissionIndex
  }
)(injectIntl(Menu));
