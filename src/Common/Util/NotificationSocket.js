import React, { Component } from "react";
import { Provider as ReduxProvider } from "react-redux";
import io from "socket.io-client";
import moment from "moment";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "../../Common/Store";
import UserInfo from "../../Common/Component/UserInfo";
import { URL } from "./Constant";

class NotificationSocket {
  constructor() {
    this.userId = null;
    this.socket = null;
    this.subscribers = [];
    this.shouldStoreNoti = false;
  }

  connect(userId) {
    if (!this.checkUserIdValid(userId)) return;
    this.socket = io(URL.NOTIFICATION_SOCKET_SERVER, {});
    this.socket.on("connect", () => {
      this.userId = userId;
      this.socket.emit("join", userId);
    });
    this.socket.on("wizlabNoti", noti => {
      if (this.checkNotiValid(noti)) {
        if (this.shouldStoreNoti) {
          this.storeNoti(noti);
        } else {
          for (let i in this.subscribers) {
            this.subscribers[i](noti);
          }
        }
      }
    });
    this.socket.on("forceDisconnect", this.disconnect.bind(this));
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
  isConnected() {
    return !!this.socket;
  }
  checkUserIdValid(id) {
    return !!id;
  }
  checkNotiValid(noti) {
    if (this.userId !== noti.userId) {
      return false;
    }
    if (noti.storedAt) {
      if (moment().diff(noti.storedAt, "hours") > 1) {
        return false;
      }
    }
    return true;
  }
  subscribe(callback) {
    this.subscribers.push(callback);
  }
  unsubscribe(callback) {
    const index = this.subscribers.indexOf(callback);
    if (index >= 0) {
      this.subscribers.splice(index, 1);
    }
  }
  storeNoti(noti) {
    const notis = this.getStoredNotis();
    notis.push({ ...noti, storedAt: moment().format() });
    this.setStoredNotis(notis);
  }
  getStoredNotis() {
    const stringifiedNotis = localStorage.getItem("notification");
    if (stringifiedNotis) {
      try {
        return JSON.parse(stringifiedNotis);
      } catch {
        return [];
      }
    } else {
      return [];
    }
  }
  popStoredNotis() {
    const notis = this.getStoredNotis();
    this.deleteStoredNoti();
    notis.forEach(noti => {
      if (this.checkNotiValid(noti)) {
        for (let i in this.subscribers) {
          this.subscribers[i](noti);
        }
      }
    });
  }
  setStoredNotis(notis) {
    localStorage.setItem("notification", JSON.stringify(notis));
  }
  deleteStoredNoti() {
    localStorage.removeItem("notification");
  }
}
const notificationSocket = new NotificationSocket();
export default notificationSocket;

class Provider extends Component {
  componentDidMount() {
    if (this.props.id) {
      notificationSocket.connect(this.props.id);
    }
    // notificationSocket.subscribe(noti => {
    //   toast.success(noti.message, {
    //     position: toast.POSITION.BOTTOM_LEFT,
    //     autoClose: 8000,
    //     pauseOnHover: true
    //   });
    // });
    window.addEventListener("blur", this.onBrowserBlur);
    window.addEventListener("focus", this.onBrowserFocus);
  }
  componentWillUnmount() {
    window.removeEventListener("blur", this.onBrowserBlur);
    window.removeEventListener("focus", this.onBrowserFocus);
  }
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      if (this.props.id) {
        this.onUserLogin();
      } else {
        this.onUserLogout();
      }
    }
  }
  onUserLogin = () => {
    notificationSocket.connect(this.props.id);
  };
  onUserLogout = () => {
    notificationSocket.disconnect();
  };
  onBrowserBlur = () => {
    notificationSocket.shouldStoreNoti = true;
  };
  onBrowserFocus = () => {
    notificationSocket.shouldStoreNoti = false;
    notificationSocket.popStoredNotis();
    if (!notificationSocket.isConnected()) {
      if (this.props.id) {
        notificationSocket.connect(this.props.id);
      }
    }
  };

  render() {
    return (
      <>
        <ToastContainer />
      </>
    );
  }
}

const ConnectedProvider = connect(state => {
  const { id, email } = state.userinfo;
  return { id, email };
})(Provider);

export const NotificationProvider = () => {
  return (
    <ReduxProvider store={store}>
      <UserInfo>
        <ConnectedProvider />
      </UserInfo>
    </ReduxProvider>
  );
};
