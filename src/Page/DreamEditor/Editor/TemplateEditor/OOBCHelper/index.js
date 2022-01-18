import React, { Component } from "react";
import { connect } from "react-redux";
import OOBCEditor from "../../../../Builder/Component/Editor/Component/OOBCEditorWrapper"
import Field from "../../Field";
import "./index.scss";

class OOBCHelper extends Component {
  constructor(props) {
    super(props);
    this.state = { isHidden: true };
  }

  onClickToggle = () => {
    this.setState(prev => ({ isHidden: !prev.isHidden }));
  }

  render() {
    return (
      <Field.Base {...this.props} type="oobc" >
        <div className="oobchelper">
          <div className="oobchelper_toggle" onClick={this.onClickToggle}>
            {this.state.isHidden ? "보이기" : "감추기"}
          </div>
         {this.state.isHidden || 
            <div className="oobchelper_context_body">
              <div className="oobchelper_context">
                {this.props.currentSprite && this.props.currentSprite.code}
              </div>
              <div className="oobchelper_editor">
                <OOBCEditor />
              </div>
            </div>
          }
        </div>
      </Field.Base>
    );
  }
}

export default connect(state => {
  const currentSceneId = state.interaction.selected.scene;
  const currnetSceneObjectsInfo = state.interaction.selected.objects[currentSceneId];
  const currentSpriteId = currnetSceneObjectsInfo && currnetSceneObjectsInfo.name;
  const currentScene = state.scene.scenes[currentSceneId];
  const currentSprite = currentScene && currentScene.sprites[currentSpriteId];
  return { currentSprite };
})(OOBCHelper);
