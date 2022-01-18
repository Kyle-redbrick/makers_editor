import React from "react";
import closeImage from "../../../../../../Image/popup-close.svg";
import "./index.scss";

export default function(props) {
  return (
    <div className="LectureVideo">
      <div className="LectureVideoWrapper">
        <video controls autoPlay>
          <source src={props.selectedLectureVideoURL} type="video/mp4" />
        </video>
        {props.isTutor && (
          <div>
            <div
              className="Exit"
              onClick={() => props.handleLectureVideoBtn(false)}
            >
              <img src={closeImage} alt="close btn" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
