import React, { Component } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.scss";

class Container extends Component {
  constructor(props) {
    super(props);
    const defaultRndOrders = ["ObjectBox", "SoundBox", "Editor", "Api"];
    this.state = { rndOrders: defaultRndOrders };
  }

  bringRndToTop = rndId => {
    const rndOrders = [...this.state.rndOrders];
    const index = rndOrders.indexOf(rndId);
    if (index >= 0) {
      rndOrders.splice(index, 1);
      rndOrders.push(rndId);
      this.setState({ rndOrders });
    }
  };

  render() {
    const { rndOrders } = this.state;
    return (
      <div id="rndProvider" className="rndProvider">
        <DndProvider backend={HTML5Backend}>
          {React.Children.map(this.props.children, child => {
            const { rndId } = child.props;
            const rndOrder = rndOrders.indexOf(rndId);
            const propsAddedClone = React.cloneElement(child, {
              rndOrder,
              bringRndToTop: () => {
                this.bringRndToTop(rndId);
              }
            });
            return propsAddedClone;
          })}
        </DndProvider>
      </div>
    );
  }
}

export default Container;
