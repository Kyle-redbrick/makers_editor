import React from "react";
import { Rnd } from "react-rnd";
// import SubHeader from "../SubHeader";
import DrawingBoard from "./DrawingBoard";
import LectureVideoContainer from "./Component/LectureVideoContainer";
import LectureSlideContainer from "./Component/LectureSlideContainer";
import "./index.scss";

export default function(props) {
  const {
    isDrawingBoardOn,
    setStudentVideo,
    setTutorVideo,
    rnd,
    // startTime,
    // setTimerRef,
    handleOnClickRoom,
    handleOnClickSync,
    rooms,
    studentBitrate,
    tutorBitrate,
    currentRoom,
    isLectureVideoOn,
    selectedLectureVideoURL,
    isLectureSlideOn,
    selectedSlideIndex,
    lectureSlides
    // isMqConnected // for using debug
  } = props;
  const { width, height, x, y, onDragStop, onResize } = rnd;

  return (
    <div className="JanusMonitor">
      <Rnd
        className="WebRTCRnd"
        size={{ width, height }}
        position={{ x, y }}
        onDragStop={(e, d) => {
          onDragStop(e, d);
        }}
        onResize={(e, direction, ref, delta, position) => {
          onResize(e, direction, ref, delta, position);
        }}
      >
        <div className="WebRTCVideo">
          {/* <SubHeader title="Monitor" iconName="video-on">
            {startTime && (
              <div ref={setTimerRef} className={"Timer"}>
                00:00
              </div>
            )}
          </SubHeader> */}
          <div className="VideoBox VideoBox--others">
            <video
              autoPlay
              className="video video--others"
              ref={video => setStudentVideo(video)}
            />
            {currentRoom && (
              <div className="VideoBox--info">
                {/* <div className="VideoBox--email">
                  {currentRoom.studentEmail}
                </div> */}
                <div className="VideoBox--bitrate">{studentBitrate}</div>
              </div>
            )}
          </div>
          <div className="VideoBox VideoBox--mine">
            <video
              autoPlay
              className={`video video--mine`}
              id="tutorVideo"
              ref={video => setTutorVideo(video)}
            />
            {currentRoom && (
              <div className="VideoBox--info">
                {/* <div className="VideoBox--email">{currentRoom.tutorEmail}</div> */}
                <div className="VideoBox--bitrate">{tutorBitrate}</div>
              </div>
            )}
          </div>
          <div className="VideoBoxRooms">
            {rooms.map((r, index) => {
              return (
                <div className="VideoBoxRoom" key={index}>
                  <div className="VideoBoxRoomIds">
                    <div className="VideoBoxRoomTime">{r.time}</div>
                    <div className="VideoBoxRoomStudentId">
                      {r.studentEmail}
                      <br />
                      {r.student.phone}
                      <br />
                      {r.student.name}
                    </div>
                    <div className="VideoBoxRoomTutorId">
                      {r.tutorEmail}
                      <br />
                      {r.tutor.user.phone}
                      <br />
                      {r.tutor.user.name}
                    </div>
                  </div>
                  <div
                    className="VideoBoxRoomButton VideoBoxRoomButton-Enter"
                    onClick={() => handleOnClickRoom(r)}
                  >
                    입장
                  </div>
                  <div
                    className="VideoBoxRoomButton VideoBoxRoomButton-Sync"
                    onClick={() => handleOnClickSync(r)}
                  >
                    싱크
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Rnd>
      {isDrawingBoardOn && <DrawingBoard />}
      {isLectureVideoOn && (
        <LectureVideoContainer
          isTutor={false}
          selectedLectureVideoURL={selectedLectureVideoURL}
        />
      )}
      {isLectureSlideOn && (
        <LectureSlideContainer
          isTutor={false}
          selectedSlideIndex={selectedSlideIndex}
          lectureSlides={lectureSlides}
        />
      )}
    </div>
  );
}
