import React from "react";
import Layout from "../../Common/Component/Layout";
import learnIcon from "../../Image/icon_bits.svg";
import createIcon from "../../Image/rank_create_icon.svg";
import popIcon from "../../Image/rank_pop_icon.svg";
import viewIcon from "../../Image/rank_view_icon.svg";
import searchIcon from "../../Image/dreamclass/search.svg";
import rank1Icon from "../../Image/rank_1.svg";
import rank2Icon from "../../Image/rank_2.svg";
import rank3Icon from "../../Image/rank_3.svg";
import rankTabLearnIcon from "../../Image/rank_tab_learn.svg";
import rankTabCreateIcon from "../../Image/rank_tab_create.svg";
import rankTabPopIcon from "../../Image/rank_tab_pop.svg";
import rankTabViewIcon from "../../Image/rank_tap_view.svg";
import "./index.scss";
import { FormattedMessage, FormattedNumber } from "react-intl";

export default function View(props) {
  const {
    intl,
    semester,
    pages,
    currentPage,
    selectedTab,
    handleSelectTab,
    userRankings,
    myRanking,
    onClickPageNumber,
    handleOnChangeSearchKey,
    handleOnKeyUp,
    getRankingList,
    isSearchedByKey,
    onClickPageHandler,
    onClickMoveMyPage,
    subscribedEmails,
    onClickSubScribe
  } = props;

  return (
    <Layout>
      <div className="Page--Ranking">
        <div className="RankWrapper">
          <div className="RankTitle"><FormattedMessage id="ID_RANKING_TITLE" /></div>
          <div className="RankSeason">{semester ? semester.name : ""}</div>
          <div className="RankSubTitle">
            <FormattedMessage id="ID_RANKING_SUBTITLE" values={{ count: intl.formatNumber(semester ? semester.studentCount : 0 ) }} />
            <FormattedMessage id="ID_RANKING_SUBTITLE2" />
          </div>
          <div className="RankTabs">
            <div className={`RankTab ${selectedTab==="learn" && "RankTabActive"}`} onClick={()=>handleSelectTab("learn")}>
              <img className="RankTabImg" src={rankTabLearnIcon} alt="tab01" />
              <div className="RankTabTitle"><FormattedMessage id="ID_RANKING_TAB_LEARN" /></div>
            </div>
            <div className={`RankTab ${selectedTab==="create" && "RankTabActive"}`} onClick={()=>handleSelectTab("create")}>
              <img className="RankTabImg" src={rankTabCreateIcon} alt="tab02" />
              <div className="RankTabTitle"><FormattedMessage id="ID_RANKING_TAB_CREATE" /></div>
            </div>
            <div className={`RankTab ${selectedTab==="pop" && "RankTabActive"}`} onClick={()=>handleSelectTab("pop")}>
              <img className="RankTabImg" src={rankTabPopIcon} alt="tab03" />
              <div className="RankTabTitle"><FormattedMessage id="ID_RANKING_TAB_POP" /></div>
            </div>
            <div className={`RankTab ${selectedTab==="view" && "RankTabActive"}`} onClick={()=>handleSelectTab("view")}>
              <img className="RankTabImg" src={rankTabViewIcon} alt="tab04" />
              <div className="RankTabTitle"><FormattedMessage id="ID_RANKING_TAB_VIEW" /></div>
            </div>
          </div>
          <div className="RankLine" />
          {myRanking ? <RankItem {...myRanking} isMe={true} mode={selectedTab} onClickMoveMyPage={onClickMoveMyPage} intl={intl} /> : null}
          <div className="RankLine" />
          <div className="RankSearchWrapper">
            <div className="RankSearch">
              <input type="text" placeholder={intl.formatMessage({id: "ID_RANKING_SEARCH"})} onChange={(e)=>{handleOnChangeSearchKey(e)}} onKeyUp={handleOnKeyUp}/>
              <img src={searchIcon} alt="search" onClick={getRankingList}/>
            </div>
            <div className="RankUpdateInfo"><FormattedMessage id="ID_RANKING_UPDATE_INFO" /></div>
          </div>
          <div className="RankUsers">
          {userRankings.map((user, i)=>{
              return <RankItem 
                key={i} 
                {...user}
                isMe={user.user.email === props.me.email} 
                isSubscribed={subscribedEmails.includes(user.user.email)} 
                mode={selectedTab} 
                intl={intl} 
                onClickSubScribe={onClickSubScribe}
              />
          })}

          </div>
          {
            isSearchedByKey
            ? null
            : (
              <div className="RankPages">
                <div className={currentPage > 10 ? "RankPageNav RankPageActive" : "RankPageNav" } onClick={()=>{ currentPage > 10 && onClickPageHandler("prev")}}><FormattedMessage id="ID_RANKING_PREV" /></div>
                {pages.map((page, i)=>{
                  if(page === currentPage) {
                    return <div key={i} className="RankPage RankPageCurrent">{page}</div>
                  } else {
                    return <div key={i} className="RankPage" onClick={()=>{onClickPageNumber(page)}}>{page}</div>
                  }
                })}
                <div className={pages.length === 10 ? "RankPageNav RankPageActive" : "RankPageNav"} onClick={()=>{ pages.length === 10 && onClickPageHandler("next")}}><FormattedMessage id="ID_RANKING_NEXT" /></div>
              </div>
            )
          }
        </div>
      </div>
    </Layout>
  );
}

const RankItem = props => {
  const { 
    intl,
    mode,
    rank,
    beforeRank,
    icon,
    name,
    subscribeCount,
    isMe,
    isSubscribed,
    point,
    user,
    onClickMoveMyPage,
    onClickSubScribe
  } = props;

  let unit, numberIcon;

  switch(mode){
    case "learn": 
      unit = intl.formatMessage({id:"ID_RANKING_NUMBER_LEARN"});
      numberIcon = learnIcon;
      break;
    case "create": 
      unit = intl.formatMessage({id:"ID_RANKING_NUMBER_CREATE"});
      numberIcon = createIcon;
      break;
    case "pop": 
      unit = intl.formatMessage({id:"ID_RANKING_NUMBER_POP"});
      numberIcon = popIcon;
      break;
    case "view": 
      unit = intl.formatMessage({id:"ID_RANKING_NUMBER_VIEW"});
      numberIcon = viewIcon;
      break;
    default:break;
  }
  
  let rankItemBeforeClassName = "RankItemBefore"
  let rankingBeforeText = intl.formatNumber(beforeRank - rank);
  if(isMe) {
    if (beforeRank - rank > 0) {
      rankItemBeforeClassName += " RankItemPlus"
      rankingBeforeText = `+${rankingBeforeText}`
    }else if (beforeRank - rank < 0) {
      rankItemBeforeClassName += " RankItemMinus"
    }
  }
  return <div className={`RankItem ${isMe && "RankItemMe"}`}>
    <div className="RankItemRank">
      <div className="RankItemRankNumber"><RankNumber rank={rank} /></div>
      {isMe && <div className={rankItemBeforeClassName}>{rankingBeforeText}</div>}
    </div>
    <div className="RankInfo">
      <img className="RankInfoImg" src={icon ? icon : user.icon} alt="user icon" />
      <div className="RankInfoDesc">
        <div className="RankInfoName">{name ? name : user.name}</div>
        <div className="RankInfoSubscribe"><FormattedMessage id="ID_RANKING_SUBSCRIBE_COUNT" values={{ count: subscribeCount ? subscribeCount : user.subscribeCount }} /></div>
      </div>
    </div>
    <div className="RankInfoNumberInfo">
      <img src={numberIcon} alt="number icon" />
      <div className="RankInfoNumber"><FormattedNumber value={point ? point : 0} /></div>
      <div className="RankInfoNumberUnit">{unit}</div>
    </div>
    {isMe ? 
      <div className="RankInfoMyPage" onClick={onClickMoveMyPage}><FormattedMessage id="ID_RANKING_MYPAGE" /></div>
      :
      isSubscribed 
      ? <div className="RankInfoSubOn" onClick={()=>{onClickSubScribe("unsubscribe", user)}}><FormattedMessage id="ID_RANKING_SUBSCRIBED" /></div>
      : <div className="RankInfoSubOff" onClick={()=>{onClickSubScribe("subscribe", user)}}><FormattedMessage id="ID_RANKING_SUBSCRIBE" /></div>
    }
  </div>
}

const RankNumber = props => {
  switch(props.rank) {
    case 1: return <img className="RankImg" src={rank1Icon} alt="rank" />;
    case 2: return <img className="RankImg" src={rank2Icon} alt="rank" />;
    case 3: return <img className="RankImg" src={rank3Icon} alt="rank" />;
    default: return <div className="RankText"><FormattedNumber value={props.rank} /></div>;
  }
}