import React, { Component } from "react";
import { connect } from "react-redux";
import onClickOutside from "react-onclickoutside";
import * as interactionActions from "../../Store/Reducer/interaction";
import * as sceneActions from "../../Store/Reducer/scene";
import AssetLibrary from "../../utils/assetLibrary";
import { injectIntl } from "react-intl";
import View from "./View";
import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemId: null
    };
  }

  handleClickOutside = () => {
    const { jukebox } = this.props;
    if (jukebox.isPlaying) {
      this.props.stopSound();
      this.setState({
        selectedItemId: undefined
      });
    }
  };

  handleItemSelect = id => {
    if (this.state.selectedItemId === id) {
      const { jukebox } = this.props;
      if (jukebox.isPlaying) {
        this.props.stopSound();
      } else {
        this.setState({
          selectedItemId: undefined
        });
        // const item = AssetLibrary.getSoundAsset(id);
        // this.props.playSound({
        //   id: item.id,
        //   path: item.path,
        //   type: item.type
        // });
      }
    } else {
      TrackingUtil.sendGAEvent({
        category: "Builder",
        action: `ClickSprite`,
        label: "Sound"
      });
      this.setState(
        {
          selectedItemId: id
        },
        () => {
          const item = AssetLibrary.getSoundAsset(id);
          this.props.playSound({
            id: item.id,
            path: item.path,
            type: item.type
          });
        }
      );
    }
  };

  handleItemRemove = id => {
    if (this.state.selectedItemId === id) {
      this.props.stopSound();
      this.setState({ selectedItemId: undefined });
    }
    this.props.removeSound(id);
  };

  handleOpenSoundPopup = () => {
    this.props.stopSound();
    this.setState({ selectedItemId: undefined });
    this.props.handleSelectTab("soundBox");
  };

  render() {
    const { soundIds, jukebox, intl } = this.props;
    const { selectedItemId } = this.state;
    const { handleOpenSoundPopup, handleItemSelect, handleItemRemove } = this;

    return (
      <View
        soundIds={soundIds}
        handleOpenSoundPopup={handleOpenSoundPopup}
        selectedItemId={selectedItemId}
        handleItemSelect={handleItemSelect}
        handleItemRemove={handleItemRemove}
        jukebox={jukebox}
        intl={intl}
      />
    );
  }
}

export default connect(
  state => ({
    jukebox: state.interaction.jukebox,
    selectedObject:
      state.interaction.selected.objects[state.interaction.selected.scene],
    sprites: state.scene.scenes[state.interaction.selected.scene].sprites,
    soundIds: state.scene.soundIds
  }),
  {
    playSound: interactionActions.playSound,
    stopSound: interactionActions.stopSound,
    removeSound: sceneActions.removeSound
  }
)(injectIntl(onClickOutside(Container)));
