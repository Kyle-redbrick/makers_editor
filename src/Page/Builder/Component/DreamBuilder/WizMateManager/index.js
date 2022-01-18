import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import WizMate from "../../../../../Common/Component/WizMate";
import Condition from "../ConditionChecker/condition";
import "./index.scss"

const LOCATION = {
  EDITOR: "onEditor",
  GAME: "onGame",
  PLAY_BUTTON: "onPlayButton"
}

class WizMateManager extends Component {
  constructor(props) {
    super(props);
    this.wizmateRef = createRef();
    this.state = { location: LOCATION.EDITOR };
  }
  componentDidMount() {
    this.moveTo(LOCATION.EDITOR);
  }
  componentDidUpdate(prevProps) {
    if(prevProps.isPlaying !== this.props.isPlaying) {
      if(this.props.isPlaying) {
        this.didStartPlaying();
      } else {
        this.didStopPlaying();
      }
    }
    if(prevProps.isCodeConditionsClear !== this.props.isCodeConditionsClear) {
      if(this.props.isCodeConditionsClear) {
        this.didClearCodeConditions();
      }
    }
  }
  didStartPlaying() {
    this.moveTo(LOCATION.GAME);
    if(!this.props.isCodeConditionsClear) {
      this.didStartPlayingWithoutCodeClear();
    }
  }
  didStartPlayingWithoutCodeClear() {
    setTimeout(() => {
      this.error(this.props.intl.formatMessage({ id: "ID_DREAM_BUILDER_WIZMATEMANAGER_CODE_ALERT" })
      );
    }, 1000);
  }
  didStopPlaying() {
    this.moveTo(LOCATION.EDITOR);
  }
  didClearCodeConditions() {
    if(this.codeConditionExists && !this.props.isConditionsClear) {
      this.speak(this.props.intl.formatMessage({ id: "ID_DREAM_BUILDER_WIZMATEMANAGER_CODE_PLAY" }));
    }
  }

  moveTo(location) {
    this.setState({ location });
  }
  
  speak(message, duration) {
    if(this.wizmateRef.current) {
      this.wizmateRef.current.speak(message, duration);
    }
  }
  warn(message, duration) {
    if(this.wizmateRef.current) {
      this.wizmateRef.current.warn(message, duration);
    }
  }
  error(message, duration) {
    if(this.wizmateRef.current) {
      this.wizmateRef.current.error(message, duration);
    }
  }
  stop(message, duration) {
    if(this.wizmateRef.current) {
      this.wizmateRef.current.stop(message, duration);
    }
  }

  get codeConditionExists() {
    return !!this.conditions.find(condition => condition.isCodeType);
  }
  get conditions() {
    const rawConditions = (this.props.mission && this.props.mission.conditions) || [];
    return rawConditions.map(rawCondition => Condition.create(rawCondition));
  }

  render() {
    return (
      <div className={`dream_wizmate dream_wizmate-${this.state.location}`}>
        <WizMate ref={this.wizmateRef} />
      </div>
    );
  }
}

export default connect(
  state => ({
    mission: state.dream.currentMission,
    isPlaying: state.preview.isPlaying,
    isConditionsClear: state.dream.isConditionsClear,
    isCodeConditionsClear: state.dream.isCodeConditionsClear
  })
)(injectIntl(WizMateManager));
