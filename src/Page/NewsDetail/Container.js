import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import View from "./View";
import * as request from "../../Common/Util/HTTPRequest";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: undefined,
      title: undefined,
      createdAt: undefined,
      id: undefined,
      description: undefined,
      comments: [],
      previousNews: undefined,
      nextNews: undefined
    };
  }
  componentDidMount = () => {
    this.fetchNewsItem();
  };
  componentDidUpdate = prevProps => {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchNewsItem();
    }
  };
  fetchNewsItem = async () => {
    let res = await request.getNewsDetail({
      newsId: this.props.match.params.id
    });
    let news = await res.json();
    if (news) {
      /* reconstruct for comment ui */
      let parentsComments = news.currentPageInfo.comments.reduce(
        (pre, value) => {
          if (!value.parentCommentId) {
            value.childComments = [];
            pre.push(value);
          }
          return pre;
        },
        []
      );

      news.currentPageInfo.comments.forEach(item => {
        if (item.parentCommentId) {
          let index = parentsComments.findIndex(
            i => i.id === item.parentCommentId
          );
          if(parentsComments[index]){
            parentsComments[index].childComments.push(item);
          }
        }
      });
      this.setState({
        ...news.currentPageInfo,
        comments: parentsComments,
        previousNews: news.previousNews,
        nextNews: news.nextNews
      });
    }
  };

  onClickHome = () => {
    this.props.history.push("/news");
  };
  onClickPrevNews = () => {
    const { previousNews } = this.state;
    if (!previousNews) {
      return;
    }
    this.props.history.push(`/news/detail/${previousNews.id}`);
  };
  onClickNextNews = () => {
    const { nextNews } = this.state;
    if (!nextNews) {
      return;
    }
    this.props.history.push(`/news/detail/${nextNews.id}`);
  };

  // comment
  onAddNewComment = comment => {
    this.setState(prevState => ({
      comments: [].concat({ ...comment, childComments: [] }, prevState.comments)
    }));
  };
  onClickNewReply = commentId => {
    const comments = [...this.state.comments].map(comment => ({
      ...comment,
      showNewReply: comment.showNewReply ? false : comment.id === commentId
    }));
    this.setState({ comments });
  };
  render() {
    const {
      topic,
      title,
      createdAt,
      description,
      comments,
      id,
      previousNews,
      nextNews
    } = this.state;
    const {
      onClickHome,
      onClickPrevNews,
      onClickNextNews,
      onClickNewReply,
      onAddNewComment
    } = this;
    return (
      <View
        onClickHome={onClickHome}
        onClickPrevNews={onClickPrevNews}
        onClickNextNews={onClickNextNews}
        topic={topic}
        title={title}
        createdAt={createdAt}
        description={description}
        comments={comments}
        id={id}
        onClickNewReply={onClickNewReply}
        previousNews={previousNews}
        nextNews={nextNews}
        email={this.props.email}
        onAddNewComment={onAddNewComment}
      />
    );
  }
}
export default connect(
  state => ({ email: state.userinfo.email }),
  {}
)(withRouter(injectIntl(Container)));
