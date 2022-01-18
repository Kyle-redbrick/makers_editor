import React from "react";
import "./index.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function(props) {
  const {
    value,
    handleClickArea,
    handleSliderChange,
    isShowSlider,
    setTutorVideoRef,
    setStudentVideoRef,
    tutorVideo,
    studentVideo,
    onClickPlay,
    onClickPause,
    currentDuration,
    videoDuration,
    buttonEnabled,
    setControlButtonEnabled,
    videoToSeekCallback,
    isPause,
    videoEndCallback
  } = props;

  return (
    <div className="RecordPlayer">
      <div className="RecordPlayerClickArea" onClick={handleClickArea} />
      <div className="videos">
        <div className="tutorVideo">
          <video
            ref={ref => setTutorVideoRef(ref)}
            preload="auto"
            onCanPlay={() => setControlButtonEnabled()}
            onEnded={videoEndCallback}
          >
            ${tutorVideo && <source src={tutorVideo.url} type="video/webm" />}
          </video>
        </div>
        <div className="studentVideo">
          <video ref={ref => setStudentVideoRef(ref)} preload="auto">
            $
            {studentVideo && (
              <source src={studentVideo.url} type="video/webm" />
            )}
          </video>
        </div>
      </div>

      <div
        className={`RecordPlayer__Slider RecordPlayer__Slider__${
          isShowSlider ? "on" : "off"
        }`}
      >
        {isPause ? (
          <button
            className="playButton controlBtn"
            onClick={buttonEnabled ? onClickPlay : () => {}}
          ></button>
        ) : (
          <button
            className="pauseButton controlBtn"
            onClick={buttonEnabled ? onClickPause : () => {}}
          ></button>
        )}
        <span className="durationTimer">
          {videoDuration
            ? currentDuration + " / " + videoDuration
            : "00:00 / 00:00"}
        </span>
        <Slider
          min={0}
          max={1000}
          value={value}
          onChange={handleSliderChange}
          onAfterChange={videoToSeekCallback}
          trackStyle={{ backgroundColor: "#23d8af", height: 10 }}
          handleStyle={{
            height: 28,
            width: 28,
            marginTop: -8
          }}
          railStyle={{ backgroundColor: "#999999", height: 10 }}
        />
      </div>
    </div>
  );
}
