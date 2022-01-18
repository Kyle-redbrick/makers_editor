import React, { Component } from "react";
import * as request from "../../Util/HTTPRequest";
import { EDITORMODE } from "../../Util/Constant";
import { showPopUp } from "../PopUp";
import GamePopUp from "./GamePopUp";
import "./index.scss";

class MediaComponent extends Component {
  constructor(props) {
    super(props);
    const { block, contentState } = this.props;
    const entityKey = block.getEntityAt(0);
    const entity = contentState.getEntity(entityKey);
    const data = entity.getData();

    this.key = block.getKey();
    this.type = entity.getType();
    this.readonly = data.readonly;
    this.onChangeMedia = data.onChangeMedia;
    this.onChangeAceFouced = data.onChangeAceFouced;

    this.state = { data };
  }
  componentDidMount() {
    const { type } = this;
    switch (type) {
      case "code":
        this.setAceEditor();
        break;
      case "game":
        this.getGame();
        break;
      default:
        break;
    }
  }

  // code
  setAceEditor = () => {
    const { key, readonly } = this;
    const { data } = this.state;
    const editor = window.ace.edit(`ace-editor-${key}`, {
      maxLines: 50,
      minLines: 5,
      wrap: true,
      autoScrollEditorIntoView: true
    });
    editor.session.setMode(`ace/mode/${EDITORMODE.JAVASCRIPT}`);
    editor.setTheme("ace/theme/wizschool-light");
    editor.setReadOnly(readonly);
    editor.setValue(data.code, 1);
    editor.on("blur", this.onEditorBlur);
    editor.on("focus", this.onEditorFocus);
    editor.on("change", this.onEditorChange);
  };
  onEditorBlur = () => {
    this.onChangeAceFouced(false);
  };
  onEditorFocus = () => {
    this.onChangeAceFouced(true);
  };
  onEditorChange = (event, editor) => {
    const { readonly, onChangeMedia, onChangeAceFouced } = this;
    const code = editor.getValue();
    const { block, contentState } = this.props;
    const entityKey = block.getEntityAt(0);
    contentState.replaceEntityData(entityKey, {
      code,
      readonly,
      onChangeMedia,
      onChangeAceFouced
    });
    onChangeMedia();
  };

  // game
  getGame = () => {
    const { data } = this.state;
    request
      .getPublishedProject({ pId: data.pId })
      .then(res => res.json())
      .then(game => {
        this.setState({ game });
      });
  };

  onClickMedia = () => {
    const { type, readonly, onChangeMedia } = this;
    const { data } = this.state;
    switch (type) {
      case "game":
        if (readonly) {
          window.open(`${window.location.origin}?pId=${data.pId}`, "_blank");
        } else {
          showPopUp(
            <GamePopUp
              onChangeGame={pId => {
                const { block, contentState } = this.props;
                const entityKey = block.getEntityAt(0);
                contentState.replaceEntityData(entityKey, {
                  pId,
                  readonly,
                  onChangeMedia
                });
                this.setState(
                  prevState => ({
                    data: { ...prevState.data, pId }
                  }),
                  () => {
                    onChangeMedia();
                    this.getGame();
                  }
                );
              }}
            />,
            { darkmode: true }
          );
        }
        break;
      default:
        break;
    }
  };

  render() {
    const { key, type } = this;
    const { data, game } = this.state;
    let content;
    switch (type) {
      case "image":
        content = <img className="draftmedia_image" src={data.src} alt={key} />;
        break;
      case "code":
        content = <div id={`ace-editor-${key}`} className="draftmedia_code" />;
        break;
      case "game":
        if (game) {
          content = (
            <div className="draftmedia_game">
              <img
                className="draftmedia_game_image"
                src={game.icon}
                alt={game.name}
              />
              <section className="draftmedia_game_section">
                <div className="draftmedia_game_title">{game.name}</div>
                <div className="draftmedia_game_desc">
                  {game.description.length > 78
                    ? game.description.slice(0, 78) + "..."
                    : game.description}
                </div>
                <div className="draftmedia_game_user">
                  <img
                    className="draftmedia_game_user_image"
                    src={game.user.icon}
                    alt={game.user.name}
                  />
                  <div className="draftmedia_game_user_name">
                    {game.user.name}
                  </div>
                </div>
              </section>
            </div>
          );
        }
        break;
      default:
        break;
    }
    return (
      <div className="draftmedia" onClick={this.onClickMedia}>
        {content}
      </div>
    );
  }
}

const CustomBlockRenderer = contentBlock => {
  const type = contentBlock.getType();
  switch (type) {
    case "atomic":
      if (isValidAtomicBlock(contentBlock)) {
        return {
          component: MediaComponent,
          editable: false
        };
      }
      break;
    default:
      // console.warn("unhandled content block type", type);
      return;
  }
};

function isValidAtomicBlock(block) {
  const entityKey = block.getEntityAt(0);
  return !!entityKey;
}

export default CustomBlockRenderer;
