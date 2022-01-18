import React from "react";

export default class PageStatus extends React.Component {
  constructor(props) {
    super(props);
    this.startedAt = Date.now();
    this.pausedAt = 0;
    this.pausedTime = 0;
    this.willClose = false;
  }

  componentDidMount() {
    document.addEventListener(visibility.event, this.onVisibilityChanged);
    window.addEventListener("beforeunload", this.onBeforeUnload);
  }

  componentWillUnmount() {
    document.removeEventListener(visibility.event, this.onVisibilityChanged);
    window.removeEventListener("beforeunload", this.onBeforeUnload);
  }

  getDuration = () => {
    return Date.now() - this.startedAt - this.pausedTime;
  }

  sendCallback = isVisible => {
    if (!this.props.onChange) return;

    this.props.onChange({
      isVisible: isVisible, 
      willClose: this.willClose,
      duration: this.getDuration()
    });
  }

  onBeforeUnload = () => {
    this.willClose = true;
    this.sendCallback(false);
  }

  onVisibilityChanged = () => {
    let _visibility;
    if (!visibility) {
      _visibility = true;
    } else {
      const { hidden } = visibility;
      _visibility = !document[hidden];
    }

    if(_visibility) {
      if(this.pausedAt !== 0) {
        //탭이 비활성화 -> 활성화가 되었다면 비활성화유지 시간을 기록
        this.pausedTime += Date.now() - this.pausedAt;
        this.pausedAt = 0;
      }
    } else {
      this.pausedAt = Date.now();
    }   
    this.sendCallback(_visibility);
  }

  render() {
    return (
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

// 브라우저별로 visibility관련 이벤트 포맷이 다름
// https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
const vendorEvents = [
  {
    hidden: 'hidden',
    event: 'visibilitychange',
    state: 'visibilityState',
  },
  {
    hidden: 'webkitHidden',
    event: 'webkitvisibilitychange',
    state: 'webkitVisibilityState',
  },
  {
    hidden: 'mozHidden',
    event: 'mozvisibilitychange',
    state: 'mozVisibilityState',
  },
  {
    hidden: 'msHidden',
    event: 'msvisibilitychange',
    state: 'msVisibilityState',
  },
  {
    hidden: 'oHidden',
    event: 'ovisibilitychange',
    state: 'oVisibilityState',
  },
];

const visibility = (() => {
  for (let event of vendorEvents) {
    if (event.hidden in document) {
      return event;
    }
  }
  // otherwise it's not supported
  return null;
})();