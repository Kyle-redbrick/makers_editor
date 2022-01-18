import React, { Component } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";
import { flow } from "lodash";

export default function DndWrapper(DndItem, ITEM_TYPE) {
  const spriteSource = {
    beginDrag(props) {
      if (props.onDragStart) {
        props.onDragStart();
      }
      return {
        name: props.name,
        index: props.index
      };
    }
  };

  const spriteTarget = {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      // Get horizontal middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position: {x:, y:}
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the left
      const hoverClientX = clientOffset.x - hoverBoundingRect.x; // .x === .left

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging rightwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      // Dragging leftwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      // Time to actually perform the action
      props.moveDndItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  };

  class Wrapper extends Component {
    render() {
      const {
        // text,
        // isDragging,
        connectDragSource,
        connectDropTarget
      } = this.props;
      // const opacity = isDragging ? 0 : 1;
      return connectDragSource(
        connectDropTarget(
          <div className="DndWrapper">
            <DndItem {...this.props} />
          </div>
        )
      );
    }
  }

  return flow(
    DropTarget(ITEM_TYPE, spriteTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })),
    DragSource(ITEM_TYPE, spriteSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }))
  )(Wrapper);
}
