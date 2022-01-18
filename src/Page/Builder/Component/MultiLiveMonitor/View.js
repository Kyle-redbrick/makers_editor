import React from "react";
import "./index.scss";

export default function(props) {
  const {
    // connected,
    // recvAudio,
    // recvVideo,
    // audioEnabled,
    isTutor,
    // setRemoteVideo,
    // setLocalVideo,
    // handleVideoToggleButton,
    // handleVoiceToggleButton,
    // handleChangeVideoButton,
    // handleDrawingBtn,
    // handleLectureVideoListBtn,
    handleExitBtn,
    // startTime,
    // setTimerRef,
    // poorNetwork,
    // isEnd,
    // isLectureVideoListOn,
    // lectureVideos,
    // handleLectureSlideBtn,
    // lectureSlides,
    // opposite,
    // handleSelectTab,
    handleChangeZIndex,
    // handleSMS,
    // handleDevice,
    setStudentVideo,
    setTutorVideo,
    // tutorEmail,
    tutorName,
    // students,
    attendees,
    // email,
    // tutorEmail,
    // handleVoiceToggleButton
    // audioEnabled
    refreshVideos
  } = props;

  const tutor = attendees.length && attendees[attendees.length - 1];

  return (
    <div className="Live" onMouseDown={() => handleChangeZIndex("live")}>
      {/* title */}
      <div className="LiveTitleLine1v4 handle">
        {/* <div className="LiveTitle">{opposite}</div>
        {startTime && (
          <div ref={setTimerRef} className={"Timer"}>
            00:00
          </div>
        )} */}
        {/* <button className="DeviceHanleButton" onClick={handleDevice} /> */}
        {isTutor && (
          <React.Fragment>
            {/* <button className="SmsButton" onClick={handleSMS} /> */}
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
      <div className="LiveContentVideo1v4">
        <div className="studentVideos">
          {[1, 2, 3, 4].map((v, i) => {
            let empty = false;
            if (!attendees[i]) {
              empty = true;
            } else if (attendees[i].name === tutorName) {
              //temp
              empty = true;
            }

            if (empty) {
              return (
                <div className={`student${v}`}>
                  <span className={`student${v}--num`}>0</span>
                  <span className="student--name">-</span>
                  <video
                    // muted={attendeeEmail === email}
                    autoPlay
                    ref={video => setStudentVideo(video, i)}
                    className="RemoteVideo"
                    onClick={refreshVideos}
                  />
                  <button
                    className="controllBtn1v4 controllBtn1v4--mic controllBtn1v4--mic--off"
                    // onClick={() => handleVoiceToggleButton(attendeeEmail)}
                  />
                </div>
              );
            }
            const { name, audioEnabled } = attendees.length && attendees[i];
            return (
              <div className={`student${v}`}>
                <span className={`student${v}--num`}>{v}</span>
                <span className="student--name">{name}</span>
                <video
                  // muted={attendeeEmail === email}
                  autoPlay
                  ref={video => setStudentVideo(video, i)}
                  className="RemoteVideo"
                  onClick={refreshVideos}
                />
                <button
                  className={`controllBtn1v4 controllBtn1v4--mic controllBtn1v4--mic--${
                    audioEnabled ? "on" : "off"
                  }`}
                  // onClick={() => handleVoiceToggleButton(attendeeEmail)}
                />
              </div>
            );
          })}
        </div>
        <div className="tutorVideo">
          <span className="tutor--num">T</span>
          <span className="tutor--name">{tutorName}</span>
          <video
            // muted={isTutor}
            autoPlay
            ref={video => setTutorVideo(video)}
            className="LocalVideo"
            onClick={refreshVideos}
          />
          <button
            className={`controllBtn1v4 controllBtn1v4--mic controllBtn1v4--mic--${
              tutor.audioEnabled ? "on" : "off"
            }`}
            // onClick={() => handleVoiceToggleButton(tutorEmail)}
          />
        </div>
      </div>
    </div>
  );
}
