import React, {useState} from "react";
import { FormattedMessage } from "react-intl";
import IconDown from "../../../Image/icon-file-down.svg";
import IconFreeArrow from "../../../Image/icon-free-trial.svg";
import IconBlockCoding from "../../../Image/icon-block-coding.svg";
import IconJavascript from "../../../Image/icon-javascript.svg";
import ImgSample from "../../../Image/img-about-sample.png";
import IconPlay from "../../../Image/btn_play.svg";
import IconSlideToggle from "../../../Image/icon-slide-toggle.svg";
import IconLight from "../../../Image/icon-light.svg";
import "./index.scss";

function Structure () {
  return (
    <div className="structure">
      <h3 className="structure__title"><FormattedMessage id="ID_ABOUT_STRUCTURE_TITLE" /></h3>
      {/* TODO 파일 다운 버튼 */}
      <a className="structure__file-down" rel="noopener noreferrer" >
        <img alt="다운 아이콘" src={IconDown} />
        <span className="structure__down-text">
          <FormattedMessage id="ID_ABOUT_DOWNLOAD_CURRICULUM" />
        </span>
      </a>

      <div className="structure__trial-wrap">
        <div className="structure__trial">
          <BlockCoding />
          <Javascript />
        </div>
      </div>
    </div>
  )
}

export default Structure ;


//블록 코딩
const BlockCoding = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlide = () => {
    setIsOpen(isOpen => !isOpen);
  }

  return (
    <div className="structure__trial-box">
      <div className="structure__trial-head">
        <img alt="block coding 아이콘" src={IconBlockCoding} />
        <h3 className="structure__trial-title">
          <FormattedMessage id="ID_ABOUT_STRUCTURE_BLOCK_CODING" />
        </h3>

        {/* TODO 클릭 시 해당 카테고리의 무료 강의 목록으로 이동 */}
        <a className="structure__free-link" rel="noopener noreferrer">
          <FormattedMessage id="ID_ABOUT_MORE_TRIAL_TEXT" />
          <img alt="더보기 아이콘" src={IconFreeArrow} />
        </a>
      </div>

      {/* TODO 비디오 영역 */}
      <div className="structure__sample-video-wrap">
        {/* 임시 이미지 */}
        <img src={ImgSample} alt="임시이미지" />

        {/* TODO 플레이 버튼 */}
        <button className="structure__video-play" type="button">
          <img alt="비디오 재생 버튼" src={IconPlay} />
        </button>
      </div>

      <p className="structure__trial-explain">
        Efficient coding grammar lessons with the self-developed block coding language OOBC! Students can create results through 24 missions that utilize various concepts from sequence to repetition.
      </p>

      {/* TODO slide content / 클릭 시 클릭한 component 의 inner content 가 나와야함. */}
      <div className="structure__slide-box">
        <div className="structure__slide-flex-box">
          {/* TODO 강의 썸네일 */}
          <img alt="강의 썸네일 임시" src={ImgSample} />
          <div className="structure__content-title-box">
            {/* TODO 강의 썸네일 */}
            <h3 className="structure__content-title">OOBC - Elementary</h3>
            {/* TODO 강의 안에 차시 몇개 있는지 노출 */}
            <span className="structure__mission-length">5 Mission · </span>
            {/* TODO 강의 시간 */}
            <span className="structure__time">200min</span>
          </div>

          <button className={isOpen ? "structure__slide-btn active" : "structure__slide-btn"} type="button" onClick={() => toggleSlide()}>
            <img alt="슬라이드 토글 아이콘" src={IconSlideToggle} />
          </button>
        </div>

        {/* TODO 펼침 시 보이는 내용들 */}
        <div className={isOpen ? "structure__slide-inner-wrap show" : "structure__slide-inner-wrap"}>
          <ul className="structure__slide-inner-list">
            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 1</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Space-A-Go Go!</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Time to depart for the mission. <br /> To where? To space!</p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 2</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Obstacle Astro</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Intruders from the graveyard orbit. <br /> What is their identity? We have to find out!</p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">Learn about events and create a simple game avoiding obstacles. </span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 3</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Hungry Robot</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Trashco, the giant amusement park robot that can clean up recyclable trash! <br /> What can it eat? </p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 3</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Hungry Robot</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Trashco, the giant amusement park robot that can clean up recyclable trash! <br /> What can it eat? </p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>
          </ul>
        </div> 
      </div>

      <div className="structure__slide-box">
        <div className="structure__slide-flex-box">
          {/* TODO 강의 썸네일 */}
          <img alt="강의 썸네일 임시" src={ImgSample} />
          <div className="structure__content-title-box">
            {/* TODO 강의 썸네일 */}
            <h3 className="structure__content-title">OOBC - Basic</h3>
            {/* TODO 강의 안에 차시 몇개 있는지 노출 */}
            <span className="structure__mission-length">15 Mission · </span>
            {/* TODO 강의 시간 */}
            <span className="structure__time">600min</span>
          </div>

          <button className={isOpen ? "structure__slide-btn active" : "structure__slide-btn"} type="button" onClick={() => toggleSlide()}>
            <img alt="슬라이드 토글 아이콘" src={IconSlideToggle} />
          </button>
        </div>

        {/* TODO 펼침 시 보이는 내용들 */}
        <div className={isOpen ? "structure__slide-inner-wrap show" : "structure__slide-inner-wrap"}>
          <ul className="structure__slide-inner-list">
            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 1</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Space-A-Go Go!</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Time to depart for the mission. <br /> To where? To space!</p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 2</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Obstacle Astro</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Intruders from the graveyard orbit. <br /> What is their identity? We have to find out!</p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">Learn about events and create a simple game avoiding obstacles. </span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 3</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Hungry Robot</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Trashco, the giant amusement park robot that can clean up recyclable trash! <br /> What can it eat? </p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 3</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Hungry Robot</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Trashco, the giant amusement park robot that can clean up recyclable trash! <br /> What can it eat? </p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>
          </ul>
        </div> 
      </div>

      <div className="structure__slide-box">
        <div className="structure__slide-flex-box">
          {/* TODO 강의 썸네일 */}
          <img alt="강의 썸네일 임시" src={ImgSample} />
          <div className="structure__content-title-box">
            {/* TODO 강의 썸네일 */}
            <h3 className="structure__content-title">OOBC - Advanced</h3>
            {/* TODO 강의 안에 차시 몇개 있는지 노출 */}
            <span className="structure__mission-length">4 Mission ·</span>
            {/* TODO 강의 시간 */}
            <span className="structure__time">160min</span>
          </div>

          <button className={isOpen ? "structure__slide-btn active" : "structure__slide-btn"} type="button" onClick={() => toggleSlide()}>
            <img alt="슬라이드 토글 아이콘" src={IconSlideToggle} />
          </button>
        </div>

        {/* TODO 펼침 시 보이는 내용들 */}
        <div className={isOpen ? "structure__slide-inner-wrap show" : "structure__slide-inner-wrap"}>
          <ul className="structure__slide-inner-list">
            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 1</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Space-A-Go Go!</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Time to depart for the mission. <br /> To where? To space!</p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>
          </ul>
        </div> 
      </div>
    </div>
  )
}

//자바스크립트
const Javascript = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlide = () => {
    setIsOpen(isOpen => !isOpen);
  }

  return (
    <div className="structure__trial-box">
      <div className="structure__trial-head">
        <img alt="block coding 아이콘" src={IconJavascript} />
        <h3 className="structure__trial-title">
          <FormattedMessage id="ID_ABOUT_STRUCTURE_JAVASCRIPT" />
        </h3>

        {/* TODO 클릭 시 해당 카테고리의 무료 강의 목록으로 이동 */}
        <a className="structure__free-link" rel="noopener noreferrer">
          <FormattedMessage id="ID_ABOUT_MORE_TRIAL_TEXT" />
          <img alt="더보기 아이콘" src={IconFreeArrow} />
        </a>
      </div>

      {/* TODO 비디오 영역 */}
      <div className="structure__sample-video-wrap">
        {/* 임시 이미지 */}
        <img src={ImgSample} alt="임시이미지" />

        {/* TODO 플레이 버튼 */}
        <button className="structure__video-play" type="button">
          <img alt="비디오 재생 버튼" src={IconPlay} />
        </button>
      </div>

      <p className="structure__trial-explain">
        Learn text coding for the first time with Astro! The auto-completion feature can help even students who aren’t good at typing to learn the text coding language JavaScript. Try the 12 different missions that utilize advanced concepts such as functions and arrays.
      </p>

      {/* TODO slide content / 클릭 시 클릭한 component 의 inner content 가 나와야함. */}
      <div className="structure__slide-box">
        <div className="structure__slide-flex-box">
          {/* TODO 강의 썸네일 */}
          <img alt="강의 썸네일 임시" src={ImgSample} />
          <div className="structure__content-title-box">
            {/* TODO 강의 썸네일 */}
            <h3 className="structure__content-title">JS - Advanced</h3>
            {/* TODO 강의 안에 차시 몇개 있는지 노출 */}
            <span className="structure__mission-length">8 Mission · </span>
            {/* TODO 강의 시간 */}
            <span className="structure__time">320min</span>
          </div>

          <button className={isOpen ? "structure__slide-btn active" : "structure__slide-btn"} type="button" onClick={() => toggleSlide()}>
            <img alt="슬라이드 토글 아이콘" src={IconSlideToggle} />
          </button>
        </div>

        {/* TODO 펼침 시 보이는 내용들 */}
        <div className={isOpen ? "structure__slide-inner-wrap show" : "structure__slide-inner-wrap"}>
          <ul className="structure__slide-inner-list">
            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 1</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Space-A-Go Go!</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Time to depart for the mission. <br /> To where? To space!</p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 2</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Obstacle Astro</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Intruders from the graveyard orbit. <br /> What is their identity? We have to find out!</p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">Learn about events and create a simple game avoiding obstacles. </span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 3</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Hungry Robot</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Trashco, the giant amusement park robot that can clean up recyclable trash! <br /> What can it eat? </p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 3</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Hungry Robot</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Trashco, the giant amusement park robot that can clean up recyclable trash! <br /> What can it eat? </p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>
          </ul>
        </div> 
      </div>

      <div className="structure__slide-box">
        <div className="structure__slide-flex-box">
          {/* TODO 강의 썸네일 */}
          <img alt="강의 썸네일 임시" src={ImgSample} />
          <div className="structure__content-title-box">
            {/* TODO 강의 썸네일 */}
            <h3 className="structure__content-title">JS - Mastery</h3>
            {/* TODO 강의 안에 차시 몇개 있는지 노출 */}
            <span className="structure__mission-length">4 Mission ·</span>
            {/* TODO 강의 시간 */}
            <span className="structure__time">160min</span>
          </div>

          <button className={isOpen ? "structure__slide-btn active" : "structure__slide-btn"} type="button" onClick={() => toggleSlide()}>
            <img alt="슬라이드 토글 아이콘" src={IconSlideToggle} />
          </button>
        </div>

        {/* TODO 펼침 시 보이는 내용들 */}
        <div className={isOpen ? "structure__slide-inner-wrap show" : "structure__slide-inner-wrap"}>
          <ul className="structure__slide-inner-list">
            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 1</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Space-A-Go Go!</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Time to depart for the mission. <br /> To where? To space!</p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 2</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Obstacle Astro</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Intruders from the graveyard orbit. <br /> What is their identity? We have to find out!</p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">Learn about events and create a simple game avoiding obstacles. </span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 3</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Hungry Robot</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Trashco, the giant amusement park robot that can clean up recyclable trash! <br /> What can it eat? </p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>

            <li className="structure__slide-inner-item">
              {/* TODO 차시 넘버 */}
              <span className="structure__mission-label">Mission 3</span>
              {/* TODO 차시 네임 */}
              <h3 className="structure__mission-name">Hungry Robot</h3>
              {/* TODO 차시 설명 */}
              <p className="structure__mission-explain">Trashco, the giant amusement park robot that can clean up recyclable trash! <br /> What can it eat? </p>
              {/* TODO 차시에 관한 안내사항 */}
              <div className="structure__notice-box">
                <img alt="전구 모양 아이콘" src={IconLight} />
                <span className="structure__notice-text">A space adventure for block coding beginners.</span>
              </div>
            </li>
          </ul>
        </div> 
      </div>
    </div>
  )
}