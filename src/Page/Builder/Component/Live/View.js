import React from "react";
import { FormattedMessage } from "react-intl";
import LiveContentVideoContainer from "./Component/LiveContentVideoContainer";
import "./index.scss";

export default function(props) {
  const {
    connected,
    recvAudio,
    recvVideo,
    audioEnabled,
    isTutor,
    setRemoteVideo,
    setLocalVideo,
    // handleVideoToggleButton,
    handleVoiceToggleButton,
    handleChangeVideoButton,
    handleDrawingBtn,
    handleLectureVideoListBtn,
    handleExitBtn,
    startTime,
    setTimerRef,
    poorNetwork,
    isEnd,
    isLectureVideoListOn,
    lectureVideos,
    handleLectureSlideBtn,
    lectureSlides,
    opposite,
    // handleSelectTab,
    handleChangeZIndex,
    handleSMS
    // handleDevice,
  } = props;
  return (
    <div className="Live" onMouseDown={() => handleChangeZIndex("live")}>
      {/* title */}
      <div className="LiveTitleLine handle">
        <div className="LiveTitle">{opposite}</div>
        {startTime && (
          <div ref={setTimerRef} className={"Timer"}>
            00:00
          </div>
        )}
        {/* <button className="DeviceHanleButton" onClick={handleDevice} /> */}
        {isTutor && (
          <React.Fragment>
            <button className="SmsButton" onClick={handleSMS} />
            <button className="ExitButton" onClick={handleExitBtn}>
              수업종료
            </button>
          </React.Fragment>
        )}
        {/* <div className="LiveClose" onClick={() => handleSelectTab("live")}>
          X
        </div> */}
      </div>

      {/* content */}
      <div className="LiveContent">
        <LiveContentVideoContainer
          audioEnabled={audioEnabled}
          connected={connected}
          handleChangeVideoButton={handleChangeVideoButton}
          handleDrawingBtn={handleDrawingBtn}
          handleLectureSlideBtn={handleLectureSlideBtn}
          handleLectureVideoListBtn={handleLectureVideoListBtn}
          handleVoiceToggleButton={handleVoiceToggleButton}
          isEnd={isEnd}
          isLectureVideoListOn={isLectureVideoListOn}
          isTutor={isTutor}
          lectureSlides={lectureSlides}
          lectureVideos={lectureVideos}
          recvAudio={recvAudio}
          recvVideo={recvVideo}
          setLocalVideo={setLocalVideo}
          setRemoteVideo={setRemoteVideo}
        />
      </div>

      {poorNetwork && (
        <div className="PoorNetwork">
          <div className="PoorNetworkText">
            <FormattedMessage id="ID_POOR_NETWORK" />
          </div>
        </div>
      )}
    </div>
  );
}
