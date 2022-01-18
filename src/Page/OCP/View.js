import React from "react";
import { WIZLIVE_BANNER_LINK } from "../../Common/Util/Constant";
import "./index.scss";
import Layout from "../../Common/Component/Layout";
import homeBanner1 from "../../Image/image-1@2x.png";
import img1 from "../../Image/bitmap-2@2x.png";
import img2 from "../../Image/bitmap-copy-3@2x.png";
import img3 from "../../Image/bitmap-copy-4@2x.png";
import downloadImg from "../../Image/download.svg";
import titleImg from "../../Image/group-4@2x.png";
import titleImgSef from "../../Image/sef@2x.png";
import sefLogoImg from "../../Image/group-59-copy-2@2x.png";
import clearImg from "../../Image/group@2x.png";
// import creatorSub1Img from "../../Image/challenge_sub1.png";
// import creatorSub2Img from "../../Image/challenge_sub2.png";
// import creatorReward1Img from "../../Image/challenge_reward1.png";
// import creatorReward2Img from "../../Image/challenge_reward2.png";
// import creatorReward3Img from "../../Image/challenge_reward3.png";
// import creatorReward4Img from "../../Image/challenge_reward4.png";
// import creatorReward5Img from "../../Image/challenge_reward5.png";
import { Link } from "react-router-dom";
import { RESOURCE } from "../../Common/Util/Constant";
import GameCard from "../../Common/Component/Gamecard";
// import codingparty_banner_title01 from "../../Image/codingparty_banner_title01.png";
// import codingparty_banner_title01mobile from "../../Image/codingparty_banner_title01_mobile.png";
import liveEvtImg from "../../Image/ocp_wizlive_banner.png";
// import EventPopup from "../Home/Components/EventPopup";
// import ocp_eventbanner_circle01 from "../../Image/ocp_eventbanner_circle01.png";
import ocp_eventbanner_circle02 from "../../Image/ocp_eventbanner_circle02.png";
// import ocp_eventbanner_circle03 from "../../Image/ocp_eventbanner_circle03.png";
import ocp_eventbanner_circle04 from "../../Image/ocp_eventbanner_circle04.png";
// import creator_compass from "../../Image/creator-compass.png";
// import creator_card from "../../Image/creator-card.png";
import creatorPC from "../../Image/ocp_ch_desc_pc.png";
import creatorM from "../../Image/ocp_ch_desc_mobile.png";

import moreIconImg from "../../Image/game-more.svg";

export default function(props) {
  let {
    beginner,
    intermediate,
    advanced,
    count,
    projects,
    rank,
    handleParticipation,
    type,
    userId
  } = props;
  const items = [
    {
      img: img1,
      level: "초급",
      title: "탐정 사무소를 \n탈출하라!",
      link: "codingparty/beginner",
      isCompleted: beginner === 10
    },
    {
      img: img2,
      level: "중급",
      title: "‘몬텐노’의 \n금고를 열어라!",
      link: "codingparty/intermediate",
      isCompleted: intermediate === 10
    },
    {
      img: img3,
      level: "고급",
      title: "로봇 실험실을 \n탈출하라!",
      link: "codingparty/advanced",
      isCompleted: advanced === 10
    }
  ];

  // let isShowPopup = true;
  // const expiredAt = localStorage.getItem("expiredAt");
  // if (expiredAt) {
  //   if (Number(expiredAt) > new Date().getTime()) {
  //     isShowPopup = false;
  //   }
  // }

  return (
    <Layout>
      <div className="Page--OCP">
        <div className="section section--banner">
          <div className="banner__img__wrapper">
            <img className="banner__img" src={homeBanner1} alt="banner" />
            {type === "sef" && (
              <img
                className="banner__logo"
                src={sefLogoImg}
                alt="banner title"
              />
            )}
          </div>
          <div className="banner__bg">
            {type === "ocp" ? (
              <img
                className="banner__title__ocp"
                src={titleImg}
                alt="banner title"
              />
            ) : (
              <img
                className="banner__title__sef"
                src={titleImgSef}
                alt="banner title"
              />
            )}
            <div className="banner__participation">
              <div>
                도전 <span>{count && count.total}</span>명
              </div>
              <div>
                탈출 성공 <span>{count && count.success}</span>명
              </div>
            </div>
          </div>
        </div>

        <div className="section section--desc">
          <div className="desc__title">
            코딩파티를 더 재미있게 즐기는 <span>2</span>가지 방법
          </div>
        </div>

        <div className="section section--rewards">
          <a
            href={WIZLIVE_BANNER_LINK(props.userId)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div className="section--rewards--item">
              <div className="section--rewards--item--num">1</div>
              <div className="section--rewards--item--img">
                <img src={ocp_eventbanner_circle04} alt="reward" />
              </div>
              <div className="section--rewards--item--info">
                <div className="section--rewards--item--title">
                  1:1 맞춤 교육받고
                  <br />
                  퀄리티 있는 게임 만들기
                </div>
                
                <div className="section--rewards--item--subtitle">
                  무료체험 하러가기
                </div>
              </div>
            </div>
          </a>
          <Link to="/event/4" style={{ textDecoration: "none" }}>
            <div className="section--rewards--item">
              <div className="section--rewards--item--num">2</div>
              <div className="section--rewards--item--img">
                <img src={ocp_eventbanner_circle02} alt="reward" />
              </div>
              <div className="section--rewards--item--info">
                <div className="section--rewards--item--title">
                  빙고놀이
                  <br />
                  같이할래?
                </div>
                <div className="section--rewards--item--subtitle">
                  빙고 이벤트
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="section section--mission">
          <h3>방탈출 게임 만들기 미션</h3>
          <div className="section--mission--subtitle">
            <h5>
              방탈출 게임 미션을 클리어하고 방탈출 크리에이터 인증서를
              받아보세요
            </h5>
            <div className="download__container">
              <a className="download" href={RESOURCE.OCP_LEARNINGTOOL} download>
                수업 지원도구
                <img src={downloadImg} alt="download" />
              </a>
            </div>
          </div>

          <div className="mission__container">
            {items.map((i, index) => {
              return (
                <div className="mission__item" key={index}>
                  {i.isCompleted && (
                    <img
                      className="mission__clear"
                      src={clearImg}
                      alt="clear"
                    />
                  )}
                  <img className="img" src={i.img} alt="bg" />
                  <div className="item__bottom">
                    <div className="bottom--text">
                      <div className="bottom--text--level">{i.level}</div>
                      <div className="bottom--text--title">{i.title}</div>
                    </div>
                    <div className="bottom--link">
                      <Link className="link--url" to={`/${i.link}`}>
                        도전하기
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="section section--creator"
          id="challenge"
          name="challenge"
        >
          <div className="section--creator--wrapper">
            <img
              src={creatorPC}
              className="section--creator--img-pc"
              alt="desc"
            />
            <div
              className="section--creator--img-pc-click"
              onClick={handleParticipation}
            />
            <img
              src={creatorM}
              className="section--creator--img-m"
              alt="desc"
            />
            {/* <img className="deco_compass" src={creator_compass} alt="deco" />
            <img className="deco_card" src={creator_card} alt="deco" />
            <img
              className="section--creator--title"
              src={codingparty_banner_title01}
              alt="title"
            />
            <img
              className="section--creator--title--mobile"
              src={codingparty_banner_title01mobile}
              alt="title"
            />

            <div className="section--creator--desc">
              위즈랩을 통해 여러분만의 방탈출 게임을 만들어보세요!
              <br />
              가장 인기있는 게임과 가장 창의성 있는 게임을 선정하여 선물을
              드립니다.
            </div>

            <div className="section--creator--desc2">
              <p>공모기간 : 6월 22일 ~ 7월 19일</p>
              <p>당첨자 발표 : 8월 3일</p>
            </div>

            <div
              className="section--creator--join"
              onClick={handleParticipation}
            >
              방탈출 게임 만들기
            </div>

            <div className="section--creator--parts">
              <div className="section--creator--part section--creator--part1">
                <img
                  className="section--creator--part--title"
                  src={creatorSub1Img}
                  alt="subtitle"
                />

                <div className="section--creator--part--desc">
                  게임 좋아요 높은 순으로 수상
                </div>
                <div className="section--creator--part--rewards">
                  <CreatorRewardItem
                    icon={creatorReward1Img}
                    title="회장급 인기상"
                    subtitle="엘지 그램 노트북"
                    count={1}
                  />
                  <CreatorRewardItem
                    icon={creatorReward2Img}
                    title="반장급 인기상"
                    subtitle="에어팟 프로"
                    count={2}
                  />
                  <CreatorRewardItem
                    icon={creatorReward3Img}
                    title="위즈메이트상"
                    subtitle="위즈메이트 굿즈"
                    count={20}
                  />
                </div>
              </div>
              <div className="section--creator--part section--creator--part2">
                <img
                  className="section--creator--part--title"
                  src={creatorSub2Img}
                  alt="subtitle"
                />
                <div className="section--creator--part--desc">
                  위즈랩 심사위원 평가
                </div>
                <div className="section--creator--part--rewards">
                  <CreatorRewardItem
                    icon={creatorReward4Img}
                    title="위즈랩상"
                    subtitle="아이패드 미니"
                    count={1}
                  />
                  <CreatorRewardItem
                    icon={creatorReward5Img}
                    title="위즈라이브상"
                    subtitle="위즈라이브 12회 수강권"
                    count={5}
                  />
                </div>
              </div>
            </div>  */}
          </div>
        </div>

        <div className="section section--challenger"></div>

        <div className="section section--games">
          {/* new games */}
          <div className="GameHeader">
            <p className="GameTitle">
              <span role="img" aria-label="fire">
                🔥
              </span>{" "}
              새로운 도전작
            </p>
            <Link
              className="GameMore"
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/wizapps/challengeNew/0`}
            >
              <p className="MoreBtn--web__text">전체보기</p>
              <img src={moreIconImg} alt="more" />
            </Link>
          </div>

          <div className="GameItems">
            {projects.map((item, idx) => {
              return (
                <div className="GameItem" key={idx}>
                  <GameCard game={item.published} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="section section--games">
          {/* new games */}
          <div className="GameHeader">
            <p className="GameTitle">
              <span role="img" aria-label="thumb">
                👍
              </span>{" "}
              실시간 랭킹
            </p>
            <Link
              className="GameMore"
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/wizapps/challengeRank/0`}
            >
              <p className="MoreBtn--web__text">전체보기</p>
              <img src={moreIconImg} alt="more" />
            </Link>
          </div>

          <div className="GameItems">
            {rank.map((item, idx) => {
              return (
                <div className="GameItem" key={idx}>
                  <GameCard game={item.published} />
                  {idx < 3 && (
                    <div className="section--game--rank">{idx + 1}등</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="wizlive_banner">
          <a
            href={WIZLIVE_BANNER_LINK(userId)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={liveEvtImg} alt="live banner" />
          </a>
        </div>
        <div className="section section--read">
          <div className="section--read-title">꼭 읽어주세요!</div>
          <div className="section--read-line">
            1.부정한 방법으로 참여한 경우, 당첨이 취소될 수 있습니다.
          </div>
          <div className="section--read-line">
            2.이벤트 경품은 본사 사정으로 변경될 수 있으며, 상품 이미지와 다를
            수 있습니다.
          </div>
          <div className="section--read-line">
            3.이벤트 경품에 해당하는 제세공과금은 본인 부담입니다.
          </div>
          <div className="section--read-line">
            4.인기상은 7월 19일 24:00 기준으로 선정합니다.
          </div>
          <div className="section--read-line">
            5.개인정보 오류로 인한 당첨 연락이 불가능하거나 경품이 반송될 경우
            재발송되지 않습니다.
          </div>
        </div>
      </div>
      {/* {isShowPopup && <EventPopup />} */}
    </Layout>
  );
}

// const CreatorRewardItem = props => {
//   return (
//     <div className="section--creator--part--reward--item">
//       <img
//         className="section--creator--part--reward--item--icon"
//         src={props.icon}
//         alt={props.title}
//       />
//       <div className="section--creator--part--reward--item--title">
//         {props.title}
//       </div>
//       <div className="section--creator--part--reward--item--subtitle">
//         {props.subtitle}
//       </div>
//       <div className="section--creator--part--reward--item--subtitle">
//         ({props.count}명)
//       </div>
//     </div>
//   );
// };
