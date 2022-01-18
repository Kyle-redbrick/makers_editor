import React, { Component } from "react";
import { connect } from "react-redux";
import * as tabActions from "../../Store/Reducer/tabs";
import View from "./View";
import { URL } from "../../../../Common/Util/Constant";
import stringify from "json-stringify-safe";
import Stomp from "stompjs";

// 위즈라이브 전용 1v4 탭
const DATA_TYPE_LOG = "DATA_TYPE_LOG";
class Container extends Component {
  constructor(props) {
    super(props);

    // create mq
    this.mq = {
      topicName: `/topic/wizlive${this.props.roomId}-${this.props.tutorEmail}`,
      client: null,
      subscription: null
    };

    // init state
    this.state = {
      selectedTab: 0,
      log: {},
      senderEmail: "",
      students: []
    };

    // currentUser를 자기 자신으로 초기 세팅
    this.props.setCurrentUser({ email: this.props.email, pId: this.props.pId });

    this.mqConnect(() => {
      // mq ready
      this.mqSubscribe();
    });
  }

  //MARK:- life cycle
  shouldComponentUpdate = (nextProps, nextState) => {
    // log : 사용자 인터렉션 화면 상태값 (스니펫, 채팅, api, 속성 등..)
    // const { isTutor, log } = this.props;
    if (stringify(this.props.log) !== stringify(nextProps.log)) {
      this.mqSend(nextProps.log);
    }
    return true;
  };

  componentDidUpdate(prevProps, prevState) {
    // remote feed에서 학생들이 추가 될 때
    if (prevProps.students.length !== this.props.students.length) {
      this.setState({ students: this.props.students });
    }
    // 학생 상태보기 log가 변경 될 때
    if (
      this.props.isTutor &&
      JSON.stringify(prevState.log) !== JSON.stringify(this.state.log)
    ) {
      this.setState(prevState => ({
        students: prevState.students.map(student => {
          if (student.email === this.state.senderEmail) {
            return { ...student, log: this.state.log };
          } else {
            return student;
          }
        })
      }));
    }
  }

  componentWillUnmount() {
    this.mqDisconnect();
  }

  //MARK:- onClicks
  handleSelectTab = ({ tabNum, email, pId }) => {
    this.setState({ selectedTab: tabNum }, () =>
      this.props.setCurrentUser({ email, pId })
    );
  };

  //MARK:- private
  mqConnect = (mqReadyCallback, mqErrorCallback) => {
    if (!this.mq) return;

    this.mq.client = Stomp.client(URL.MQ);
    this.mq.client.debug = null;
    this.mq.client.reconnect_delay = 5000;

    const { client } = this.mq;
    const headers = {
      login: "wizschool",
      passcode: "Wizschool2018!!",
      host: "/"
    };
    const randomString = Math.random()
      .toString(36)
      .substr(2, 5);
    headers["client-id"] = this.props.email + this.props.roomId + randomString;

    client.connect(
      headers,
      frame => {
        if (mqReadyCallback) mqReadyCallback();
      },
      err => {
        if (mqErrorCallback) mqErrorCallback(err);
      }
    );
  };

  mqSubscribe = () => {
    if (!this.mq) return;

    const { client, topicName } = this.mq;
    this.mq.subscription = client.subscribe(topicName, msg => {
      const recvData = msg.body;
      const senderId = msg.headers.senderId;
      // if (senderId !== this.props.email) {
      if (this.props.isTutor) {
        const { /*type,*/ log } = JSON.parse(recvData);
        this.setState({ senderEmail: senderId, log });
        // console.log({ log });
        // animation: false
        // api: false
        // chatbot: false
        // game: false
        // gameFullScreen: false
        // property: false
        // publish: false
        // selectedApi: "ID_ALL"
        // selectedSprite: "신규"
        // sound: false
        // soundBox: false
        // spriteBox: false
        // spriteCatagory: ""
      } else {
        // console.log("This is data that sending of me");
      }
    });
  };

  mqSend = data => {
    const { client, topicName } = this.mq;
    const { isTutor, email } = this.props;
    const sendHeaders = {
      "content-type": "application/json",
      senderId: email
    };
    if (!isTutor) {
      client.send(
        topicName,
        sendHeaders,
        stringify({ type: DATA_TYPE_LOG, log: data })
      );
    }
  };

  mqDisconnect = () => {
    const { client, subscription } = this.mq;
    if (client) {
      if (subscription) {
        subscription.unsubscribe();
      }
      client.disconnect();
    }
  };

  render() {
    const {
      isTutor,
      email,
      tutorEmail,
      // students,
      pId,
      tutor,
      name,
      isMonitor
    } = this.props;

    const { selectedTab, students } = this.state;

    const { handleSelectTab } = this;

    // remote feed에서 붙은 학생들 중에 자기 자신은 제외
    const _students = students.filter(student => student.email !== email);
    const handleTabs = () => {
      if (isTutor) {
        const tabs = [{ email: tutorEmail, pId, name }, ..._students].reduce(
          (acc, cur, i) => {
            return acc.concat({
              ...cur,
              // num: i === 0 ? "T" : i
              num: i === 0 ? "T" : "S"
            });
          },
          []
        );
        return tabs;
      } else {
        const tabs = [{ email, pId, name }, ..._students, ...tutor].reduce(
          (acc, cur, i) => {
            return acc.concat({
              ...cur,
              // num: cur.email === tutorEmail ? "T" : i + 1
              num: cur.email === tutorEmail ? "T" : "S"
            });
          },
          []
        );
        return tabs;
      }
    };

    return (
      <View
        selectedTab={selectedTab}
        handleSelectTab={handleSelectTab}
        tabs={handleTabs()}
        isMonitor={isMonitor}
        email={email}
        isTutor={isTutor}
        tutorEmail={tutorEmail}
        // log={log}
        // senderEmail={senderEmail}
      />
    );
  }
}

export default connect(
  state => {
    return {
      students: state.tabs.students,
      tutor: state.tabs.tutor,
      email: state.userinfo.email,
      log: state.webrtc.log
    };
  },
  {
    setCurrentUser: tabActions.setCurrentUser
  }
)(Container);
