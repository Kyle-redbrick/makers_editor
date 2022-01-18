import React from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const WizTooltip = props => {
  /** 
   container: 툴팁이 뜨는 주체
   contentTitle : 툴팁 내용
   contentImgSrc : 툴팁 내용의 이미지 소스
   imgStyle : contentImgSrc 의 스타일
  */
  const {
    contentImgSrc,
    imgStyle,
    contentTitle,
    container,
    backgroundColor
  } = props;

  const useStyles = makeStyles(theme => ({
    customWidth: {
      maxWidth: 400,
      backgroundColor: backgroundColor ? backgroundColor : "#151424",
      borderRadius: "0px"
    },
    arrow: {
      color: backgroundColor ? backgroundColor : "#151424"
    }
  }));

  return (
    <Tooltip
      classes={{ tooltip: useStyles().customWidth, arrow: useStyles().arrow }}
      arrow
      title={
        <div>
          {contentTitle && (
            <div
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "14px",
                lineHeight: "25px",
                width: "100%",
                overflow: "hidden"
              }}
            >
              {contentTitle}
            </div>
          )}

          {contentImgSrc && (
            <img
              src={contentImgSrc}
              style={{ width: "100%", ...imgStyle }}
              alt="img"
            />
          )}
        </div>
      }
    >
      {container}
    </Tooltip>
  );
};

export default WizTooltip;
