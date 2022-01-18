import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as request from "../../../../Common/Util/HTTPRequest";
import { ImageCompressor } from "../../../../Common/Util/FileCompressor";
import { generateBabylonPage } from "../../../Builder/utils/gamePageGenerator";
import * as builderAction from "../../Store/Reducer/builder";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      icon: null,
      isCopyAllowed: true,
      tags: [],
      popularTags: [],
      didPublish: false,
      isWarningName: false,
      isWarningDescription: false,
    };
    this.isUsingGameThumbnail = !props.useCustomIcon;
  }
  componentDidMount() {
    const { pId } = this.props;
    this.loadPublishedProject(pId);
    this.loadPopularTags();
  }
  loadPublishedProject(pId) {
    this.getPublishedProject(pId, (published) => {
      if (published) {
        const { name, description, isCopyAllowed, tag } = published;
        const icon = this.isUsingGameThumbnail ? this.props.gameThumbnail : published.icon;
        const tags = tag.map((item) => item.gameTag.name);
        this.setState({
          name,
          description,
          icon,
          isCopyAllowed,
          tags,
          didPublish: true,
        });
      }
    });
  }
  getPublishedProject(pId, callback) {
    request
      .getPublishedProject({ pId })
      .then((res) => res.json())
      .then((published) => {
        if (callback) callback(published);
      })
      .catch((e) => console.error(e));
  }
  loadPopularTags() {
    this.getPopularTags((popularTags) => {
      this.setState({ popularTags });
    });
  }
  getPopularTags(callback) {
    request
      .getPopularTag()
      .then((res) => res.json())
      .then((json) => {
        if (callback) {
          const popularTags = json.map((item) => item.name);
          callback(popularTags);
        }
      })
      .catch((e) => console.error(e));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPublishOn !== this.props.isPublishOn) {
      this.onUpdateIsPublishOn();
    }
    if (prevProps.gameThumbnail !== this.props.gameThumbnail) {
      this.onChangeGameThumbnail();
    }
  }
  onUpdateIsPublishOn() {
    if (this.props.isPublishOn) {
      const { pId } = this.props;
      this.loadPublishedProject(pId);
      this.setState({ isWarningName: false, isWarningDescription: false });
    }
  }
  onChangeGameThumbnail() {
    if (this.isUsingGameThumbnail) {
      this.setState({ icon: this.props.gameThumbnail });
    }
  }

  onClickPublish = () => {
    if (this.checkAllFieldValid()) {
      this.publish(() => {
        this.updateDevelopingProjectIcon();
        alert("퍼블리싱되었습니다 :)");
        this.props.setIsPublishOn(false);
      });
    }
  };
  async publish(onpublish) {
    const gameSrc = await generateBabylonPage({
      gameData: this.props.game,
      isBuilderPlay: false,
    });
    const url = await request
      .uploadPublished({ doc: gameSrc })
      .then((res) => res.json())
      .then((json) => json.url)
      .catch((err) => {
        console.error(err);
      });
    if (!url) return;

    const params = {
      pId: this.props.pId,
      email: this.props.email,
      name: this.state.name,
      description: this.state.description,
      icon: this.state.icon,
      isCopyAllowed: this.state.isCopyAllowed,
      tags: this.state.tags,
      url,
      category: "Game",
      copyStateFromDev: true,
      live: true,
    };

    request
      .postPublishedProject(params)
      .then((res) => res.json())
      .then((published) => {
        if (onpublish) {
          onpublish(published);
        }
      });
  }
  updateDevelopingProjectIcon() {
    const { icon } = this.state;
    const { pId, gameThumbnail } = this.props;
    const useCustomIcon = icon !== gameThumbnail;
    const params = { pId, icon, useCustomIcon };
    request.postDevelopingProject(params);
    this.isUsingGameThumbnail = !useCustomIcon;
  }
  checkAllFieldValid() {
    const isNameValid = this.checkNameValid();
    const isDescValid = this.checkDescriptionValid();
    return isNameValid && isDescValid;
  }
  checkNameValid() {
    const { name } = this.state;
    if (!name) {
      this.setState({ isWarningName: true });
      return false;
    }
    return true;
  }
  checkDescriptionValid() {
    const { description } = this.state;
    if (!description) {
      this.setState({ isWarningDescription: true });
      return false;
    }
    return true;
  }

  handleIconChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const data = new FormData();
    let compressed = await ImageCompressor(selectedFile);
    data.append("file", compressed);

    const icon = await request
      .upload(data)
      .then((res) => res.json())
      .then((json) => json.url)
      .catch((err) => {
        console.error(err);
      });

    if (icon) {
      this.setState({ icon });
    } else {
      this.setState({ icon: this.props.gameThumbnail });
    }
  };
  onClickIconChange = () => {
    const fileInput = document.getElementById("iconFileInput");
    if (fileInput) {
      fileInput.click();
    }
  };
  onClickIconDelete = () => {
    this.setState({ icon: this.props.gameThumbnail });
  };

  onClickTagAt = (index) => {
    this.deleteTagAt(index);
  };
  onClickTagInputEnter = (e) => {
    const tagInput = e.currentTarget;
    const tag = tagInput.value;
    this.addTag(tag);
    tagInput.value = "";
  };
  onClickTagInpuBackspace = (e) => {
    const tagInput = e.currentTarget;
    if (tagInput.value === "") {
      this.deleteTagAtLast();
    }
  };
  onClickPopularTag = (popularTag) => {
    this.addTag(popularTag);
  };
  addTag(_tag) {
    if (!_tag) return;

    let tag = _tag.trim().substring(0, 10);
    if (!tag) return;

    const { tags } = this.state;
    if (tags.indexOf(tag) >= 0) return;

    this.setState({ tags: [].concat(tags, tag) }, () => {
      console.log(111, tags, tag);
    });
  }
  deleteTagAt(index) {
    const tags = [...this.state.tags];
    tags.splice(index, 1);
    this.setState({ tags });
  }
  deleteTagAtLast() {
    const { tags } = this.state;
    if (tags.length > 0) {
      this.deleteTagAt(tags.length - 1);
    }
  }

  onChangeName = (e) => {
    this.setState({ name: e.currentTarget.value, isWarningName: false });
  };
  onChangeDescription = (e) => {
    this.setState({
      description: e.currentTarget.value,
      isWarningDescription: false,
    });
  };
  onChangeIsCopyAllowed = (e) => {
    this.setState((prevState) => ({ isCopyAllowed: !prevState.isCopyAllowed }));
  };

  onClickOverlay = () => {
    this.props.setIsPublishOn(false);
  };
  onClickClose = () => {
    this.props.setIsPublishOn(false);
  };

  render() {
    const { isPublishOn } = this.props;
    const isHidden = !isPublishOn;
    return (
      <View
        isHidden={isHidden}
        {...this.state}
        onClickOverlay={this.onClickOverlay}
        onClickClose={this.onClickClose}
        onClickPublish={this.onClickPublish}
        onChangeName={this.onChangeName}
        onChangeDescription={this.onChangeDescription}
        onChangeIsCopyAllowed={this.onChangeIsCopyAllowed}
        handleIconChange={this.handleIconChange}
        onClickIconChange={this.onClickIconChange}
        onClickIconDelete={this.onClickIconDelete}
        onClickTagAt={this.onClickTagAt}
        onClickTagInputEnter={this.onClickTagInputEnter}
        onClickTagInpuBackspace={this.onClickTagInpuBackspace}
        onClickPopularTag={this.onClickPopularTag}
      />
    );
  }
}

export default connect(
  (state) => {
    const { userinfo, project, builder, game } = state;
    const { email } = userinfo;
    const { pId, useCustomIcon } = project || {};
    const { isPublishOn } = builder;
    const gameThumbnail = game.thumbnail;
    return {
      email,
      pId,
      useCustomIcon,
      project,
      game,
      gameThumbnail,
      isPublishOn,
    };
  },
  { setIsPublishOn: builderAction.setIsPublishOn }
)(injectIntl(Container));
