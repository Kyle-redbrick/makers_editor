import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as dreamActions from "../../Store/Reducer/dream";
import Menu from "./Menu";
import Editor from "./Editor";
import Mission from "./Mission";
import Tutorial from "./Tutorial";
import StudyTimer from "./StudyTimer";
// temp: https://www.notion.so/wizschool/JS-OOBC-89c406d47f34494281bb20bf52fe69ce
// import WizMateManager from "./WizMateManager";
import ConditionChecker from "./ConditionChecker";
import FullScreenButton from "../FullScreenButton";
import VideoPopup from "./VideoPopup";
import "./index.scss";

function View(props) {
  return (
    <div className="Page--BUILDER dream">
      {/* {props.isTutorialShow && (
        <Tutorial
          project={props.project}
          hiddenTutorial={props.hiddenTutorial}
        />
      )} */}
      {props.isAstroBoyProject && (
        <VideoPopup
          src={"/astroboy_ep.34.mp4".toDreamclassS3URL()}
          closeFunction={props.hiddenAstroBoyPopup}
        />
      )}
      <section className="dream_section dream_section-left">
        <Menu />
        <Mission shouldSlideRerender={props.shouldSlideRerender} />
      </section>
      <section
        className={`dream_section dream_section-right${
          props.isMenuOpen ? " dream_section-overlay" : ""
        }`}
        onClick={props.closeDreamMenu}
      >
        <Editor showTutorial={props.showTutorial} {...props} />
      </section>
      <ConditionChecker />
      <FullScreenButton />
      {/* temp: https://www.notion.so/wizschool/JS-OOBC-89c406d47f34494281bb20bf52fe69ce */}
      {/* <WizMateManager /> */}
      <StudyTimer />
    </div>
  );
}

export default connect((state) => ({ isMenuOpen: state.dream.isMenuOpen }), {
  closeDreamMenu: dreamActions.closeDreamMenu,
})(View);
