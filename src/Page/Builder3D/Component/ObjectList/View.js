import React from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import "./index.scss";

import addObjectIcon from "../../../../Image/builder3d/add-sound-asset.svg";

function View(props) {
  const {
    onClickAddButton,
    onMoveNode,
    onClickNode,
    onDoubleClickNode,
    onRightClickNode,
    treeData,
    onToggleGameObject,
    onClickCode,
    // onClickLock,
    gameObjects
  } = props;

  return (
    <div id="objectList" className="objectList">
      <div className="objectList_header">
        <div className="objectList_title">Object List</div>
      </div>
      <div className="objectList_graph">
        <SortableTree
          rowHeight={28}
          treeData={treeData}
          theme={FileExplorerTheme}
          onChange={() => {
            // Required. Handle this on onMoveNode instead.
          }}
          onMoveNode={onMoveNode}
          getNodeKey={({ node }) => node.id}
          generateNodeProps={data => {
            return {
              onClick: e => {
                if (e.target.className.includes("deleteBtn")) {
                  // Ignore
                } else if (
                  e.target.className.includes("expandButton") ||
                  e.target.className.includes("collapseButton")
                ) {
                  onToggleGameObject(data, e);
                } else {
                  onClickNode(data);
                }
              },
              onDoubleClick: e => {
                if (
                  e.target.className.includes("collapseButton") ||
                  e.target.className.includes("expandButton") ||
                  e.target.className.includes("deleteBtn")
                ) {
                  // Ignore
                } else {
                  onDoubleClickNode(data);
                }
              },
              onContextMenu: e => {
                e.preventDefault();
                onRightClickNode(data, e);
              },
              icons: [
                <div
                  className={`object_code-editor-icon ${data.node.id.replace(
                    /[0-9]/g,
                    ""
                  )}`}
                />
              ],
              buttons: [
                <div
                  className={`${
                    gameObjects[data.node.id].isLocked ? "object_lock-icon" : ""
                  }`}
                  // onClick={onClickLock}
                />,
                <div
                  className={`object_code-editor-button ${
                    data.node.current ? "on" : "off"
                  }`}
                  onClick={() => onClickCode(data)}
                />
              ],
              className: data.node.current
                ? "objectList_item-current"
                : "objectList_item"
            };
          }}
        />
      </div>
      <div className="objectList_addBtn" onClick={onClickAddButton}>
        <img src={addObjectIcon} alt="" />
      </div>
    </div>
  );
}

export default View;
