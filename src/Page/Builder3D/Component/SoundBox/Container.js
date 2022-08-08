import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import AssetLibrary from "../../../Builder/utils/assetLibrary";
import * as interactionActions from "../../Store/Reducer/interaction";
import * as gameActions from "../../Store/Reducer/game";
import * as builderActions from "../../Store/Reducer/builder";
import RndWrapper from "../RndProvider/RndWrapper";
import View from "./View";

function Container(props) {
  const [currentCategory, setCurrentCategory] = useState("bgm");
  const [currentSubCategory, setCurrentSubCategory] = useState("bgm");
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const container = useRef();

  useEffect(() => {
    AssetLibrary.loadAllSounds(() => {
      let categories = AssetLibrary.categories.filter(
        c => c.name === "sfx" || c.name === "bgm"
      );
      setCategories(
        categories.map(category => {
          return {
            ...category,
            subCategories: [
              {
                name: category.name,
                localeName: JSON.stringify({
                  ko: "전체",
                  zh: "All",
                  ja: "すべて",
                  default: "All"
                })
              },
              ...category.subCategories
            ]
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    if (!props.isSoundBoxOn) {
      props.stopSound();
    }
  }, [props.isSoundBoxOn]);

  useEffect(() => {
    loadAssets(currentSubCategory);
  }, [currentSubCategory]);

  useEffect(() => {
    if (selectedAssetId === undefined && isPlaying()) {
      props.stopSound();
    }
  }, [selectedAssetId]);

  const isPlaying = () => {
    return props.jukebox.isPlaying;
  };

  const onClickClose = () => {
    props.setIsSoundBoxOn(false);
  };

  const setCurrentCategories = (category, subCategory) => {
    if (!subCategory) subCategory = category;
    if (currentSubCategory !== subCategory) {
      setAssets([]);
      setCurrentCategory(category);
      setCurrentSubCategory(subCategory);
    }
  };

  const loadAssets = (subCategory, callback) => {
    if (subCategory) {
      AssetLibrary.loadAssetsByCategory(subCategory, assets => {
        if (callback) {
          callback();
        } else {
          setAssets(assets);
        }
      });
    }
  };

  const handleSelectAsset = assetId => {
    if (assetId !== selectedAssetId) {
      setSelectedAssetId(assetId);
      const item = AssetLibrary.getSoundAsset(assetId);
      props.playSound(item.id, item.path, item.type);
    } else {
      setSelectedAssetId(undefined);
    }
  };

  const handleAddAsset = asset => {
    const { currentScene, soundIds, addSound } = props;
    if (soundIds.find(id => id === asset.assetId)) {
      return;
    }
    const { assetId, type, subtype } = asset;
    let soundInfo = getSoundInfo({ assetId, type, subtype });
    addSound(currentScene.id, soundInfo);
  };

  const handleRemoveAsset = assetId => {
    props.removeSound(props.currentScene.id, assetId);
  };

  const getSoundInfo = item => {
    const asset = AssetLibrary.getSoundAsset(item.assetId);
    const type = asset.type;
    const subtype = asset.subtype;
    const assetId = item.assetId;
    const name = asset.defaultName;
    return { name, assetId, type, subtype };
  };

  const getRndWrapperConfig = () => {
    const soundsList = document.getElementById("soundsList");
    const defaultWidth = 420;
    const defaultHeight = 420;
    const defaultX = soundsList ? soundsList.clientWidth + 12 : 36;
    const defaultY = soundsList ? soundsList.getBoundingClientRect().top : 36;
    const minWidth = 300;
    const minHeight = 300;
    const maxWidth = 600;
    const maxHeight = 600;
    return {
      defaultX,
      defaultY,
      defaultWidth,
      defaultHeight,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    };
  };

  return !props.isSoundBoxOn ? (
    <></>
  ) : (
    <RndWrapper
      rndId={props.rndId}
      rndOrder={props.rndOrder}
      bringRndToTop={props.bringRndToTop}
      {...getRndWrapperConfig()}
    >
      <View
        containerRef={container}
        categories={categories}
        soundIds={props.soundIds}
        currentCategory={currentCategory}
        currentSubCategory={currentSubCategory}
        assets={assets}
        selectedAssetId={selectedAssetId}
        assetLibrary={AssetLibrary}
        setCurrentCategories={setCurrentCategories}
        handleSelectAsset={handleSelectAsset}
        handleAddAsset={handleAddAsset}
        handleRemoveAsset={handleRemoveAsset}
        jukebox={props.jukebox}
        onClickClose={onClickClose}
      />
    </RndWrapper>
  );
}

export default connect(
  state => {
    const { isSoundBoxOn } = state.builder;
    const { scenes } = state.game;
    const { jukebox, currentSceneId } = state.interaction;
    const currentScene = currentSceneId ? scenes[currentSceneId] : null;
    let soundIds = currentScene ? currentScene.soundIds : [];
    soundIds = soundIds ? soundIds : [];
    return { isSoundBoxOn, jukebox, soundIds, currentScene };
  },
  {
    playSound: interactionActions.playSound,
    stopSound: interactionActions.stopSound,
    removeSound: gameActions.removeSound,
    addSound: gameActions.addSound,
    setIsSoundBoxOn: builderActions.setIsSoundBoxOn
  }
)(Container);
