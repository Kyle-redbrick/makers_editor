import React from "react";
import ReactHtmlParser from "react-html-parser";
import Layout from "../../Common/Component/Layout";
import ssafyTitle from "../../Image/ssafy_logo_title.png";
import ssafyLogo from "../../Image/ssafy_logo_pc.png";
import ssafyBG from "../../Image/ssafy_bg_pc.png";
import ssafyTitleMobile from "../../Image/ssafy_logo_title_mobile.png";
import ssafySearch from "../../Image/ssafy_search.png";
import moreIconImg from "../../Image/game-more.svg";
import GameCard from "../../Common/Component/Gamecard";
import { Link } from "react-router-dom";
import "./index.scss";

export default function View(props) {
  const {
    rankProjects,
    newProjects,
    searchKeyword,
    searchProjects,
    handleOnChange
  } = props;
  return (
    <Layout>
      <div className="Page--SSAFY">
        <div className="SSAFY--Inner">
          <div className="SSAFY_Search">
            <div className="SSAFY_SearchWrap">
              <input
                className="SSAFY_SearchInput"
                type="text"
                value={searchKeyword}
                onChange={handleOnChange}
              />
              <img
                className="SSAFY_SearchIcon"
                src={ssafySearch}
                alt="search"
              />
            </div>
          </div>
          {searchKeyword.length > 0 ? (
            <SearchList
              searchProjects={searchProjects}
              searchKeyword={searchKeyword}
            />
          ) : (
            <NormalList rankProjects={rankProjects} newProjects={newProjects} />
          )}
        </div>
      </div>
    </Layout>
  );
}

const highlightString = (text, query) => {
  if (!text || !query) return text;
  if (typeof text !== "string") return text;

  let re = new RegExp(`${query}`, "ig");
  let result = text.replace(
    re,
    "<strong class='Search__highlight'>$&</strong>"
  );
  result = ReactHtmlParser(result);
  return result;
};

const SearchList = props => {
  const { searchProjects, searchKeyword } = props;
  searchProjects.forEach(item => {
    item.name = highlightString(item.name, searchKeyword);
    item.user.name = highlightString(item.user.name, searchKeyword);
  });
  if (searchProjects.length === 0) {
    return (
      <div className="SSAFY-search-empty">검색 결과가 존재하지 않습니다</div>
    );
  }
  return (
    <div className="SSAFY-games">
      <div className="GameItems">
        {searchProjects.map((item, idx) => {
          return (
            <div className="GameItem" key={idx}>
              <GameCard game={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
const NormalList = props => {
  const { rankProjects, newProjects } = props;
  return (
    <React.Fragment>
      <div className="SSAFY_MainBannerPC">
        <img className="SSAFY_MainBannerPC_BG" src={ssafyBG} alt="bg" />
        <img className="SSAFY_MainBannerPC_Logo" src={ssafyLogo} alt="logo" />
        <img
          className="SSAFY_MainBannerPC_Title"
          src={ssafyTitle}
          alt="title"
        />
      </div>
      <div className="SSAFY_MainBannerMobile">
        <img
          className="SSAFY_MainBannerMobile_Title"
          src={ssafyTitleMobile}
          alt="title"
        />
      </div>
      <div className="SSAFY-games">
        {/* new games */}
        <div className="GameHeader">
          <p className="GameTitle">
            <span role="img" aria-label="fire">
              👊
            </span>{" "}
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/wizapps/ssafyNew/0`}
            >
              새로운 도전작
              <img className="GameMore" src={moreIconImg} alt="more" />
            </Link>
          </p>
        </div>

        <div className="GameItems">
          {newProjects.map((item, idx) => {
            return (
              <div className="GameItem" key={idx}>
                <GameCard game={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="SSAFY-games">
        {/* new games */}
        <div className="GameHeader">
          <p className="GameTitle">
            <span role="img" aria-label="thumb">
              👍
            </span>{" "}
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/wizapps/ssafyRank/0`}
            >
              실시간 랭킹
              <img className="GameMore" src={moreIconImg} alt="more" />
            </Link>
          </p>
        </div>

        <div className="GameItems">
          {rankProjects.map((item, idx) => {
            return (
              <div className="GameItem" key={idx}>
                <GameCard game={item} />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};
