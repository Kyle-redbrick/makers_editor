import React, { Component } from "react";
import {
  Editor,
  EditorState,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import { ImageCompressor } from "../../Util/FileCompressor";
import * as request from "../../Util/HTTPRequest";
import { showPopUp } from "../PopUp";
import CustomBlockRenderer from "./CustomBlockRenderer";
import GamePopUp from "./GamePopUp";
import "./index.scss";

class DraftEditor extends Component {
  constructor(props) {
    super(props);
    this.editorId = this.randomString();
    this.state = {
      editorState: EditorState.createEmpty(),
      aceFouced: false
    };
  }

  // draft
  setEditorRef = editor => {
    this.editor = editor;
  };
  focusEditor = () => {
    if (this.editor) this.editor.focus();
  };
  setContents = contents => {
    try {
      const { onChangeMedia, onChangeAceFouced } = this;
      const { readonly = false } = this.props;
      for (let key in contents.entityMap) {
        const entity = contents.entityMap[key];
        entity.data["readonly"] = readonly;
        entity.data["onChangeMedia"] = onChangeMedia;
        entity.data["onChangeAceFouced"] = onChangeAceFouced;
      }
      const contentState = convertFromRaw(contents);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    } catch (err) {
      console.warn(err);
    }
  };
  getContents = () => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const rawContent = JSON.parse(JSON.stringify(convertToRaw(contentState)));

    // remove empty end blocks
    let i = rawContent.blocks.length;
    while (i--) {
      const block = rawContent.blocks[i];
      if (block.type !== "atomic" && block.text.replace(/\s/g, "").length < 1) {
        rawContent.blocks.splice(i, 1);
      } else {
        break;
      }
    }

    // check contents text is valid
    let hasValidText = false;
    for (let i = 0; i < rawContent.blocks.length; i++) {
      const block = rawContent.blocks[i];
      if (block.type === "atomic" || block.text.replace(/\s/g, "").length > 0) {
        hasValidText = true;
        break;
      }
    }
    if (!hasValidText) {
      return null;
    }

    // remove datas for rendering
    for (let key in rawContent.entityMap) {
      const entity = rawContent.entityMap[key];
      delete entity.data["readonly"];
      delete entity.data["onChangeMedia"];
      delete entity.data["onChangeAceFouced"];
    }

    return rawContent;
  };
  getText = () => {
    const { blocks } = this.getContents();
    return blocks.reduce(
      (prev, block) => prev + " " + (block.type !== "atomic" ? block.text : ""),
      ""
    );
  };
  emptyContents = () => {
    const { readonly = false, onChangeContents } = this.props;
    if (readonly) return;
    onChangeContents(null);
    this.setState({ editorState: EditorState.createEmpty() });
  };
  onChangeEditorState = editorState => {
    const { readonly = false, onChangeContents } = this.props;
    if (readonly) return;
    this.setState({ editorState }, () => {
      if (!onChangeContents) return;
      onChangeContents(this.getContents());
    });
  };

  // media component
  onChangeMedia = () => {
    this.onChangeEditorState(this.state.editorState);
  };
  onChangeAceFouced = aceFouced => {
    this.setState({ aceFouced });
  };

  // media add
  addMedia = (type, data) => {
    const { onChangeMedia, onChangeAceFouced } = this;
    const { readonly = false } = this.props;
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithNewEntity = contentState.createEntity(
      type,
      "IMMUTABLE",
      { ...data, readonly, onChangeMedia, onChangeAceFouced }
    );
    const entityKey = contentStateWithNewEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      EditorState.set(editorState, {
        currentContent: contentStateWithNewEntity
      }),
      entityKey,
      " "
    );
    this.setState({ editorState: newEditorState }, () => {
      this.onChangeEditorState(newEditorState);
    });
  };
  handleFileInput = async e => {
    const { files } = e.target;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const types = file.type.split("/");
      const media = types[0];
      //   const ext = types[1];
      switch (media) {
        case "image":
          const data = new FormData();
          const compressed = await ImageCompressor(file);
          data.append("file", compressed);
          const json = await request.upload(data).then(res => res.json());
          this.addMedia("image", { src: json.url });
          break;
        // case "video":
        //   break;
        default:
          break;
      }
    }
  };
  onClickFile = () => {
    const fileInput = document.getElementById(
      `draftEditor_fileInput-${this.editorId}`
    );
    if (fileInput) fileInput.click();
  };
  onClickCode = () => {
    this.addMedia("code", { code: "" });
  };
  onClickGame = () => {
    showPopUp(
      <GamePopUp
        onChangeGame={pId => {
          this.addMedia("game", { pId });
        }}
      />,
      { darkmode: true }
    );
  };

  // util
  randomString() {
    const charSet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < 6; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }

  render() {
    const { readonly = false, placeholder = "내용을 입력하세요" } = this.props;
    const { editorState, aceFouced } = this.state;
    const {
      editorId,
      setEditorRef,
      onChangeEditorState,
      handleFileInput
    } = this;
    return (
      <div className="draftEditor">
        <Editor
          ref={setEditorRef}
          editorState={editorState}
          onChange={onChangeEditorState}
          blockRendererFn={CustomBlockRenderer}
          placeholder={readonly ? "" : placeholder}
          readOnly={readonly || aceFouced}
        />
        <input
          id={`draftEditor_fileInput-${editorId}`}
          type="file"
          // accept=".jpg,.jpeg,.png,.mp4,.wmv"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileInput}
          multiple
          hidden
        />
      </div>
    );
  }
}

export default DraftEditor;
