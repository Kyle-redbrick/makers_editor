import React from "react";
import ReactHtmlParser from "react-html-parser";
import Layout from "../../Common/Component/Layout";
import jjPC from "../../Image/jj_pc.png";
import jjM from "../../Image/jj_m.png";
import jjSearch from "../../Image/ssafy_search.png";
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
      <div className="Page--JJ">
        <div className="JJ--Inner">
          <div className="JJ_Search">
            <div className="JJ_SearchWrap">
              <input
                className="JJ_SearchInput"
                type="text"
                value={searchKeyword}
                onChange={handleOnChange}
              />
              <img className="JJ_SearchIcon" src={jjSearch} alt="search" />
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
    return <div className="JJ-search-empty">검색 결과가 존재하지 않습니다</div>;
  }
  return (
    <div className="JJ-games">
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
      <div className="JJ_MainBanner">
        <img className="JJ_MainBannerPC" src={jjPC} alt="bg" />
        <img className="JJ_MainBannerMobile" src={jjM} alt="bg" />
      </div>
      <div className="JJ-games">
        {/* new games */}
        <div className="GameHeader">
          <p className="GameTitle">
            <span role="img" aria-label="fire">
              👊
            </span>{" "}
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/wizapps/jjNew/0`}
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
      <div className="JJ-games">
        {/* new games */}
        <div className="GameHeader">
          <p className="GameTitle">
            <span role="img" aria-label="thumb">
              👍
            </span>{" "}
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/wizapps/jjRank/0`}
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
