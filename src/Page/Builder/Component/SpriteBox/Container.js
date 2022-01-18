import React, { Component } from "react";
import { connect } from "react-redux";
import * as sceneActions from "../../Store/Reducer/scene";
import * as webrtcActions from "../../Store/Reducer/webrtc";
import AssetLibrary from "../../utils/assetLibrary";
import ComponentTemplate from "../../utils/ComponentTemplate";
import DrawingEditor from "./Component/DrawingEditor";
import TextEditor from "./Component/TextEditor";
import { showPopUp } from "../../../../Common/Component/PopUp";
import store from "../../Store";
import RndWrapper from "../../utils/RndWrapper";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategoryLoaded: false,
      currentCategory: undefined,
      currentSubCategory: undefined,
      assets: [],
      selectedAssetId: undefined,
      inputValue: "",
      hoverAsset: false,
      checkTime: 0,
      timeFunction: null
    };
  }

  componentDidMount() {
    // this.setDefaultLayout();
    AssetLibrary.loadCategories(() => {
      this.setState(
        {
          isCategoryLoaded: true,
          currentCategory: AssetLibrary.categories[0].name,
          currentSubCategory: AssetLibrary.categories[0].name
        },
        () => {
          this.loadAssets(this.state.currentSubCategory);
        }
      );
    });
  }

  setDefaultLayout = () => {
    // const width = 500;
    // const height = 450;
    // const minWidth = width;
    // const minHeight = height;
    // const x = document.body.clientWidth - width - 300;
    // const y = document.body.clientHeight - height - height;
    // this.setState({ width, height, minHeight, minWidth, x, y });
  };

  setCurrentCategory = (category, subcate) => {
    if (!subcate) subcate = category;
    this.props.setLog({
      selectedSprite:
        category === subcate ? `${category}(전체)` : `${category}(${subcate})`
    });
    this.setState(
      { assets: [], currentCategory: category, currentSubCategory: subcate },
      () => {
        this.loadAssets(subcate);
      }
    );
  };

  loadAssets = subcate => {
    if (subcate) {
      AssetLibrary.loadAssetsByCategory(subcate, assets => {
        this.setState({ assets });
      });
    }
  };

  countUpSameName = (defaultName, nameArray) => {
    let max = nameArray.reduce((max, id) => {
      let name = id.replace(/\(\d+\)$/, "");
      let num;
      if (defaultName === name) {
        num = id.replace(defaultName, "").replace(/\(|\)/g, "");
        num = !!num ? Number(num) : 1;
        return Math.max(max, num);
      } else {
        return max;
      }
    }, 0);
    if (max > 0) {
      return `${defaultName}(${max + 1})`;
    } else {
      return defaultName;
    }
  };

  setSpriteInfo = item => {
    const type = AssetLibrary.getAsset(item.assetId).type;
    const assetId = item.assetId;
    const asset = AssetLibrary.getAsset(assetId);
    const defaultName = asset.defaultName;
    const name = defaultName;
    const subtype = AssetLibrary.getAsset(item.assetId).subtype;

    /** templateCode depend on asset.subtype */
    // 스프라이트 박스의 컴포넌트 탭의
    // 스프라이트들의 subtype에 의존해서 템플릿 코드를 넣어주고 있다.
    let templateCode;
    if (asset.type === "component") {
      templateCode = ComponentTemplate[asset.subtype];
    }
    const code = templateCode ? templateCode : "";
    return { name, assetId, type, code, subtype };
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

  checkSameNames = infos => {
    const makeDefaultName = assetId => assetId.replace(/_v\d+$/, "");
    const newSpriteIds = [...this.props.spriteIds];
    return infos.map(info => {
      const defaultName = makeDefaultName(info.assetId);
      const name = this.countUpSameName(defaultName, newSpriteIds);
      newSpriteIds.push(name);
      info.name = name;
      return info;
    });
  };

  handleSelectAsset = assetId => {
    this.setState({ selectedAssetId: assetId });
  };

  handleAddAsset = asset => {
    this.setState({ selectedAssetId: undefined }, () => {
      const { selectedSceneId } = this.props;
      const { assetId, type, subtype, spriteAnimations } = asset;
      let { spriteInfos } = this.reduceBasket([
        { assetId, type, subtype, spriteAnimations }
      ]);
      if (spriteInfos.length !== 0) {
        spriteInfos = this.checkSameNames(spriteInfos);
        this.props.addSprites(selectedSceneId, spriteInfos);
      }
    });
  };

  handleOpenDrawing = () => {
    showPopUp(
      <DrawingEditor
        AssetLibrary={AssetLibrary}
        countUpSameName={this.countUpSameName}
      />,
      {
        store,
        defaultPadding: false,
        dismissOverlay: false,
        dismissButton: false
      }
    );
  };

  handleOpenTextbox = () => {
    showPopUp(<TextEditor countUpSameName={this.countUpSameName} />, {
      store,
      defaultPadding: false
    });
  };

  countUpSameName = (defaultName, nameArray) => {
    let max = nameArray.reduce((max, id) => {
      let name = id.replace(/\(\d+\)$/, "");
      let num;
      if (defaultName === name) {
        num = id.replace(defaultName, "").replace(/\(|\)/g, "");
        num = !!num ? Number(num) : 1;
        return Math.max(max, num);
      } else {
        return max;
      }
    }, 0);
    if (max > 0) {
      return `${defaultName}(${max + 1})`;
    } else {
      return defaultName;
    }
  };

  handleOnChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleShowAnimation = (e, asset) => {
    let xPosition = e.clientX;
    let yPosition = e.clientY;

    this.setState({
      timeFunction: setInterval(() => {
        this.setState({ checkTime: this.state.checkTime + 1 });

        if (this.state.checkTime > 2)
          return clearInterval(this.state.timeFunction);

        if (this.state.checkTime === 2) {
          this.setState({
            hoverAsset: asset.spriteAnimations ? asset : false
          });
          if (document.querySelector(".SpriteBox_Animation")) {
            document.querySelector(".SpriteBox_Animation").style.left =
              xPosition - 320 + "px";
            document.querySelector(".SpriteBox_Animation").style.top =
              yPosition - 150 + "px";
          }
        }
      }, 1000)
    });
  };

  handleHideAnimation = () => {
    clearInterval(this.state.timeFunction);
    this.setState({
      checkTime: 0
      // hoverAsset: null
    });
  };

  handleAnimationHide = () => {
    this.setState({
      hoverAsset: null
    });
  };

  render() {
    const {
      isCategoryLoaded,
      currentCategory,
      currentSubCategory,
      assets,
      selectedAssetId,
      inputValue,
      hoverAsset
    } = this.state;
    const {
      setCurrentCategory,
      handleSelectAsset,
      handleAddAsset,
      handleOpenDrawing,
      handleOpenTextbox,
      handleOnChange,
      handleShowAnimation,
      handleHideAnimation,
      handleAnimationHide
    } = this;
    const {
      handleSelectTab,
      handleChangeZIndex,
      zIndex,
      isOn,
      email
    } = this.props;

    if (!isCategoryLoaded || !isOn) {
      return <div />;
    }
    const filteredAssets = assets.filter(asset => {
      return AssetLibrary.getAsset(asset.assetId).defaultName.includes(
        inputValue
      );
    });
    return (
      <RndWrapper
        id="spriteBox"
        style={{ zIndex }}
        defaultWidth={600}
        defaultHeight={450}
        defaultX={180}
        defaultY={document.body.clientHeight - 550}
        minWidth={380}
        minHeight={260}
      >
        <View
          currentCategory={currentCategory}
          currentSubCategory={currentSubCategory}
          assets={filteredAssets}
          setCurrentCategory={setCurrentCategory}
          selectedAssetId={selectedAssetId}
          handleSelectAsset={handleSelectAsset}
          handleAddAsset={handleAddAsset}
          handleOpenDrawing={handleOpenDrawing}
          handleOpenTextbox={handleOpenTextbox}
          handleSelectTab={handleSelectTab}
          handleChangeZIndex={handleChangeZIndex}
          inputValue={inputValue}
          handleOnChange={handleOnChange}
          email={email}
          handleShowAnimation={handleShowAnimation}
          handleHideAnimation={handleHideAnimation}
          handleAnimationHide={handleAnimationHide}
          hoverAsset={hoverAsset}
        />
      </RndWrapper>
    );
  }
}

export default connect(
  state => ({
    email: state.userinfo.email,
    selectedSceneId: state.interaction.selected.scene,
    spriteIds: state.scene.scenes[state.interaction.selected.scene].spriteIds,
    sprites: state.scene.scenes[state.interaction.selected.scene].sprites
  }),
  {
    addSprites: sceneActions.addSprites,
    setLog: webrtcActions.setLog
  }
)(Container);
