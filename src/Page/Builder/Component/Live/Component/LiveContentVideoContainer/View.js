import React, { Fragment } from "react";
import LectureVideoListContainer from "../LectureVideoListContainer";

function View(props) {
  const {
    audioEnabled,
    connected,
    handleChangeVideoButton,
    handleDrawingBtn,
    handleLectureSlideBtn,
    handleLectureVideoListBtn,
    handleVoiceToggleButton,
    isEnd,
    isLectureVideoListOn,
    isTutor,
    lectureSlides,
    lectureVideos,
    recvAudio,
    recvVideo,
    setLocalVideo,
    setRemoteVideo
  } = props;
  return (
    <Fragment>
      <div className="LiveContentVideo">
        <video
          autoPlay
          className="video video--others"
          ref={video => setRemoteVideo(video)}
        />

        {/* loading */}
        {connected && !recvVideo && !recvAudio && (
          <div className="LoadingBlock">
            <div className="LoadingBlock__msg">
              상대방의 마이크/카메라가
              <br />
              동작하지 않습니다.
            </div>
          </div>
        )}

        {connected && recvVideo && !recvAudio && (
          <div className="LoadingBlock">
            <div className="LoadingBlock__msg">
              상대방의 마이크가 동작하지 않습니다.
            </div>
          </div>
        )}

        {connected && !recvVideo && recvAudio && (
          <div className="LoadingBlock">
            <div className="LoadingBlock__msg">
              상대방의 카메라가 동작하지 않습니다.
            </div>
          </div>
        )}

        {!connected && (
          <div className="LoadingBlock">
            <div className="LoadingBlock__msg">
              {isEnd
                ? "수업이 종료되었습니다"
                : isTutor
                ? "학생의 입장을 기다리는 중입니다…"
                : "튜터의 입장을 기다리는 중입니다…"}
            </div>
          </div>
        )}
      </div>
      <div className="LiveContentVideo">
        <video
          autoPlay
          className={`video video--mine`}
          id="localVideo"
          muted
          ref={video => setLocalVideo(video)}
        />
      </div>

      {/* controller */}
      <div className="controller">
        {/* lecture slides */}
        {isTutor && lectureSlides && lectureSlides.length > 0 && (
          <button
            className={`controllBtn controllBtn--lectureSlide`}
            onClick={() => handleLectureSlideBtn(true)}
          />
        )}

        {isTutor && lectureVideos && lectureVideos.length > 0 && (
          <button
            className={`controllBtn controllBtn--lectureVideo`}
            onClick={() => handleLectureVideoListBtn(true)}
          />
        )}
        {isLectureVideoListOn && (
          <LectureVideoListContainer
            handleLectureVideoListBtn={handleLectureVideoListBtn}
            lectureVideos={lectureVideos}
          />
        )}
        {/* <button
            className={`controllBtn controllBtn--myscreen`}
            onClick={handleVideoToggleButton}
          /> */}
        <button
          className={`controllBtn controllBtn--mic controllBtn--mic--${
            audioEnabled ? "on" : "off"
          }`}
          onClick={handleVoiceToggleButton}
        />
        {isTutor && (
          <button
            className={`controllBtn controllBtn--video`}
            onClick={handleChangeVideoButton}
          />
        )}
        {isTutor && (
          <button
            className={`controllBtn controllBtn--drawing`}
            onClick={() => handleDrawingBtn(true)}
          />
        )}
      </div>
    </Fragment>
  );
}

export default View;
