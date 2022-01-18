import React, { Component } from "react";

export default function AnimaItemWrapper(AnimaItem) {
  return class Wrapper extends Component {
    constructor(props) {
      super(props);
      let { listName, sprite, name } = this.props;
      this.state = {
        id: `animebox-${listName}-${sprite.id}-${name}`,
        // id: `animebox-${name}`,
        animation: undefined,
        animationStyle: {}
      };
    }

    componentDidMount() {
      this.setAnimation();
    }
    componentDidUpdate(prevProps) {
      if (prevProps.sprite.id !== this.props.sprite.id) {
        this.setState({ animationStyle: {} }, this.setAnimation);
        // this.setAnimation();
      }
    }

    setAnimation = () => {
      let { sprite, width, item } = this.props;
      let flow = item.indexes;
      let { animeW, animeH } = this.setAnimeSize(sprite, width);
      let img = new Image();
      let widthCnt, heightCnt, positions, animationStyle;
      img.onload = () => {
        widthCnt = img.naturalWidth / sprite.spriteSize[0];
        heightCnt = img.naturalHeight / sprite.spriteSize[1];
        positions = this.setPositions(animeW, animeH, widthCnt);
        animationStyle = {
          width: animeW,
          height: animeH,
          margin: "auto",
          background: `url(${sprite.spritePath})`,
          backgroundPosition: `${positions[flow[0]]}`,
          backgroundOrigin: "border-box",
          backgroundSize: `${widthCnt * animeW}px ${heightCnt * animeH}px`
        };

        this.setState(
          {
            flow,
            widthCnt,
            heightCnt,
            animeW,
            animeH,
            positions,
            animationStyle
          }
          // ,()=>{setTimeout}
        );
      };
      img.src = sprite.spritePath;
    };

    setAnimeSize = (sprite, width) => {
      let [spriteW, spriteH] = sprite.spriteSize;
      let animeW, animeH;
      if (spriteW > spriteH) {
        animeW = width;
        animeH = (width * spriteH) / spriteW;
      } else {
        animeW = (width * spriteW) / spriteH;
        animeH = width;
      }
      return { animeW, animeH };
    };

    setPositions = (animeW, animeH, widthCnt) => {
      let { item } = this.props;
      let flow = item.indexes;
      let positions = {};
      for (let i in flow) {
        const index = flow[i];
        let x = (index % widthCnt) * animeW;
        let y = Math.floor(index / widthCnt) * animeH;
        positions[index] = `-${x}px -${y}px`;
      }
      return positions;
    };

    playAnimation = () => {
      let { animation, flow, positions } = this.state;
      if (animation) return undefined;
      const animebox = document.getElementById(this.state.id);
      let count = 0;
      let isPaused = false;
      let frameRate = Number(this.props.item.frameRate);
      animation = setInterval(() => {
        if (!isPaused) {
          if (count % flow.length === flow.length - 1) {
            isPaused = true;
            setTimeout(() => {
              isPaused = false;
            }, 1000);
          }
          let index = flow[count % flow.length];
          let nextPosition = positions[index];
          animebox.style.backgroundPosition = nextPosition;
          count++;
        }
      }, 1000 / frameRate);
      this.setState({ animation });
    };
    stopAnimation = () => {
      let { id, animation, positions } = this.state;
      const animebox = document.getElementById(id);
      animebox.style.backgroundPosition = positions[0];
      if (animation) {
        clearInterval(animation);
        this.setState({ animation: undefined });
      }
    };

    render() {
      let { id, animationStyle } = this.state;
      return (
        <AnimaItem
          {...this.props}
          id={id}
          animationStyle={animationStyle}
          handleOnMouseOver={this.playAnimation}
          handleOnMouseOut={this.stopAnimation}
        />
      );
    }
  };
}
