import React, { Component } from "react";
import { connect } from "react-redux";
import * as request from "../../../../Common/Util/HTTPRequest";
import AssetLibrary from "../../utils/assetLibrary";
import * as projectActions from "../../Store/Reducer/project";
import View from "./View";
import { URL } from "../../../../Common/Util/Constant";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSlider: false,
      value: 0,
      states: [],
      tutorVideo: undefined,
      studentVideo: undefined,
      currentDuration: undefined,
      videoDuration: undefined,
      buttonEnabled: false,
      isPause: true
    };
    this.tutorVideoRef = undefined;
    this.studentVideoRef = undefined;
    this.timeStamp = undefined;
    this.stateIndex = -1;
    this.timer = undefined;
    this.durationTimer = this.getTimeHHMMSS(0);
    this.isMovingSlider = false;
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    try {
      //비로그인이라면
      if (!this.props.email) {
        window.location.replace("/");
        return;
      }

      //whitelist체크
      let isWhiteListUser = await request.getWhiteList({
        email: this.props.email ? this.props.email : "none"
      });
      isWhiteListUser = await isWhiteListUser.json();

      if (!isWhiteListUser) {
        //수업에 참여한 학생이 맞는지 체크
        let reservation = await request.getReservationById({
          reservationId: this.props.reservationId
        });
        reservation = await reservation.json();
        reservation = reservation.reservation;
        if (reservation.studentEmail !== this.props.email) {
          window.location.replace("/");
          return;
        }
      }

      const url = `${URL.RECORD_S3}/${this.props.reservationId}/info.json`;
      const res = await request.getS3Json({ url });
      const info = await res.json();
      const { studentClip, tutorClip, baseURL } = info;
      let tutorVideo = undefined;
      if (tutorClip) {
        tutorVideo = {
          timestamp: tutorClip.timestamp,
          url: baseURL + "/" + tutorClip.fileName
        };
      }

      let studentVideo = undefined;
      if (studentClip) {
        studentVideo = {
          timestamp: studentClip.timestamp,
          url: baseURL + "/" + studentClip.fileName
        };
      }

      Promise.all(
        info.states.map(s =>
          request
            .getS3Json({ url: baseURL + "/" + s.fileName })
            .then(res => res.json())
            .then(json => {
              return {
                scene: json.scene,
                preview: json.preview,
                interaction: json.interaction,
                timestamp: s.timestamp
              };
            })
            .catch(e => console.error(e))
        )
      ).then(states => {
        this.setState({
          states,
          tutorVideo,
          studentVideo
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  handleClickArea = () => {
    this.setState({ isShowSlider: !this.state.isShowSlider });
  };

  setTutorVideoRef = ref => {
    this.tutorVideoRef = ref;
  };

  setStudentVideoRef = ref => {
    this.studentVideoRef = ref;
  };

  setStateFromStates = async index => {
    if (this.stateIndex === index) {
      return;
    }
    this.stateIndex = index;
    const _state = this.state.states[index];
    const assets = await AssetLibrary.loadAssetsForGame(_state.scene);
    AssetLibrary.setAll(assets);
    this.props.setProject({
      state: {
        scene: _state.scene,
        preview: _state.preview,
        interaction: _state.interaction
      }
    });
  };

  printTimerCallback = () => {
    const timestamp = this.tutorVideoRef.currentTime;
    const time = this.getTimeHHMMSS(timestamp);
    const sliderValue = Math.trunc(
      (timestamp / this.tutorVideoRef.duration) * 1000
    );

    if (this.isMovingSlider) {
      this.setState({ currentDuration: time });
    } else {
      this.setState({ currentDuration: time, value: sliderValue });
    }
  };

  progressTimerCallback = () => {
    const timestamp = this.tutorVideoRef.currentTime * 1000;

    const { states } = this.state;
    const needTimeStamp = Math.trunc(Number(this.timeStamp) + timestamp);
    let index = -1;
    for (let i = 0; i < states.length; ++i) {
      if (states[i] && states[i].timestamp) {
        const stateTimeStamp = states[i].timestamp;
        if (needTimeStamp >= stateTimeStamp) {
          index = i;
          continue;
        }
        break;
      }
    }

    if (index !== -1) {
      this.setStateFromStates(index);
    }
  };

  getTimeHHMMSS = function(value) {
    var sec_num = Math.trunc(value);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (hours !== "00") {
      return hours + ":" + minutes + ":" + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  };

  setProgressTimer = () => {
    this.progressTimerCallback();
    this.progressTimer = setInterval(this.progressTimerCallback, 500);
  };

  setDurationTimer = () => {
    this.printTimerCallback();
    this.durationTimer = setInterval(this.printTimerCallback, 1000);
  };

  onClickPlay = async () => {
    this.stateIndex = -1;
    this.timeStamp = this.state.tutorVideo.timestamp;

    if (this.tutorVideoRef) {
      this.tutorVideoRef.play();
    }

    if (this.studentVideoRef) {
      this.studentVideoRef.play();
    }

    this.setProgressTimer();
    this.setDurationTimer();

    this.setState({ isPause: false });
  };

  onClickPause = () => {
    if (this.tutorVideoRef) {
      this.tutorVideoRef.pause();
    }

    if (this.studentVideoRef) {
      this.studentVideoRef.pause();
    }

    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = undefined;
    }

    if (this.durationTimer) {
      clearInterval(this.durationTimer);
      this.durationTimer = undefined;
    }

    this.setState({ isPause: true });
  };

  setControlButtonEnabled = () => {
    if (this.state.buttonEnabled) {
      return;
    }
    this.setState({ buttonEnabled: true });
    this.setState({
      currentDuration: this.getTimeHHMMSS(0),
      videoDuration: this.getTimeHHMMSS(Number(this.tutorVideoRef.duration))
    });
  };

  handleSliderChange = e => {
    if (!this.isMovingSlider) {
      this.isMovingSlider = true;
    }

    if (this.state.isPause) {
      const time = (this.tutorVideoRef.duration * e) / 1000;
      const duration = this.getTimeHHMMSS(time);
      this.setState({ currentDuration: duration, value: e });
    } else {
      this.setState({ value: e });
    }
  };

  videoToSeekCallback = e => {
    if (this.tutorVideoRef) {
      const tutorDuration = this.tutorVideoRef.duration;
      const { tutorVideo } = this.state;
      if (tutorVideo) {
        // If set video, can change current time
        this.tutorVideoRef.currentTime = (e / 1000) * tutorDuration;
      }
    }

    if (this.studentVideoRef) {
      const studentDuration = this.studentVideoRef.duration;
      const { studentVideo } = this.state;
      if (studentVideo) {
        // If set video, can change current time
        this.studentVideoRef.currentTime = (e / 1000) * studentDuration;
      }
    }

    if (this.isMovingSlider) {
      this.isMovingSlider = false;
    }
  };

  videoEndCallback = () => {
    setTimeout(() => {
      this.onClickPause();
    }, 1000);
  };

  render() {
    const {
      isShowSlider,
      tutorVideo,
      studentVideo,
      value,
      currentDuration,
      videoDuration,
      buttonEnabled,
      isPause
    } = this.state;
    const {
      handleClickArea,
      setTutorVideoRef,
      setStudentVideoRef,
      handleSliderChange,
      onClickPlay,
      onClickPause,
      setControlButtonEnabled,
      videoToSeekCallback,
      videoEndCallback
    } = this;

    return (
      <View
        isShowSlider={isShowSlider}
        handleClickArea={handleClickArea}
        handleSliderChange={handleSliderChange}
        setTutorVideoRef={setTutorVideoRef}
        setStudentVideoRef={setStudentVideoRef}
        tutorVideo={tutorVideo}
        studentVideo={studentVideo}
        value={value}
        onClickPlay={onClickPlay}
        onClickPause={onClickPause}
        currentDuration={currentDuration}
        videoDuration={videoDuration}
        buttonEnabled={buttonEnabled}
        setControlButtonEnabled={setControlButtonEnabled}
        videoToSeekCallback={videoToSeekCallback}
        isPause={isPause}
        videoEndCallback={videoEndCallback}
      />
    );
  }
}

export default connect(
  state => ({
    email: state.userinfo.email
  }),
  {
    setProject: projectActions.setProject
  }
)(Container);
