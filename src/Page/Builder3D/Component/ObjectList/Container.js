import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import * as gameActions from "../../Store/Reducer/game";
import * as builderActions from "../../Store/Reducer/builder";
import * as interactionActions from "../../Store/Reducer/interaction";
import * as contextMenuActions from "../../Store/Reducer/contextMenu";
import { createDefaultGameObjId } from "../../Util/NameApis";
import View from "./View";

import codeEditorIcon from "../../../../Image/builder3d/icon-30-right-click-code-editor.svg";
import copyIcon from "../../../../Image/builder3d/icon-30-right-click-duplicate.svg";
import deleteIcon from "../../../../Image/builder3d/icon-30-right-click-delete.svg";
import lockIcon from "../../../../Image/builder3d/icon-30-right-click-lock.svg";
import unlockIcon from "../../../../Image/builder3d/icon-30-right-click-unlock.svg";

const { GAMEOBJECT, PROPERTY_ID } = window.BabylonConstant;

class Container extends Component {
  componentDidMount() {
    this.componentNode = ReactDOM.findDOMNode(this);
  }
  componentDidUpdate(prevProps) {
    // if (prevProps.currentObjectId !== this.props.currentObjectId) {
    setTimeout(() => {
      this.styleCurrentNode();
    }, 0.5);
    // }
  }
  onClickAddButton = () => {
    if (this.props.currentSceneId) {
      this.props.setIsObjectBoxOn(true);
    } else {
      alert("먼저 씬을 추가해 주세요.");
    }
  };

  onMoveNode = event => {
    this.updateGameObjectParent(event);
    this.reorderGameObjects(event);
  };
  updateGameObjectParent(event) {
    const { node, nextParentNode } = event;
    const { currentSceneId, updateGameObjectProperty } = this.props;
    const gameObjId = node.id;
    const nextParentId = nextParentNode ? nextParentNode.id : null;
    updateGameObjectProperty(
      currentSceneId,
      gameObjId,
      PROPERTY_ID.PARENT_ID,
      nextParentId
    );
  }
  onToggleGameObject = (nodeData, e) => {
    const expanded = !nodeData.node.expanded;
    const { currentSceneId, updateGameObjectProperty } = this.props;
    const gameObjId = nodeData.node.id;

    updateGameObjectProperty(currentSceneId, gameObjId, "expanded", expanded);
  };
  reorderGameObjects(event) {
    const { treeData } = event;
    const { currentSceneId, reorderGameObjects } = this.props;
    const reorderedGameObjIds = [];
    this.traverse(treeData, node => {
      reorderedGameObjIds.push(node.id);
    });
    reorderGameObjects(currentSceneId, reorderedGameObjIds);
  }

  styleCurrentNode() {
    if (this.componentNode instanceof HTMLElement) {
      const selected = this.componentNode.querySelector(
        ".objectList_item-current"
      );
      if (!selected) return;
      const prevSelected = this.componentNode.querySelector(".current");
      if (prevSelected) {
        prevSelected.classList.remove("current");
      }
      selected.parentNode.parentNode.parentNode.parentNode.classList.add(
        "current"
      );
    }
  }

  onClickNode = nodeData => {
    const { selectGameObject, currentSceneId } = this.props;
    const node = nodeData.node;
    const gameObjId = node.id;
    selectGameObject(currentSceneId, gameObjId);
    setTimeout(() => {
      this.styleCurrentNode();
    }, 0.05);
  };
  onDoubleClickNode = nodeData => {
    const {
      babylonPreview,
      selectGameObject,
      currentSceneId,
      currentObjectId
    } = this.props;
    const node = nodeData.node;
    const gameObjId = node.id;
    if (gameObjId !== currentObjectId) {
      selectGameObject(currentSceneId, gameObjId);
    }
    const currentBabylonScene = babylonPreview.currentScene;
    if (currentBabylonScene) {
      currentBabylonScene.setEditorCameraFocus(gameObjId);
    }
  };

  onRightClickNode = (nodeData, e) => {
    const { currentSceneId, currentObjectId, selectGameObject } = this.props;
    const node = nodeData.node;
    const gameObjId = node.id;
    const position = { x: e.clientX, y: e.clientY };
    if (gameObjId !== currentObjectId) {
      selectGameObject(currentSceneId, gameObjId);
    }
    this.showContextMenuFor(nodeData, position);
  };
  showContextMenuFor(nodeData, position) {
    const menus = this.getContextMenuFor(nodeData);
    this.props.showContextMenu(menus, position);
  }
  getContextMenuFor(nodeData) {
    const { currentScene } = this.props;
    const node = nodeData.node;
    const gameObjId = node.id;
    const gameObj = currentScene.gameObjects[gameObjId];
    const menus = [
      {
        img: codeEditorIcon,
        name: "코드 에디터",
        onClick: () => this.onClickCode(nodeData)
      },
      {
        img: copyIcon,
        name: "복제",
        onClick: this.onClickCopy
      }
    ];
    if (!gameObj.isLocked) {
      menus.push({
        img: deleteIcon,
        name: "삭제",
        onClick: () => this.onClickRemove(nodeData)
      });
    }
    if (gameObj.isLocked) {
      menus.push({
        img: unlockIcon,
        name: "잠금 해제",
        onClick: () => this.onClickLock(nodeData)
      });
    } else {
      menus.push({
        img: lockIcon,
        name: "잠금",
        onClick: () => this.onClickLock(nodeData)
      });
    }

    return menus;
  }
  onClickCode = nodeData => {
    const {
      currentSceneId,
      currentObjectId,
      selectGameObject,
      setIsEditorOn
    } = this.props;
    const node = nodeData.node;
    const gameObjId = node.id;
    if (gameObjId !== currentObjectId) {
      selectGameObject(currentSceneId, gameObjId);
    }
    setIsEditorOn(true);
  };

  onClickCopy = () => {
    const {
      currentSceneId,
      currentGameObjects,
      currentGameObject,
      addGameObject
    } = this.props;

    const copiedGameObjAndChildren = this.getCopiedGameObjectAndChildren(
      currentGameObject,
      currentGameObjects
    );

    const copiedGameObj = copiedGameObjAndChildren[0];
    this.transformGameObjectLittle(copiedGameObj);

    copiedGameObjAndChildren.forEach(gameObj => {
      addGameObject(currentSceneId, gameObj);
    });
  };
  getCopiedGameObjectAndChildren(gameObj, gameObjs) {
    const copiedGameObjAndChildren = [];

    const gameObjIds = Object.keys(gameObjs).map(
      gameObjId => gameObjs[gameObjId].id
    );

    const traverse = (gameObj, parentGameObj, gameObjs) => {
      const copiedGameObj = JSON.parse(JSON.stringify(gameObj));
      const copiedGameObjId = createDefaultGameObjId(
        gameObjIds,
        copiedGameObj.type
      );
      copiedGameObj.id = copiedGameObjId;
      copiedGameObjAndChildren.push(copiedGameObj);

      gameObjIds.push(copiedGameObjId);

      if (parentGameObj) {
        copiedGameObj.parentId = parentGameObj.id;
      }

      for (let i in gameObjs) {
        if (gameObjs[i].parentId === gameObj.id) {
          traverse(gameObjs[i], copiedGameObj, gameObjs);
        }
      }
    };

    traverse(gameObj, null, gameObjs);
    return copiedGameObjAndChildren;
  }

  transformGameObjectLittle(gameObject) {
    if (gameObject.position) {
      if (!isNaN(gameObject.position.x)) {
        gameObject.position.x += 0.1;
      }
      if (!isNaN(gameObject.position.y)) {
        gameObject.position.y += 0.1;
      }
      if (!isNaN(gameObject.position.z)) {
        gameObject.position.z += 0.1;
      }
    }
  }

  onClickRemove = nodeData => {
    const gameObjIdsToRemove = [];
    this.traverse(nodeData.node, node => {
      gameObjIdsToRemove.push(node.id);
    });

    const { currentSceneId, removeGameObjects, selectGameObject } = this.props;
    selectGameObject(currentSceneId, null);
    removeGameObjects(currentSceneId, gameObjIdsToRemove);
  };

  onChangePlainProperty(propertyId, value) {
    const {
      currentSceneId,
      currentGameObject,
      updateGameObjectProperty
    } = this.props;
    updateGameObjectProperty(
      currentSceneId,
      currentGameObject.id,
      propertyId,
      value
    );
  }

  onClickLock = () => {
    const { currentGameObject } = this.props;
    const isLocked = !currentGameObject.isLocked;
    this.onChangePlainProperty(PROPERTY_ID.LOCK, isLocked);
  };

  getTree() {
    const tree = [];

    const gameObjects = this.props.currentObjects;
    if (!gameObjects) {
      return tree;
    }

    const getParent = (tree, parentId) => {
      for (let i in tree) {
        const node = tree[i];
        if (node.id === parentId) {
          return node;
        } else {
          const parent = getParent(node.children, parentId);
          if (parent) {
            return parent;
          }
        }
      }
    };

    const { gameObjectIds } = this.props;
    for (let i in gameObjectIds) {
      const gameObjectId = gameObjectIds[i];
      const gameObject = gameObjects[gameObjectId];
      const node = this.convertToNode(gameObject);
      if (gameObject.parentId) {
        const parent = getParent(tree, gameObject.parentId);
        if (parent) {
          parent.children.push(node);
        }
      } else {
        tree.push(node);
      }
    }

    return tree;
  }
  convertToNode(gameObj) {
    return {
      id: gameObj.id,
      title: this.getNodeTitleFor(gameObj),
      children: [],
      expanded: gameObj.expanded,
      current: gameObj.id === this.props.currentObjectId
    };
  }
  getNodeTitleFor(gameObj) {
    switch (gameObj.type) {
      case GAMEOBJECT.CAMERA:
        return gameObj.name + (gameObj.isActiveCamera ? " (시작 카메라)" : "");
      default:
        return gameObj.name;
    }
  }
  traverse = (node, func) => {
    if (!node) {
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(_node => {
        this.traverse(_node, func);
      });
    } else {
      if (func) {
        func(node);
      }
      this.traverse(node.children, func);
    }
  };

  render() {
    if (this.props.isSoundsShowing) {
      return <></>;
    }
    const { currentGameObjects } = this.props;
    return (
      <View
        onClickAddButton={this.onClickAddButton}
        onMoveNode={this.onMoveNode}
        onClickNode={this.onClickNode}
        onDoubleClickNode={this.onDoubleClickNode}
        onRightClickNode={this.onRightClickNode}
        treeData={this.getTree()}
        onToggleGameObject={this.onToggleGameObject}
        onClickCode={this.onClickCode}
        onClickLock={this.onClickLock}
        gameObjects={currentGameObjects}
      />
    );
  }
}

export default connect(
  state => {
    const { babylonPreview, isSoundsShowing } = state.builder;
    const { scenes } = state.game;
    const { currentSceneId, currentGameObjectIds } = state.interaction;
    const currentScene = scenes[currentSceneId];
    const currentObjectId = currentGameObjectIds[currentSceneId];
    const gameObjectIds = currentScene ? currentScene.gameObjectIds : null;
    const currentGameObjects = currentScene ? currentScene.gameObjects : {};
    const currentObjects = currentScene ? currentScene.gameObjects : null;
    const currentGameObjectId =
      state.interaction.currentGameObjectIds[currentSceneId];
    const currentGameObject =
      currentScene && currentScene.gameObjects[currentGameObjectId];
    return {
      babylonPreview,
      isSoundsShowing,
      scenes,
      currentObjects,
      currentSceneId,
      currentScene,
      currentObjectId,
      gameObjectIds,
      currentGameObject,
      currentGameObjects
    };
  },
  {
    selectGameObject: interactionActions.selectGameObject,
    addGameObject: gameActions.addGameObject,
    removeGameObjects: gameActions.removeGameObjects,
    reorderGameObjects: gameActions.reorderGameObjects,
    updateGameObjectProperty: gameActions.updateGameObjectProperty,
    setIsEditorOn: builderActions.setIsEditorOn,
    setShowSounds: builderActions.setShowSounds,
    setIsObjectBoxOn: builderActions.setIsObjectBoxOn,
    showContextMenu: contextMenuActions.showContextMenu
  }
)(Container);
