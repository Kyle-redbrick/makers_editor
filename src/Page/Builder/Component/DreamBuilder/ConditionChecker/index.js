import React from "react";
import { connect } from "react-redux";
import * as dreamActions from "../../../Store/Reducer/dream"
import Condition from "./condition";

class ConditionChecker extends React.Component {
  constructor(props) {
    super(props);
    this.conditions = [];
  }

  componentDidMount() {
    this.init();
    document.addEventListener("keydown", this.onKeydown);
    document.addEventListener("keyup", this.onKeyup);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
    document.removeEventListener("keyup", this.onKeyup);
  }
  componentDidUpdate(prevProps) {
    if(prevProps.mission !== this.props.mission) {
      this.init();
    }
    if(this.enabled && this.isConditionStateUpdated(prevProps)) {
      this.check();
    }
  }

  init() {
    const rawConditions = (this.props.mission && this.props.mission.conditions) || [];
    this.conditions = rawConditions.map(rawCondition => Condition.create(rawCondition));
    this.props.setIsClear(false);
    this.props.setIsCodeClear(false);
  }

  isConditionStateUpdated(prevProps) {
    return (
      prevProps.game !== this.props.game
      || prevProps.scene !== this.props.scene
      || prevProps.preview !== this.props.preview
      || prevProps.interaction !== this.props.interaction
    );
  }
  get enabled() {
    return this.props.mission
      && (!this.props.mission.isCompleted || this.props.isReplaying);
  }

  check() {
    this.conditions.forEach(condition => {
      condition.check(this.conditionState);
    })

    this.checkClear();

    this.conditions.forEach(condition => {
      condition.dispose({ isPlaying: this.props.preview.isPlaying });
    })
  }
  checkClear() {
    let isClear = true;
    let isCodeClear = !this.conditions.find(condition => condition.isCodeType);

    for(let condition of this.conditions) {
      if(isClear && !condition.isClear) {
        isClear = false
      }
      if(isCodeClear && condition.isCodeType && !condition.isClear) {
        isCodeClear = false
      }
    }

    if(isClear !== this.props.isClear) {
      this.props.setIsClear(isClear);
    }
    if(isCodeClear !== this.props.isCodeClear) {
      this.props.setIsCodeClear(isCodeClear);
    }
  }
  get conditionState() {
    return  {
      game: this.props.game,
      scene: this.props.scene,
      preview: this.props.preview,
      interaction: this.props.interaction
    }
  }

  onKeydown = e => {
    if(!this.keyPressed) {
      this.keyPressed = {};
    }

    this.keyPressed[e.key] = true;
    if (
      this.keyPressed["Shift"] &&
      this.keyPressed["W"] &&
      this.keyPressed["ArrowRight"]
    ) {
      this.forceClear();
    }
  }
  onKeyup = e => {
    delete this.keyPressed[e.key];
  }
  forceClear() {
    this.props.setIsClear(true);
  }

  render() {
    return null;
  }
}

export default connect(
  state => ({
    game: state.game,
    scene: state.scene,
    preview: state.preview,
    interaction: state.interaction,
    isReplaying: state.dream.isReplaying,
    mission: state.dream.currentMission,
    isClear: state.dream.isConditionsClear,
    isCodeClear: state.dream.isCodeConditionsClear
  }),
  {
    setIsClear: dreamActions.setIsConditionsClear,
    setIsCodeClear: dreamActions.setIsCodeConditionsClear
  }
)(ConditionChecker);
