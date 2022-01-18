import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as request from "../../Common/Util/HTTPRequest";
import { withSubscribe } from "../../Common/Util/Subscribe";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: undefined, // 학기
      totalRankingCount: 0, // 검색된 ranker 수
      totalRankingPage: 0, // 검색 page list
      userRankings: [], // ranker list
      myRanking : undefined, // 나의 ranking 정보
      selectedTab: "learn", // selected tab
      offset: 0, // paging
      pageSize: 10, //paging
      currentPage: 1, // 현재 페이지
      startPage: 1, // start
      searchKey : "", // 검색어
      isSearchedByKey : false // 검색어로 검색했을때
    }
  }

  componentDidMount() {
    this.getSemesterInfo();
    this.getMyRankingInfo();
    this.getRankingList();
  }

  getSemesterInfo = async () => {
    try {
      let response = await request.getSemester();
      const json = await response.json();
      this.setState({ semester : json })
    } catch (error) {
      console.log(error)
    }
  }

  handleSelectTab = selectedTab => {
    this.setState(
      {selectedTab}, 
      () => { 
        this.getMyRankingInfo();
        this.getRankingList();
      }
    );
  }

  getMyRankingInfo = async () => {
    let params = { type: this.state.selectedTab, email : this.props.userinfo.email } 
    try {
      let response = await request.getMyRanking(params);
      const json = await response.json();

      this.setState({
        myRanking: json, // 나의 ranking정보
      }) 
    } catch (error) {
      console.log(error)
    }
  }

  getRankingList = async () => {
    const { currentPage, pageSize, searchKey } = this.state;
    let params = { type: this.state.selectedTab } 

    if(searchKey === "") {
      params.limit = pageSize;
      params.offset = (currentPage - 1) * pageSize;
    } else {
      params.searchKey = searchKey
    }
    let response = await request.getUserRankings(params);
    const json = await response.json();
    const {count, rows} = json;

    // 검색 list 재정렬
    rows.sort(function(prev, next){
      return prev.rank - next.rank
    });

    // TO-Do : 학기 정보 셋팅
    this.setState({
      totalRankingCount: count, // 검색된 ranker 수
      totalRankingPage: Math.ceil(count/pageSize), // 검색 page 
      userRankings: rows, // 검색된 ranker
      isSearchedByKey: searchKey !== ""
    })
  }

  onClickMoveMyPage = () => {
    this.props.history.push("/mypage");
  }

  onClickPageNumber = (pageNo) => {
    this.setState(
      { currentPage: pageNo }, 
      () => { this.getRankingList() }
    );

  }

  handleOnChangeSearchKey = (e) => {
    this.setState({searchKey:e.target.value})
  }

  handleOnKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.getRankingList();
    }
  }

  getPageInfo = () => {
    let pages = []
    for(let i = this.state.startPage; i <= this.state.totalRankingPage; i++){
      pages.push(i)
      if(pages.length === 10) break;
    }
    return {
      pages: pages,
      currentPage: this.state.currentPage
    }
  }

  onClickPageHandler = (type) => {
    const {pages} = this.getPageInfo();
    if(type === "next") {  // 다음 버튼 눌렀을때
      // 현재 보여주는 page다음의 페이지가 총 페이지 수 보다 작을때
      if(pages[pages.length-1]+1 <= this.state.totalRankingPage) {
        this.setState({startPage:pages[pages.length-1]+1})
        this.onClickPageNumber(pages[pages.length-1]+1)
      }
    } else { // 이전 버튼 눌렀을때
      if(pages[0]-this.state.pageSize > 0){ // 현재 pageList의 첫번보다 pageSize만큼 더 있는지 확인
        this.setState({startPage:pages[0]-10})
        this.onClickPageNumber(pages[0]-10)
      } else { //없으면 현재 pageList에서 첫번째로 이돔
        this.setState({startPage:pages[0]})
        this.onClickPageNumber(pages[0])
      }
    }
  }

  onClickSubScribe = (type, userInfo) => {
    if(type === "subscribe") {
      this.props.subscribe(
        userInfo.email, 
        (result) => { 
          if(result) this.subscribeCountManage("plus" , userInfo.email);
        }
      );

    } else if(type === "unsubscribe"){
      this.props.unsubscribe(
        userInfo.email, 
        (result) => { 
          if(result) this.subscribeCountManage("minus" , userInfo.email);
        }
      );
    }
  }

  subscribeCountManage = (type, email) => {
    let _userRankings = this.state.userRankings
    for(let i =0; i< _userRankings.length; i++){
      if(_userRankings[i].user.email === email) {
        if(type === "plus") _userRankings[i].user.subscribeCount += 1
        if(type === "minus" && _userRankings[i].user.subscribeCount > 0) _userRankings[i].user.subscribeCount -= 1
        break;
      }
    }

    this.setState({userRankings: _userRankings})
  }

  render() {
    const { 
      semester, 
      selectedTab, 
      userRankings, 
      myRanking, 
      isSearchedByKey 
    } = this.state;
    const { intl, userinfo, subscribeInfo  } = this.props;
    const { 
      handleSelectTab, 
      getPageInfo, 
      onClickPageNumber, 
      handleOnChangeSearchKey, 
      handleOnKeyUp, 
      getRankingList,
      onClickPageHandler,
      onClickMoveMyPage,
      onClickSubScribe
    } = this;
    const pageInfo = getPageInfo();

    return (
      <View
        intl={intl}
        me={userinfo}
        semester={semester}
        pages={pageInfo.pages}
        currentPage={pageInfo.currentPage}
        selectedTab={selectedTab}
        handleSelectTab={handleSelectTab}

        userRankings={userRankings}
        myRanking={myRanking}
        onClickPageNumber={onClickPageNumber}
        handleOnChangeSearchKey={handleOnChangeSearchKey}
        handleOnKeyUp={handleOnKeyUp}
        getRankingList={getRankingList}
        isSearchedByKey={isSearchedByKey}
        onClickPageHandler={onClickPageHandler}
        onClickMoveMyPage={onClickMoveMyPage}
        subscribedEmails={subscribeInfo.emails}
        onClickSubScribe={onClickSubScribe}
      />
    );
  }
}
export default connect(
  state => ({ userinfo: state.userinfo }),
  {}
)(injectIntl(withSubscribe(Container)));
