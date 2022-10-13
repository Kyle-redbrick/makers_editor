import React, {useEffect, useState} from "react";
import { FormattedMessage } from "react-intl";
import IconDown from "../../../Image/icon-file-down.svg";
import IconFreeArrow from "../../../Image/icon-free-trial.svg";
import IconBlockCoding from "../../../Image/icon-block-coding.svg";
import IconJavascript from "../../../Image/icon-javascript.svg";
import IconPlay from "../../../Image/btn_play.svg";
import IconSlideToggle from "../../../Image/icon-slide-toggle.svg";
import IconLight from "../../../Image/icon-light.svg";
import * as request from "../../../Common/Util/HTTPRequest";
import { Link } from "react-router-dom";
import "./index.scss";
import { URL } from "../../../Common/Util/Constant";


import fileJp from "../../../file/curriculum_jp.pdf"
import fileEn from "../../../file/curriculum_en.pdf"
import icnDownload from "../../../Image/icn_download.png";


const lang = localStorage.getItem("lang"); 
const file = lang == "ja" ? fileJp : fileEn


function Structure () {
  const [curriculum, setCurriculum] = useState([]);
  const [blockCurriculum, setBlockCurriculum] = useState([]);
  const [jsCurriculum, setJsCurriculum] = useState([]);

  useEffect(() => {
    getCurriculum();
  }, []);

  useEffect(() => {
    divideCurriculum();
  }, [curriculum])

  const getCurriculum = async() => {
    const result = await request.getLearn();
    setCurriculum(result.body.curriculum);
  }

  const divideCurriculum = () => {
    let block = [];
    let js = [];
    for(let i = 0; i < curriculum.length; i++) {
      curriculum[i].isOpen = false;
      if(curriculum[i].course.id < 6) {
        block.push(curriculum[i]);
      } else {
        js.push(curriculum[i]);
      }
    }
    setBlockCurriculum(block);
    setJsCurriculum(js);
  }

  const onDownload = () => {
    const link = document.createElement("a");
    link.download = "Curriculum";
    link.href = file;
    link.click();
  };

  
  return (
    <div className="structure">
      <h3 className="structure__title"><FormattedMessage id="ID_ABOUT_STRUCTURE_TITLE" /></h3>
      {/* TODO 파일 다운 버튼 / 파일 전달 받을 때까지 주석처리 */}
      {/* <a className="structure__file-down" rel="noopener noreferrer" >
        <img alt="다운 아이콘" src={IconDown} />
        <span className="structure__down-text">
          <FormattedMessage id="ID_ABOUT_DOWNLOAD_CURRICULUM" />
        </span>
      </a> */}


      <div className="download">
          <div className="onDownload" onClick={onDownload}>
              <img src={icnDownload}/> <p style={{marginLeft: "17px"}}>Download Curriculum in PDF</p>
          </div>
       </div>

      <div className="structure__trial-wrap">
        <div className="structure__trial">
          <BlockCoding curriculum={blockCurriculum} />
          <Javascript curriculum={jsCurriculum} />
        </div>
      </div>
    </div>
  )
}

export default Structure;


//블록 코딩
const BlockCoding = (props) => {
  const[bCurriculum, setBCurriculum] = useState([]);

  const lang = localStorage.getItem("lang"); 
  const BlockVideoUrl = lang == "ja" ? "https://s3.ap-northeast-2.amazonaws.com/astroboy-dev.wizclass.com/assets/media/OOBC_JP.mp4" : "https://s3.ap-northeast-2.amazonaws.com/astroboy-dev.wizclass.com/assets/media/OOBC_EN.mp4"

  useEffect(() => {
    setBCurriculum(props.curriculum);
  }, [props.curriculum])

  const toggleSlide = (index) => {
    bCurriculum[index].isOpen = !bCurriculum[index].isOpen;
    setBCurriculum([...bCurriculum])
  }

  return (
    <div className="structure__trial-box">
      <div className="structure__trial-head">
        <img alt="block coding 아이콘" src={IconBlockCoding} />
        <h3 className="structure__trial-title">
          <FormattedMessage id="ID_ABOUT_STRUCTURE_BLOCK_CODING" />
        </h3>

        <Link to="/learn" className="structure__free-link">
          <FormattedMessage id="ID_ABOUT_MORE_TRIAL_TEXT" />
          <img alt="더보기 아이콘" src={IconFreeArrow} />
        </Link>
      </div>

      <div className="structure__sample-video-wrap">
        <video
          controls
          src={BlockVideoUrl}
          controlsList="nodownload"
          disablePictureInPicture
          playsInline
        />
      </div>

      <p className="structure__trial-explain">
        <FormattedMessage id="ID_ABOUT_STRUCTURE_BLOCKCODING_EXPLAIN" />
      </p>

      <h3 className="third-section__slie-wrap-title">
        <FormattedMessage id="ID_ABOUT_COURSES_SLIDE_WRAP_TITLE" />
      </h3>

      {bCurriculum.map((curriculum, index) => 
        <div key={curriculum.course.id} className="structure__slide-box">
          <div className="structure__slide-flex-box">
            <img alt="강의 썸네일 임시" src={URL.S3_DREAMCLASS + curriculum.course.smallPosterURL} />
            <div className="structure__content-title-box">
              <h3 className="structure__content-title">{curriculum.course.title}</h3>
              <span className="structure__mission-length">{curriculum.course.progress.net} <FormattedMessage id="ID_COMMON_MISSION" /></span>
              <span className="structure__time"> · {curriculum.course.studyEsmtMinute+"min"}</span>
            </div>

            <button className={curriculum.isOpen ? "structure__slide-btn active" : "structure__slide-btn"} type="button" onClick={() => toggleSlide(index)}>
              <img alt="슬라이드 토글 아이콘" src={IconSlideToggle} />
            </button>
          </div>

          {/* TODO 펼침 시 보이는 내용들 */}
          <div className={curriculum.isOpen ? "structure__slide-inner-wrap show" : "structure__slide-inner-wrap"}>
            <ul className="structure__slide-inner-list">
              {curriculum.projects.map((project) => 
                <li key={project.id} className="structure__slide-inner-item">
                  <span className="structure__mission-label">{project.label}</span>
                  <h3 className="structure__mission-name">{project.title}</h3>
                  <p className="structure__mission-explain">{project.intro}</p>
                  {/* TODO 차시에 관한 안내사항 localization, DB에 추가 */}
                  {/* <div className="structure__notice-box">
                    <img alt="전구 모양 아이콘" src={IconLight} />
                    <span className="structure__notice-text">A space adventure for block coding beginners.</span>
                  </div> */}
                </li>
              )}
            </ul>
          </div> 
        </div>
      )}
    </div>
  )
}

//자바스크립트
const Javascript = (props) => {
  const lang = localStorage.getItem("lang"); 
  const JavaVideoUrl = lang == "ja" ? "https://s3.ap-northeast-2.amazonaws.com/astroboy-dev.wizclass.com/assets/media/JS_JP.mp4#t=0.001" : "https://s3.ap-northeast-2.amazonaws.com/astroboy-dev.wizclass.com/assets/media/JS_EN.mp4#t=0.001"
  const [jsCurriculum, setJsCurriculum] = useState([]);

  useEffect(() => {
    setJsCurriculum(props.curriculum);
  }, [props.curriculum])

  const toggleSlide = (index) => {
    jsCurriculum[index].isOpen = !jsCurriculum[index].isOpen;
    setJsCurriculum([...jsCurriculum])
  }

  return (
    <div className="structure__trial-box">
      <div className="structure__trial-head">
        <img alt="block coding 아이콘" src={IconJavascript} />
        <h3 className="structure__trial-title">
          <FormattedMessage id="ID_ABOUT_STRUCTURE_JAVASCRIPT" />
        </h3>

        <Link to="/learn" className="structure__free-link">
          <FormattedMessage id="ID_ABOUT_MORE_TRIAL_TEXT" />
          <img alt="더보기 아이콘" src={IconFreeArrow} />
        </Link>
      </div>

      <div className="structure__sample-video-wrap">
        <video
          controls
          src={JavaVideoUrl}
          controlsList="nodownload"
          disablePictureInPicture
          playsInline
        />
      </div>

      <p className="structure__trial-explain">
        <FormattedMessage id="ID_ABOUT_STRUCTURE_JAVASCRIPT_EXPLAIN" />
      </p>

      <h3 className="third-section__slie-wrap-title">
        <FormattedMessage id="ID_ABOUT_COURSES_SLIDE_WRAP_TITLE" />
      </h3>
      
      { jsCurriculum.map((curriculum, index) =>
        <div key={curriculum.course.id} className="structure__slide-box">
          <div className="structure__slide-flex-box">
            <img alt="강의 썸네일 임시" src={URL.S3_DREAMCLASS + curriculum.course.smallPosterURL} />
            <div className="structure__content-title-box">
              <h3 className="structure__content-title">{curriculum.course.title}</h3>
              <span className="structure__mission-length">{curriculum.course.progress.net} <FormattedMessage id="ID_COMMON_MISSION" /></span>
              <span className="structure__time"> · {curriculum.course.studyEsmtMinute+"min"}</span>
            </div>

            <button className={curriculum.isOpen ? "structure__slide-btn active" : "structure__slide-btn"} type="button" onClick={() => toggleSlide(index)}>
              <img alt="슬라이드 토글 아이콘" src={IconSlideToggle} />
            </button>
          </div>

          {/* TODO 펼침 시 보이는 내용들 */}
          <div className={curriculum.isOpen ? "structure__slide-inner-wrap show" : "structure__slide-inner-wrap"}>
            <ul className="structure__slide-inner-list">
              {curriculum.projects.map(project => 
                <li key={project.id} className="structure__slide-inner-item">
                  <span className="structure__mission-label">{project.label}</span>
                  <h3 className="structure__mission-name">{project.title}</h3>
                  <p className="structure__mission-explain">{project.intro}</p>
                  {/* TODO 차시에 관한 안내사항 */}
                  {/* <div className="structure__notice-box">
                    <img alt="전구 모양 아이콘" src={IconLight} />
                    <span className="structure__notice-text">A space adventure for block coding beginners.</span>
                  </div> */}
                </li>                
              )}
            </ul>
          </div> 
        </div>
      )}
    </div>
  )
}