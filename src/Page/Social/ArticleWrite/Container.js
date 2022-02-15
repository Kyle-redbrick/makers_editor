import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withRouter, Redirect } from "react-router-dom";
import * as request from "../../../Common/Util/HTTPRequest";
import PopUp, { showPopUp } from "../../../Common/Component/PopUp";
import View from "./View";
import { spamType } from "../../../Common/Util/Constant";
// import * as TrackingUtil from "../../../Common/Util/TrackingUtil";

class Container extends Component {
  constructor(props) {
    super(props);
    this.articleId = props.match.params.id;
    this.state = {
      title: "",
      tags: [],
      questActive: false,
      questPoint: 1
    };
  }
  componentDidMount() {
    // TrackingUtil.sendPageEvent("/social/write", this.props.userinfo.email);
    const { articleId } = this;
    if (articleId) this.getArticle(articleId);
  }

  // draft
  setDraftEditorRef = draftEditor => {
    if (draftEditor) this.draftEditor = draftEditor;
  };
  onClickFile = () => {
    if (this.draftEditor) this.draftEditor.onClickFile();
  };
  onClickGame = () => {
    if (this.draftEditor) this.draftEditor.onClickGame();
  };
  onClickCode = () => {
    if (this.draftEditor) this.draftEditor.onClickCode();
  };

  // article
  getArticle = id => {
    request
      .getSocialArticle(id)
      .then(res => res.json())
      .then(article => {
        const contents = JSON.parse(article.contents);
        const tags = article.articleTags.map(articleTag => articleTag.tag.name);
        const questPoint = article.questPoint;
        const questActive = !!article.questPoint;
        this.draftEditor.setContents(contents);
        this.setState({
          title: article.title,
          tags,
          questActive,
          questPoint
        });
      });
  };
  addArticle = () => {
    const { formatMessage } = this.props.intl;
    const contents = this.draftEditor.getContents();

    if ((this.state.title + this.draftEditor.getText()).length > 1000) {
      showPopUp(
        <PopUp.OneButton
          title={formatMessage({ id: "ID_SOCIAL_WARNNING" })}
          buttonName={formatMessage({
            id: "ID_BUILDER_ALERT_CONFIRMBTN"
          })}
        />,
        { darkmode: true, dismissButton: false }
      );

      return;
    }
    if (contents) {
      showPopUp(
        <PopUp.TwoButton
          title={formatMessage({ id: "ID_SOCIAL_WRITE_ADD_TITLE" })}
          cancelButtonName={formatMessage({ id: "ID_SOCIAL_WRITE_ADD_CANCEL" })}
          confirmButtonName={formatMessage({
            id: "ID_SOCIAL_WRITE_ADD_CONFIRM"
          })}
          confirmAction={() => {
            const { title = " ", tags, questActive, questPoint } = this.state;
            request
              .addSocialArticle({
                email: this.props.userinfo.email,
                title,
                contents: JSON.stringify(contents),
                text: title + this.draftEditor.getText(),
                tags,
                questPoint: questActive ? questPoint : 0
              })
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  window.scrollTo(0, 0);
                  this.props.history.replace(`/social`);
                } else {
                  if (json.spam) {
                    let title;
                    switch (json.spam) {
                      case spamType.SPAM_BAD_WORD:
                        title = "ID_SPAM_POPUP_TITLE_BAD_WORD";
                        break;
                      case spamType.SPAM_DUPLICATION:
                        title = "ID_SPAM_POPUP_TITLE_DUPLICATION";
                        break;
                      case spamType.SPAM_TIME:
                        title = "ID_SPAM_POPUP_TITLE_TIME";
                        break;
                      default:
                        break;
                    }

                    showPopUp(
                      <PopUp.OneButton
                        title={formatMessage({ id: title })}
                        buttonName={formatMessage({
                          id: "ID_SPAM_POPUP_CONFIRM"
                        })}
                      />,
                      {
                        darkmode: true,
                        dismissButton: false,
                        dismissOverlay: true
                      }
                    );
                  }
                }
                // }
              });
          }}
        />,
        { darkmode: true, dismissButton: false }
      );
    } else {
      showPopUp(
        <PopUp.OneButton
          title={formatMessage({ id: "ID_SOCIAL_WRITE_EMPTY_TITLE" })}
          buttonName={formatMessage({ id: "ID_SOCIAL_WRITE_EMPTY_CONFIRM" })}
        />,
        { darkmode: true, dismissButton: false, dismissOverlay: true }
      );
    }
  };
  updateArticle = () => {
    const { formatMessage } = this.props.intl;
    const contents = this.draftEditor.getContents();
    if (contents) {
      showPopUp(
        <PopUp.TwoButton
          title={formatMessage({ id: "ID_SOCIAL_WRITE_UPDATE_TITLE" })}
          cancelButtonName={formatMessage({
            id: "ID_SOCIAL_WRITE_UPDATE_CANCEL"
          })}
          confirmButtonName={formatMessage({
            id: "ID_SOCIAL_WRITE_UPDATE_CONFIRM"
          })}
          confirmAction={() => {
            const { title = " ", tags } = this.state;
            request
              .updateSocialArticle({
                id: this.articleId,
                title,
                contents: JSON.stringify(contents),
                text: title + this.draftEditor.getText(),
                tags
              })
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  window.scrollTo(0, 0);
                  this.props.history.push(`/social`);
                }
              });
          }}
        />,
        { darkmode: true, dismissButton: false }
      );
    } else {
      showPopUp(
        <PopUp.OneButton
          title={formatMessage({ id: "ID_SOCIAL_WRITE_EMPTY_TITLE" })}
          buttonName={formatMessage({ id: "ID_SOCIAL_WRITE_EMPTY_CONFIRM" })}
        />,
        { darkmode: true, dismissButton: false, dismissOverlay: true }
      );
    }
  };

  onChangeTitle = e => {
    const title = e.target.value;
    this.setState({ title });
  };
  onClickQuest = () => {
    const questActive = !this.state.questActive;
    this.setState({ questActive, questPoint: 1 });
  };
  onChangeQuestPoint = e => {
    const questPoint = e.target.value;
    this.setState({ questPoint });
  };
  onClickSubmit = () => {
    const id = this.articleId;
    if (id) {
      this.updateArticle();
    } else {
      this.addArticle();
    }
  };

  onAddTag = tag => {
    const { tags } = this.state;
    const slicedTag = tag.slice(0, 10);
    if (tags.indexOf(slicedTag) < 0) {
      this.setState({ tags: [].concat(tags, slicedTag) });
    }
  };
  onDeleteTag = index => {
    const tags = [...this.state.tags];
    tags.splice(index, 1);
    this.setState({ tags });
  };

  render() {
    if (!this.props.userinfo.email) {
      return <Redirect to="/social" />;
    }

    const { intl, userinfo } = this.props;
    const { availablePoint } = userinfo;
    const { title, tags, questActive, questPoint } = this.state;
    const {
      onChangeTitle,
      onClickFile,
      onClickGame,
      onClickCode,
      setDraftEditorRef,
      onClickQuest,
      onChangeQuestPoint,
      onClickSubmit,
      onAddTag,
      onDeleteTag,
      articleId
    } = this;

    return (
      <View
        intl={intl}
        title={title}
        tags={tags}
        questActive={questActive}
        questPoint={questPoint}
        userPoint={availablePoint}
        onChangeTitle={onChangeTitle}
        onClickFile={onClickFile}
        onClickGame={onClickGame}
        onClickCode={onClickCode}
        setDraftEditorRef={setDraftEditorRef}
        onClickQuest={onClickQuest}
        onChangeQuestPoint={onChangeQuestPoint}
        onClickSubmit={onClickSubmit}
        onAddTag={onAddTag}
        onDeleteTag={onDeleteTag}
        articleId={articleId}
      />
    );
  }
}

export default connect(state => ({ userinfo: state.userinfo }))(
  withRouter(injectIntl(Container))
);
