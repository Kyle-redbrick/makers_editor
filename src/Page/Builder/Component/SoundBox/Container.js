import React, { Component } from "react";
import { connect } from "react-redux";
import AssetLibrary from "../../utils/assetLibrary";
import onClickOutside from "react-onclickoutside";
import * as interactionActions from "../../Store/Reducer/interaction";
import * as sceneActions from "../../Store/Reducer/scene";
import RndWrapper from "../../utils/RndWrapper";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: "bgm",
      currentSubCategory: "bgm",
      assets: [],
      selectedAssetId: undefined,
      categories: []
    };
  }

  componentDidMount() {
    AssetLibrary.loadAllSounds(() => {
      let categories = AssetLibrary.categories.filter(
        c => c.name === "sfx" || c.name === "bgm"
      );
      this.setState({
        categories: categories.map(category => {
          return {
            ...category,
            subCategories: [
              {
                name: category.name,
                localeName: JSON.stringify({
                  ko: "전체",
                  zh: "All",
                  default: "All"
                })
              },
              ...category.subCategories
            ]
          };
        })
      });
      this.loadAssets(this.state.currentSubCategory);
    });
  }

  componentWillUnmount() {
    this.props.stopSound();
  }

  handleClickOutside = () => {
    const { jukebox } = this.props;
    if (jukebox.isPlaying) {
      this.props.stopSound();
    }
  };

  setCurrentCategory = (category, subcate) => {
    if (!subcate) subcate = category;
    this.setState(
      { assets: [], currentCategory: category, currentSubCategory: subcate },
      () => {
        this.loadAssets(subcate);
      }
    );
  };

  loadAssets = (subcate, callback) => {
    if (subcate) {
      AssetLibrary.loadAssetsByCategory(subcate, assets => {
        if (callback) {
          callback();
        } else {
          this.setState({ assets });
        }
      });
    }
  };

  handleSelectAsset = assetId => {
    if (assetId !== this.state.selectedAssetId) {
      this.setState({ selectedAssetId: assetId });
      const item = AssetLibrary.getSoundAsset(assetId);
      this.props.playSound({
        id: item.id,
        path: item.path,
        type: item.type
      });
    } else {
      this.setState({ selectedAssetId: undefined }, this.props.stopSound);
    }
  };

  handleAddAsset = asset => {
    if (this.props.soundIds.find(id => id === asset.assetId)) {
      return;
    }
    const { assetId, type, subtype } = asset;
    let { spriteInfos } = this.reduceBasket([{ assetId, type, subtype }]);
    if (spriteInfos.length !== 0) {
      this.props.addSounds(spriteInfos);
    }
  };

  handleRemoveAsset = assetId => {
    this.props.removeSound(assetId);
  };

  setSpriteInfo = item => {
    const asset = AssetLibrary.getSoundAsset(item.assetId);
    const type = asset.type;
    const subtype = asset.subtype;
    const assetId = item.assetId;
    const name = asset.defaultName;
    return { name, assetId, type, subtype };
  };

  reduceBasket = assets => {
    return assets.reduce(
      (acc, cur) => {
        if (cur.subtype === "camera") {
          let checkCamera = false;
          for (var i = 0; i < this.props.spriteIds.length; i++) {
            if (
              this.props.sprites[this.props.spriteIds[i]].preview.subtype ===
              "camera"
            ) {
              checkCamera = true;
              break;
            }
          }
          if (!checkCamera) {
            acc.spriteInfos.push(this.setSpriteInfo(cur));
          }
        } else if (cur.subtype === "joystick") {
          acc.spriteInfos.push(this.setSpriteInfo(cur));
        } else {
          acc.spriteInfos.push(this.setSpriteInfo(cur));
        }

        return acc;
      },
      { spriteInfos: [], soundInfos: [] }
    );
  };

  render() {
    const {
      soundIds,
      jukebox,
      zIndex,
      isOn,
      handleSelectTab,
      handleChangeZIndex
    } = this.props;
    const {
      currentCategory,
      currentSubCategory,
      assets,
      selectedAssetId,
      categories
    } = this.state;
    const {
      setCurrentCategory,
      handleSelectAsset,
      handleAddAsset,
      handleRemoveAsset
    } = this;

    if (!isOn) {
      return <div />;
    }
    return (
      <RndWrapper
        id="soundBox"
        style={{ zIndex }}
        defaultWidth={384}
        defaultHeight={500}
        defaultX={200}
        defaultY={5}
        minWidth={300}
        minHeight={300}
      >
        <View
          categories={categories}
          soundIds={soundIds}
          currentCategory={currentCategory}
          currentSubCategory={currentSubCategory}
          assets={assets}
          selectedAssetId={selectedAssetId}
          handleSelectTab={handleSelectTab}
          setCurrentCategory={setCurrentCategory}
          handleSelectAsset={handleSelectAsset}
          handleAddAsset={handleAddAsset}
          handleRemoveAsset={handleRemoveAsset}
          jukebox={jukebox}
          handleChangeZIndex={handleChangeZIndex}
        />
      </RndWrapper>
    );
  }
}

export default connect(
  state => ({
    jukebox: state.interaction.jukebox,
    selectedSceneId: state.interaction.selected.scene,
    selectedObject:
      state.interaction.selected.objects[state.interaction.selected.scene],
    sprites: state.scene.scenes[state.interaction.selected.scene].sprites,
    soundIds: state.scene.soundIds
  }),
  {
    playSound: interactionActions.playSound,
    stopSound: interactionActions.stopSound,
    removeSound: sceneActions.removeSound,
    addSounds: sceneActions.addSounds
  }
)(onClickOutside(Container));
