import React, { Component } from "react";
import "./index.scss";
import closeImage from "../../../../../Image/popup-close.svg";

export default class index extends Component {
  render() {
    const { src, closeFunction } = this.props;
    return (
      <div className="video-popup-wrap">
        <div className="video-popup">
          <img 
            className="video-popup__close-btn" 
            src={closeImage} 
            alt="close button" 
            onClick={closeFunction}
          />
          <video controls autoPlay="autoplay">
            <source src={src} type="video/mp4"/>
          </video>
        </div>
      </div>
    )
  }
};
