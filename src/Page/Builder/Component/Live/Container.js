import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import RndWrapper from "../../utils/RndWrapper";
import stringify from "json-stringify-safe";
import AssetLibrary from "../../utils/assetLibrary";
import { URL, isConnectProd } from "../../../../Common/Util/Constant";
import * as request from "../../../../Common/Util/HTTPRequest";
import * as projectActions from "../../Store/Reducer/project";
import * as webrtcActions from "../../Store/Reducer/webrtc";
import * as interactionActions from "../../Store/Reducer/interaction";
import * as chatActions from "../../Store/Reducer/chat";
import * as sceneActions from "../../Store/Reducer/scene";
import Stomp from "stompjs";
import View from "./View";
import {
  showAlert,
  // showTwoBtnAlert,
  showTwoBtnAlertWithTextarea
  // showDeviceTest
} from "../../../../Common/Util/AlertManager";
import DrawingBoard from "./Component/DrawingBoard";
import LogContainer from "./Component/LogContainer";
import LectureVideoContainer from "./Component/LectureVideoContainer";
import LectureSlideContainer from "./Component/LectureSlideContainer";
import FreeTrialSurveyPopup from "./Component/FreeTrialSurveyPopup";
import Popup, { showPopUp } from "../../../../Common/Component/PopUp";
// import { minifyJSON, restoreJSON } from "../../utils/oobcMinify";

const Janus = window.Janus;

class Container extends Component {
  constructor(props) {
    super(props);
    this.janus = undefined;
    this.videocall = undefined;
    this.serverUrl = URL.JANUS_SERVER;
    this.localVideo = undefined;
    this.remoteVideo = undefined;
    this.mystream = undefined;
    this.myid = undefined;
    this.mypvtid = undefined; // We use this other ID just to map our subscriptions to us
    this.opaqueId = "wizlive-" + Janus.randomString(12);
    this.myroom = this.generateRoomId();
    this.feeds = [];
    this.remoteFeed = undefined;
    this.maxScreenShareWidth = 720;
    this.maxCameraWidth = 720;
    this.idealCameraWidth = 480;
    this.timerRef = undefined;
    this.screenMode = "camera";
    this.audioSend = false;
    this.videoSend = false;

    this.recordFilePath = "/home/ubuntu/states";
    this.recodingEnabled = isConnectProd();

    this.projectData = {};
    this.sync = false;

    // janus video qulity params
    this.doDownGrade = true;
    this.doDownGradeInterVal = 7000;
    this.doUpgrade = true;
    this.doUpgradeInterVal = 10000;
    this.upgradeTimer = undefined;
    this.tempBitrate = 0;
    this.minimumBitrate = 64000;
    this.maximumBitrate = 1024000;
    this.beforeBitrate = this.maximumBitrate / 2;
    this.timer = null;

    this.state = {
      recvAudio: true,
      recvVideo: true,
      audioEnabled: true,
      myVideoHidden: false,
      connected: false,
      log: undefined,
      startTime: undefined,
      isEnd: false,
      poorNetwork: false,
      isLectureVideoOn: false,
      isLectureSlideOn: false,
      isMqConnected: false,
      isShowSurveyPopup: false,
      isRecording: false,

      userVideoId: undefined,
      videoIdList: [],
      audioInputList: [], // audio input
      audioOutputList: [], // audio output
      videoInputList: [] // video input
    };

    this.mq = {
      topicName: `/topic/wizlive${this.props.roomId}-${this.props.tutorEmail}`,
      client: null,
      subscription: null
    };

    this.opposite = "";
  }

  MEDIA_CAMERA = "MEDIA_CAMERA";
  MEDIA_SCREEN = "MEDIA_SCREEN";
  DATA_TYPE_DEVICE_STATUS = "DATA_TYPE_DEVICE_STATUS";
  DATA_TYPE_PROJECT = "DATA_TYPE_PROJECT";
  DATA_TYPE_CODE = "DATA_TYPE_CODE";
  DATA_TYPE_CANVAS = "DATA_TYPE_CANVAS";
  DATA_TYPE_CANVAS_TOGGLE = "DATA_TYPE_CANVAS_TOGGLE";
  DATA_TYPE_EDITOR_RANGE = "DATA_TYPE_EDITOR_RANGE";
  DATA_TYPE_HIGHLIGHT = "DATA_TYPE_HIGHLIGHT";
  DATA_TYPE_LOG = "DATA_TYPE_LOG";
  DATA_TYPE_EXIT = "DATA_TYPE_EXIT";
  DATA_TYPE_LECTURE_VIDEO = "DATA_TYPE_LECTURE_VIDEO";
  DATA_TYPE_LECTURE_SLIDE = "DATA_TYPE_LECTURE_SLIDE";
  DATA_TYPE_RECORDING = "DATA_TYPE_RECORDING";

  // janus Video
  DATA_TYPE_JANUS_VIDEO = "DATA_TYPE_JANUS_VIDEO";

  WEBHOOK_TYPE_CONNECTED = "WEBHOOK_TYPE_CONNECTED";
  WEBHOOK_TYPE_CONNECTED_ALL = "WEBHOOK_TYPE_CONNECTED_ALL";
  WEBHOOK_TYPE_DISCONNECTED = "WEBHOOK_TYPE_DISCONNECTED";

  poorNetworkMessageMS = 5000;

  // new Get user mediaDevice Code
  constraints = {
    video: true,
    audio: true
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.inputEventListener, true);
    document.addEventListener("keydown", this.inputEventListener, true);

    const { tutorEmail, email, reservationId, pId /*, pageType*/ } = this.props;

    request
      .postWizLiveEntrance({
        id: reservationId,
        isTutor: email === tutorEmail,
        pId: pId
      })
      .then(res => res.json())
      .then(json => {
        // console.log(json);
      });

    // navigator.mediaDevices.getUserMedia(this.constraints).then(
    //   () => {
    //     console.log("MEDIA TEST[video(ok), mic(ok)]");
    //   },
    //   err => {

    //   }
    // );

    // [john] detect all media devices
    navigator.mediaDevices
      .enumerateDevices()
      .then(
        function(devices) {
          // device.kind (audioinput / audiooutput / videoinput )
          // device.label (device name)
          // device.deviceId (unique id)
          let defaultCameraId = undefined;
          let defaultAudioId = undefined;
          let tempAudioInput = [];
          let tempVideoInput = [];
          let tempAudioOutput = [];
          let tempVideoIdList = [];
          devices.forEach(function(device, idx) {
            if (device.deviceId === "") return;
            if (device.kind === "audioinput" && device.deviceId !== "default") {
              // 현재 사용중인 default 장비가 array에 중복 되어 있음
              // tempAudioInput.push(device.deviceId);
              tempAudioInput.push({ id: device.deviceId, label: device.label });
              if (!defaultAudioId) defaultAudioId = device.deviceId;
            } else if (device.kind === "videoinput") {
              // tempVideoInput.push(device.deviceId);
              tempVideoInput.push({ id: device.deviceId, label: device.label });
              tempVideoIdList.push(device.deviceId);
              if (!defaultCameraId) defaultCameraId = device.deviceId;
            } else if (
              device.kind === "audiooutput" &&
              device.deviceId !== "default"
            ) {
              // tempAudioOutput.push(device.deviceId);
              tempAudioOutput.push({
                id: device.deviceId,
                label: device.label
              });
            }
          });

          this.setState({
            userVideoId: defaultCameraId,
            videoIdList: tempVideoIdList,
            audioInputList: tempAudioInput,
            videoInputList: tempVideoInput,
            audioOutputList: tempAudioOutput
          });
        }.bind(this)
      )
      .catch(function(err) {
        console.error(err.name + ": " + err.message);
        this.sendWizLabReport(err);
      });

    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(
      () => {
        this.audioSend = true;
        this.videoSend = true;
        this.setup();
      },
      err => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(
          () => {
            this.handleMediaError(err, "video");
            this.audioSend = true;
            this.videoSend = false;
            this.setup();
          },
          _err => {
            navigator.mediaDevices.getUserMedia({ video: true }).then(
              () => {
                this.handleMediaError(err, "audio");
                this.audioSend = false;
                this.videoSend = true;
                this.setup();
              },
              __err => {
                this.handleMediaError(err, "all");
                this.setup();
                showPopUp(
                  <Popup.OneButton
                    intl={this.props.intl}
                    titleId="ID_BUILDER_LIVE_ACCESS_TITLE"
                    subtitleId="ID_BUILDER_LIVE_ACCESS_MSG"
                    buttonNameId="ID_BUILDER_LIVE_ACCESS_OK"
                  />
                );
              }
            );
          }
        );
      }
    );

    // [john] detect input device changed
    navigator.mediaDevices.ondevicechange = e => {
      navigator.mediaDevices
        .enumerateDevices()
        .then(
          function(devices) {
            let tempAudioInput = [];
            let tempVideoInput = [];
            let tempAudioOutput = [];
            let tempVideoIdList = [];
            devices.forEach(function(device) {
              if (
                device.kind === "audioinput" &&
                device.deviceId !== "default"
              ) {
                // tempAudioInput.push(device.deviceId);
                tempAudioInput.push({
                  id: device.deviceId,
                  label: device.label
                });
              } else if (device.kind === "videoinput") {
                // tempVideoInput.push(device.deviceId);
                tempVideoInput.push({
                  id: device.deviceId,
                  label: device.label
                });
                tempVideoIdList.push(device.deviceId);
              } else if (
                device.kind === "audiooutput" &&
                device.deviceId !== "default"
              ) {
                // tempAudioOutput.push(device.deviceId);
                tempAudioOutput.push({
                  id: device.deviceId,
                  label: device.label
                });
              }
            });

            // check new deviceId
            // _streamId -> 기존에 없던 새로운 media 장비
            let _streamId = undefined;

            if (tempVideoInput.length > this.state.videoInputList.length) {
              // 신규 장비 입력
              // 신규 리스트 중에서 기존에 없는게 있는지 확인
              tempVideoInput.forEach(item => {
                if (!this.state.videoIdList.includes(item.id)) {
                  _streamId = item.id;
                }
              });
            } else {
              // 기존장비 제거
              // 기존 리스트중에서 제거되고 남은 장비 중 첫번쨰
              this.state.videoInputList.forEach(item => {
                if (!tempVideoInput.includes(item)) {
                  _streamId = item.id;
                }
              });
            }

            if (_streamId)
              navigator.mediaDevices
                .getUserMedia({ audio: true, video: { deviceId: _streamId } })
                .then(
                  function(stream) {
                    this.setStream(stream);
                  }.bind(this)
                );

            this.setState({
              userVideoId: _streamId,
              videoIdList: tempVideoIdList,
              audioInputList: tempAudioInput,
              videoInputList: tempVideoInput,
              audioOutputList: tempAudioOutput
            });
          }.bind(this)
        )
        .catch(function(err) {
          console.error(err.name + ": " + err.message);
          this.sendWizLabReport(err);
        });
    };

    this.getOppositeUserInfo();
  }

  handleMediaError = (err, type) => {
    console.error("MEDIA TEST MEDIA TEST", err.name);
    if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
      // 장비 자체가 없을때에
      showPopUp(
        <Popup.OneButton
          intl={this.props.intl}
          titleId="ID_BUILDER_LIVE_ACCESS_TITLE_DEVICE_ERROR"
          subtitleId="ID_BUILDER_LIVE_ACCESS_MSG_NO_DEVICE"
          buttonNameId="ID_BUILDER_LIVE_ACCESS_OK"
        />
      );
    } else if (
      err.name === "NotReadableError" ||
      err.name === "TrackStartError"
    ) {
      // 다른 프로그램에서 이미 camera, mic를 사용중일때
      showPopUp(
        <Popup.OneButton
          intl={this.props.intl}
          titleId="ID_BUILDER_LIVE_ACCESS_TITLE_DEVICE_ERROR"
          subtitleId="ID_BUILDER_LIVE_ACCESS_MSG_NO_USABLE_DEVICE"
          buttonNameId="ID_BUILDER_LIVE_ACCESS_OK"
        />
      );
    } else if (
      err.name === "OverconstrainedError" ||
      err.name === "ConstraintNotSatisfiedError"
    ) {
      // chrome의 특정 버전에서 getUserMedia() 가 오류 발생
      showPopUp(
        <Popup.OneButton
          intl={this.props.intl}
          titleId="ID_BUILDER_LIVE_ACCESS_TITLE_DEVICE_ERROR"
          subtitleId="ID_BUILDER_LIVE_ACCESS_MSG_NO_USABLE_CHROME"
          buttonNameId="ID_BUILDER_LIVE_ACCESS_OK"
        />
      );
    } else if (
      err.name === "NotAllowedError" ||
      err.name === "PermissionDeniedError"
    ) {
      // 미디어 장치의 권한이 없을때 1. by System , 2.by browser
      if (err.toString().includes("system")) {
        showPopUp(
          <Popup.OneButton
            intl={this.props.intl}
            titleId="ID_BUILDER_LIVE_ACCESS_TITLE"
            subtitleId="ID_BUILDER_LIVE_ACCESS_MSG_NO_USABLE_BY_SYSTEM"
            buttonNameId="ID_BUILDER_LIVE_ACCESS_OK"
          />
        );
      } else {
        showPopUp(
          <Popup.OneButton
            intl={this.props.intl}
            titleId="ID_BUILDER_LIVE_ACCESS_TITLE"
            subtitleId="ID_BUILDER_LIVE_ACCESS_MSG"
            buttonNameId="ID_BUILDER_LIVE_ACCESS_OK"
          />
        );
      }
    } else if (err.name === "TypeError" || err.name === "TypeError") {
      // 미디어 장치가 없을때
      showPopUp(
        <Popup.OneButton
          intl={this.props.intl}
          titleId="ID_BUILDER_LIVE_ACCESS_TITLE_DEVICE_ERROR"
          subtitleId="ID_BUILDER_LIVE_ACCESS_MSG_NO_DEVICE"
          buttonNameId="ID_BUILDER_LIVE_ACCESS_OK"
        />
      );
    } else {
      //other errors
    }

    this.sendWizLabReport({
      type: `media device(${type})`,
      errorName: err.name,
      msg: err.toString()
    });
  };

  inputEventListener = evt => {
    this.sync = true;
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }
    this.syncTimeout = setTimeout(() => {
      this.sync = false;
    }, 2000);
  };

  getOppositeUserInfo() {
    const { isTutor, studentEmail, tutorEmail, reservationId } = this.props;
    request
      .userProfile({
        email: isTutor ? studentEmail : tutorEmail
      })
      .then(res => res.json())
      .then(json => {
        this.opposite = json.name;
        this.props.addRoom(reservationId, this.opposite, json.icon);
      });
  }

  setup = () => {
    this.mqConnect(
      () => {
        this.setState({
          isMqConnected: true
        });

        Janus.init({
          debug: "all",
          callback: this.setupJanus
        });
      },
      err => {
        this.sendWizLabReport(err);
        console.error(err);
        this.setState({ isMqConnected: false });
      }
    );
  };

  componentWillMount() {
    if (this.videocall) {
      this.videocall.hangup();
      this.janus.destroy();
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.sync) {
      const next = nextProps.webrtcProject;
      const current = this.props.webrtcProject;

      if (stringify(next) !== stringify(current)) {
        // const nextState = next.state;
        // const currentState = current.state;
        if (this.props.editorMode === "block") {
          this.sendData(this.DATA_TYPE_PROJECT, next);
        } else {
          let isCodeChanged = true; // 코드만 변경되었는지 체크하는 변수
          if (
            !next.state ||
            !current.state ||
            !next.state.interaction ||
            current.state.interaction
          ) {
            isCodeChanged = false;
          } else if (
            next.state.interaction.selected.scene !==
            current.state.interaction.selected.scene
          ) {
            isCodeChanged = false;
          } else if (
            stringify(next.state.interaction.selected.objects) !==
            stringify(current.state.interaction.selected.objects)
          ) {
            isCodeChanged = false;
          } else {
            const selectedSceneId = next.state.interaction.selected.scene;
            const selectedSpriteId =
              next.state.interaction.selected.objects[selectedSceneId].name;
            const nextCode =
              next.state.scene.scenes[selectedSceneId].sprites[selectedSpriteId]
                .code;
            const currentCode =
              current.state.scene.scenes[selectedSceneId].sprites[
                selectedSpriteId
              ].code;
            if (nextCode !== currentCode) {
              this.sendData(this.DATA_TYPE_CODE, { code: nextCode });
            } else {
              isCodeChanged = false;
            }
          }
          if (!isCodeChanged) {
            this.sendData(this.DATA_TYPE_PROJECT, next);
          }
        }
      }
    }

    if (this.props.isTutor) {
      if (nextProps.highlightBtnId !== this.props.highlightBtnId) {
         this.sendData(this.DATA_TYPE_HIGHLIGHT, nextProps.highlightBtnId);
         // set tutor state 
         if (this.timer) {
          clearTimeout(this.timer);
          }
          this.props.setBtnHighlight(nextProps.highlightBtnId);
        
          this.timer = setTimeout(() => {
            this.props.setBtnHighlight();
          }, 800);
      }

      if (nextProps.webrtcDrawing.length !== this.props.webrtcDrawing.length) {
        this.sendData(
          this.DATA_TYPE_CANVAS,
          nextProps.webrtcDrawing[nextProps.webrtcDrawing.length - 1]
        );
      }

      if (nextProps.isDrawingBoardOn !== this.props.isDrawingBoardOn) {
        this.sendData(this.DATA_TYPE_CANVAS_TOGGLE, nextProps.isDrawingBoardOn);
      }
    } else {
      if (stringify(nextProps.log) !== stringify(this.props.log)) {
        this.sendData(this.DATA_TYPE_LOG, nextProps.log);
      }
    }

    const nextRange = stringify(nextProps.editorRange);
    const currentRange = stringify(this.props.editorRange);
    if (nextRange !== currentRange) {
      if (this.sync) {
        this.sendData(this.DATA_TYPE_EDITOR_RANGE, nextProps.editorRange);
      }
    }

    return true;
  };

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.inputEventListener);
    document.removeEventListener("keydown", this.inputEventListener);
    this.mqDisconnect();
  }

  mqConnect = (mqReadyCallback, mqErrorCallback) => {
    this.mq.client = Stomp.client(URL.MQ);
    this.mq.client.debug = null;
    this.mq.client.reconnect_delay = 5000;

    const { client } = this.mq;
    const headers = {
      login: "wizschool",
      passcode: "Wizschool2018!!",
      host: "/"
    };
    headers["client-id"] = this.props.email + this.props.roomId;

    client.connect(
      headers,
      frame => {
        const { client, topicName } = this.mq;
        this.mq.subscription = client.subscribe(topicName, msg => {
          const recvData = msg.body;
          const senderId = msg.headers.senderId;
          if (senderId !== this.props.email) {
            this.onReceiveData(JSON.parse(recvData));
          } else {
            // console.log("This is data that sending of me");
          }
        });
        mqReadyCallback();
      },
      err => {
        mqErrorCallback(err);
      }
    );
  };

  mqDisconnect = () => {
    const { client, subscription } = this.mq;
    if (client) {
      if (subscription) {
        subscription.unsubscribe();
      }

      client.disconnect(() => {
        this.setState({ isMqConnected: false });
      });
    }
  };

  setupJanus = () => {
    if (!Janus.isWebrtcSupported()) {
      showPopUp(
        <Popup.OneButton
          intl={this.props.intl}
          titleId="ID_WEBRTC_UNSUPPORT"
          buttonNameId="ID_BUILDER_LIVE_ACCESS_OK"
        />
      );
      return;
    }
    this.janus = new Janus({
      server: this.serverUrl,
      iceTransportPolicy: "relay",
      iceServers: URL.ICE_SERVERS,
      success: this.attachJanus,
      error: error => {
        Janus.error(error);
        this.sendWizLabReport(error);
      },
      destroyed: () => {
        Janus.log("destroyed");
      }
    });
  };

  attachJanus = () => {
    this.janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: this.opaqueId,
      success: pluginHandle => {
        this.videocall = pluginHandle;
        this.handleId = this.videocall.getId();
        Janus.log(
          `Plugin attached! (${this.videocall.getPlugin()}, id=${this.videocall.getId()})`
        );
        Janus.log("  -- This is a publisher/manager");
        this.checkRoom();
        // this.registerUsername();
      },
      error: error => {
        Janus.error("  -- Error attaching plugin...", error);
        this.sendWizLabReport(error);
      },
      consentDialog: on => {
        Janus.debug(`Consent dialog should be ${on ? "on" : "off"} now`);
      },
      mediaState: (medium, on) => {
        Janus.log(
          `Janus ${on ? "started" : "stopped"} receiving our ${medium}`
        );
      },
      webrtcState: on => {
        Janus.log(
          `Janus says our WebRTC PeerConnection is ${on ? "up" : "down"} now`
        );
        if (on) {
          this.sendWebhook(this.WEBHOOK_TYPE_CONNECTED);
        }
      },
      onmessage: (msg, jsep) => {
        Janus.debug(" ::: Got a message (publisher) :::");
        Janus.debug(msg);
        const event = msg.videoroom;
        Janus.debug("Event: " + event);

        if (event) {
          if (event === "joined") {
            // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
            this.myid = msg.id;
            this.mypvtid = msg.private_id;
            Janus.log(
              `Successfully joined room ${msg.room} with ID ${this.myid}`
            );

            this.publishOwnFeed();
            // Any new feed to attach to?
            if (msg.publishers) {
              const list = msg.publishers;
              Janus.debug("Got a list of available publishers/feeds:");
              Janus.debug(list);
              list.forEach(l => {
                const id = l.id;
                const display = l.display;
                const audio = l.audio_codec;
                const video = l.video_codec;
                Janus.debug(
                  `  >> [${id}] ${display} audio: ${audio}, video: ${video})`
                );
                if (l.display !== this.props.email) {
                  this.newRemoteFeed(id, display, audio, video);
                } else {
                  this.videocall.send({
                    message: { request: "kick", room: this.myroom, id: id },
                    success: data => {
                      Janus.debug(data);
                    }
                  });
                }
              });
            }
          } else if (event === "destroyed") {
            // The room has been destroyed
            Janus.warn("The room has been destroyed!");
          } else if (event === "event") {
            // Any new feed to attach to?
            if (msg.publishers) {
              const list = msg.publishers;
              Janus.debug("Got a list of available publishers/feeds:");
              Janus.debug(list);
              list.forEach(l => {
                const id = l.id;
                const display = l.display;
                const audio = l.audio_codec;
                const video = l.video_codec;
                Janus.debug(
                  `  >> [${id}] ${display} audio: ${audio}, video: ${video})`
                );
                if (l.display !== this.props.email) {
                  this.newRemoteFeed(id, display, audio, video);
                }
              });
            } else if (msg.leaving) {
              // One of the publishers has gone away?
              const leaving = msg.leaving;
              Janus.log("Publisher left: " + leaving);
              this.remoteFeed = null;

              for (let i = 1; i < 6; i++) {
                if (this.feeds[i] && this.feeds[i].rfid === leaving) {
                  this.remoteFeed = this.feeds[i];
                  break;
                }
              }
              if (this.remoteFeed) {
                Janus.debug(
                  `Feed ${this.remoteFeed.rfid} (${this.remoteFeed.rfdisplay}) has left the room, detaching`
                );
                this.feeds[this.remoteFeed.rfindex] = null;
                this.remoteFeed.detach();
                this.setState({
                  connected: false,
                  startTime: undefined,
                  log: undefined
                });

                this.sendWebhook(this.WEBHOOK_TYPE_DISCONNECTED);
              }
            } else if (msg.unpublished) {
              // One of the publishers has unpublished?
              const unpublished = msg["unpublished"];
              Janus.log(`Publisher left: ${unpublished}`);
              if (unpublished === "ok") {
                // That's us
                this.videocall.hangup();
                return;
              }
              this.remoteFeed = null;
              for (let i = 1; i < 6; i++) {
                if (this.feeds[i] && this.feeds[i].rfid === unpublished) {
                  this.remoteFeed = this.feeds[i];
                  break;
                }
              }
              if (this.remoteFeed) {
                Janus.debug(
                  `Feed ${this.remoteFeed.rfid} (${this.remoteFeed.rfdisplay}) has left the room, detaching`
                );
                this.feeds[this.remoteFeed.rfindex] = null;
                this.remoteFeed.detach();
                this.setState({
                  connected: false,
                  startTime: undefined,
                  log: undefined
                });

                this.sendWebhook(this.WEBHOOK_TYPE_DISCONNECTED);
              }
            } else if (msg.error) {
              if (msg.error_code === 426) {
                // This is a "no such room" error: give a more meaningful description
                // console.error(
                //   "<p>Apparently room <code>" +
                //     this.myroom +
                //     "</code> (the one this demo uses as a test room) " +
                //     "does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> " +
                //     "configuration file? If not, make sure you copy the details of room <code>" +
                //     this.myroom +
                //     "</code> " +
                //     "from that sample in your current configuration file, then restart Janus and try again."
                // );
                Janus.error("No such room");
              } else {
                Janus.error(msg.error);
                this.sendWizLabReport(msg.error);
              }
            }
          }
        }

        if (jsep) {
          Janus.debug("Handling SDP as well...");
          Janus.debug(jsep);
          this.videocall.handleRemoteJsep({ jsep: jsep });
          // Check if any of the media we wanted to publish has
          // been rejected (e.g., wrong or unsupported codec)
          const audio = msg.audio_codec;
          if (
            this.mystream &&
            this.mystream.getAudioTracks() &&
            this.mystream.getAudioTracks().length > 0 &&
            !audio
          ) {
            // Audio has been rejected
            Janus.warn(
              "Our audio stream has been rejected, viewers won't hear us"
            );
          }
          const video = msg.video_codec;
          if (
            this.mystream &&
            this.mystream.getVideoTracks() &&
            this.mystream.getVideoTracks().length > 0 &&
            !video
          ) {
            // Video has been rejected
            Janus.warn(
              "Our video stream has been rejected, viewers won't see us"
            );
          }
        }
      },
      onlocalstream: stream => {
        Janus.debug(" ::: Got a local stream :::");
        this.mystream = stream;
        Janus.debug(stream);
        Janus.attachMediaStream(this.localVideo, stream);
      },
      onremotestream: stream => {
        // The publisher stream is sendonly, we don't expect anything here
      },
      oncleanup: () => {
        Janus.log(" ::: Got a cleanup notification :::");
        this.mystream = null;
        this.setState({
          connected: false,
          startTime: undefined,
          log: undefined
        });
      }
    });
  };

  generateRoomId = () => {
    const { roomId } = this.props;
    // let newId = "";
    // for (let i = 0; i < roomId.length; i++) {
    //   newId += roomId.charAt(i).charCodeAt(0);
    // }
    // newId = parseInt(newId);
    // // console.log(`GENERATED ROOM ID : ${newId}`);
    // return newId;
    return parseInt(roomId);
  };

  checkRoom = () => {
    // this.videocall.send({
    //   message: { request: "destroy", room: this.myroom }
    // });
    // return;
    Janus.debug("is room exist...?");
    this.videocall.send({
      message: { request: "exists", room: this.myroom },
      success: data => {
        if (data.exists) {
          this.registerUsername();
        } else {
          Janus.debug("Room is creating...");
          this.videocall.send({
            message: {
              request: "create",
              bitrate: this.maximumBitrate / 2,
              publishers: 30,
              bitrate_cap: true,
              room: this.myroom,
              is_private: true
            },
            success: this.registerUsername
          });
        }
      }
    });
  };

  registerUsername = () => {
    const { email } = this.props;
    const register = {
      request: "join",
      room: this.myroom,
      ptype: "publisher",
      display: email
    };
    this.videocall.send({ message: register });
  };

  unpublish = () => {
    const message = {
      request: "unpublish"
    };
    this.videocall.send({ message: message });
  };

  publishOwnFeed = () => {
    const { audioSend, videoSend } = this;
    if (!audioSend && !videoSend) {
      return;
    }
    // Publish our stream
    this.videocall.createOffer({
      // Add data:true here if you want to publish datachannels as well
      media: {
        // video: this.screen,
        replaceVideo: true,
        audioRecv: false,
        videoRecv: false,
        audioSend,
        videoSend,
        maxScreenShareWidth: this.maxScreenShareWidth,
        maxCameraWidth: this.maxCameraWidth,
        idealCameraWidth: this.idealCameraWidth
      }, // Publishers are sendonly
      // If you want to test simulcasting (Chrome and Firefox only), then
      // pass a ?simulcast=true when opening this demo page: it will turn
      // the following 'simulcast' property to pass to janus.js to true
      simulcast: false,
      simulcast2: false,
      success: jsep => {
        Janus.debug("Got publisher SDP!");
        Janus.debug(jsep);
        const publish = {
          request: "configure",
          audio: this.audioSend,
          video: this.videoSend
        };
        // You can force a specific codec to use when publishing by using the
        // audiocodec and videocodec properties, for instance:
        // 		publish["audiocodec"] = "opus"
        // to force Opus as the audio codec to use, or:
        // 		publish["videocodec"] = "vp9"
        // to force VP9 as the videocodec to use. In both case, though, forcing
        // a codec will only work if: (1) the codec is actually in the SDP (and
        // so the browser supports it), and (2) the codec is in the list of
        // allowed codecs in a room. With respect to the point (2) above,
        // refer to the text in janus.plugin.videoroom.cfg for more details
        this.videocall.send({ message: publish, jsep: jsep });
      },
      error: error => {
        this.sendWizLabReport(error);
        Janus.error("WebRTC error:", JSON.stringify(error));
        if (error === "No capture device found") {
          showPopUp(
            <Popup.OneButton
              intl={this.props.intl}
              titleId="ID_BUILDER_LIVE_ACCESS_TITLE"
              subtitleId="ID_BUILDER_LIVE_ACCESS_MSG"
              buttonNameId="ID_BUILDER_LIVE_ACCESS_OK"
            />
          );
          return;
        }
        Janus.error("WebRTC error... " + JSON.stringify(error));
        if (error.message && error.message.includes("Permission")) {
          //mic&audio popup
          showPopUp(
            <Popup.OneButton
              intl={this.props.intl}
              titleId="ID_BUILDER_LIVE_ACCESS_TITLE"
              subtitleId="ID_BUILDER_LIVE_ACCESS_MSG"
              buttonNameId="ID_BUILDER_LIVE_ACCESS_OK"
            />
          );
        }
      }
    });
  };

  newRemoteFeed(id, display, audio, video) {
    // A new feed has been published, create a new plugin handle and attach to it as a subscriber
    this.remoteFeed = null;
    this.janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: this.opaqueId,
      success: pluginHandle => {
        this.remoteFeed = pluginHandle;
        this.remoteFeed.simulcastStarted = false;
        Janus.log(
          `Plugin attached! (${this.remoteFeed.getPlugin()}, id=${this.remoteFeed.getId()})`
        );
        Janus.log("  -- This is a subscriber");
        // We wait for the plugin to send us an offer
        const subscribe = {
          request: "join",
          room: this.myroom,
          ptype: "subscriber",
          feed: id,
          private_id: this.mypvtid
        };
        // In case you don't want to receive audio, video or data, even if the
        // publisher is sending them, set the 'offer_audio', 'offer_video' or
        // 'offer_data' properties to false (they're true by default), e.g.:
        // 		subscribe["offer_video"] = false;
        // For example, if the publisher is VP8 and this is Safari, let's avoid video
        if (
          Janus.webRTCAdapter.browserDetails.browser === "safari" &&
          (video === "vp9" || (video === "vp8" && !Janus.safariVp8))
        ) {
          if (video) video = video.toUpperCase();

          Janus.error(
            `Publisher is using ${video}, but Safari doesn't support it: disabling video`
          );
          subscribe.offer_video = false;
        }
        this.remoteFeed.videoCodec = video;
        this.remoteFeed.send({ message: subscribe });
      },
      error: error => {
        this.sendWizLabReport(error);
        Janus.error("  -- Error attaching plugin...", error);
      },
      onmessage: (msg, jsep) => {
        Janus.debug(" ::: Got a message (subscriber) :::");
        Janus.debug(msg);
        const event = msg.videoroom;
        Janus.debug("Event: " + event);
        if (msg.error) {
          this.sendWizLabReport(msg.error);
          Janus.error(msg.error);
        } else if (event) {
          if (event === "attached") {
            // Subscriber created and attached
            for (let i = 1; i < 6; i++) {
              if (!this.feeds[i]) {
                this.feeds[i] = this.remoteFeed;
                this.remoteFeed.rfindex = i;
                break;
              }
            }
            this.remoteFeed.rfid = msg.id;
            this.remoteFeed.rfdisplay = msg.display;
            Janus.log(
              `Successfully attached to feed ${this.remoteFeed.rfid} (${this.remoteFeed.rfdisplay}) in room ${msg.room}`
            );

            this.setState({ startTime: Date.now(), connected: true }, () => {
              const { audioSend, videoSend } = this;
              this.sendData(this.DATA_TYPE_DEVICE_STATUS, {
                audioSend,
                videoSend
              });
            });

            if (
              this.recodingEnabled &&
              !this.props.studentEmail.includes("student") &&
              !this.props.tutorEmail.includes("ttc") &&
              !this.props.studentEmail.includes("ttc")
            ) {
              this.sendData(this.DATA_TYPE_RECORDING);
            }
            this.sendWebhook(this.WEBHOOK_TYPE_CONNECTED_ALL);
          } else if (event === "event") {
            // Check if we got an event on a simulcast-related event from this publisher
          } else if (event === "slow_link") {
            // bitrate maximum:512000 , minimum : 64000 ,  default: 256000
            console.log("slow link occured!");
            this.sendData(this.DATA_TYPE_JANUS_VIDEO, true);

            // if (this.poorNetworkTimer) {
            //   clearTimeout(this.poorNetworkTimer);
            // }
            // this.setState({ poorNetwork: true }, () => {
            //   this.poorNetworkTimer = setTimeout(() => {
            //     this.setState({ poorNetwork: false });
            //   }, this.poorNetworkMessageMS);
            // });
          } else {
            // What has just happened?
          }
        }

        if (jsep) {
          Janus.debug("Handling SDP as well...");
          Janus.debug(jsep);
          // Answer and attach
          this.remoteFeed.createAnswer({
            jsep: jsep,
            // Add data:true here if you want to subscribe to datachannels as well
            // (obviously only works if the publisher offered them in the first place)
            media: { data: false, audioSend: false, videoSend: false }, // We want recvonly audio/video
            success: jsep => {
              Janus.debug("Got SDP!");
              Janus.debug(jsep);
              const body = { request: "start", room: this.myroom };
              this.remoteFeed.send({ message: body, jsep: jsep });
            },
            error: error => {
              this.sendWizLabReport(error);
              Janus.error("WebRTC error:", error);
            }
          });
        }
      },
      webrtcState: on => {
        Janus.log(
          `Janus says this WebRTC PeerConnection (feed #${
            this.remoteFeed.rfindex
          }) is ${on ? "up" : "down"} now`
        );

        //TODO: remove this
        setTimeout(() => {
          if (!this.props.isTutor) {
            this.sendData(this.DATA_TYPE_LOG, this.props.log);
          } else {
            this.sendData(this.DATA_TYPE_PROJECT, {
              state: {
                scene: this.props.scene,
                interaction: this.props.interaction,
                preview: this.props.preview
              }
            });
          }
        }, 2000);
      },
      onlocalstream: stream => {
        // The subscriber stream is recvonly, we don't expect anything here
      },
      onremotestream: stream => {
        if (this.remoteFeed && this.remoteFeed.rfindex) {
          Janus.debug(`Remote feed #${this.remoteFeed.rfindex}`);
          Janus.attachMediaStream(this.remoteVideo, stream);
          const videoTracks = stream.getVideoTracks();
          if (!videoTracks || videoTracks.length === 0) {
            if (this.poorNetworkTimer) {
              clearTimeout(this.poorNetworkTimer);
            }
            this.setState({ poorNetwork: true }, () => {
              this.poorNetworkTimer = setTimeout(() => {
                this.setState({ poorNetwork: false });
              }, this.poorNetworkMessageMS);
            });
          }
        }
      },
      ondataopen: data => {
        Janus.log("The DataChannel is available!");
      },
      ondata: data => {
        // data = JSON.parse(data.toString());
        Janus.debug("We got data from the DataChannel! ");
        // this.onReceiveData(JSON.parse(data));
      },
      oncleanup: () => {
        Janus.log(` ::: Got a cleanup notification (remote feed ${id}) :::`);
      }
    });
  }

  sendData = async (type, data) => {
    if (!this.videocall) {
      return;
    }
    // if (!this.state.connected) {
    //   return;
    // }
    const send = data => {
      const { client, topicName } = this.mq;
      const sendHeaders = {
        "content-type": "application/json",
        senderId: this.props.email
      };
      client.send(topicName, sendHeaders, data);
    };

    // const send = data => {
    //   this.videocall.data({
    //     text: data,
    //     error: reason => {
    //       console.error(reason);
    //     },
    //     success: () => {
    //       Janus.debug("Data Sent!");
    //     }
    //   });
    // };

    if (type === this.DATA_TYPE_PROJECT) {
      if (Object.keys(data).length === 0) {
        return;
      }
      const projectDataKey = new Date().getTime();

      this.lastSentState = data;

      const maxSize = 10000;
      // let stateData =
      //   this.props.editorMode === "block"
      //     ? stringify(minifyJSON(data))
      //     : stringify(data);

      let stateData = stringify(data);

      let dataSize = stateData.length;

      const totalCount = Math.ceil(dataSize / maxSize);
      let sentSize = 0;

      for (let i = 0; i < totalCount; ++i) {
        let size;
        if (sentSize + maxSize > dataSize) {
          size = dataSize - sentSize;
        } else {
          size = maxSize;
        }

        const string = stateData.substring(sentSize, sentSize + size);
        sentSize += string.length;
        send(
          JSON.stringify({
            type,
            key: projectDataKey,
            total: totalCount,
            index: i,
            data: string
          })
        );
      }
    } else if (type === this.DATA_TYPE_CANVAS) {
      this.lastSentDrawing = data;
      send(stringify({ type, drawing: data }));
    } else if (type === this.DATA_TYPE_CANVAS_TOGGLE) {
      send(stringify({ type, isOn: data }));
    } else if (type === this.DATA_TYPE_EDITOR_RANGE) {
      this.lastSentRange = data;
      if (data.byUser) {
        delete data["byUser"];
        send(stringify({ type, editorRange: data }));
      }
    } else if (type === this.DATA_TYPE_HIGHLIGHT) {
      send(stringify({ type, highlightBtnId: data }));
    } else if (type === this.DATA_TYPE_LOG) {
      send(stringify({ type, log: data }));
    } else if (type === this.DATA_TYPE_EXIT) {
      send(stringify({ type }));
    } else if (type === this.DATA_TYPE_LECTURE_VIDEO) {
      send(stringify({ type, lectureVideo: data }));
    } else if (type === this.DATA_TYPE_LECTURE_SLIDE) {
      send(stringify({ type, lectureSlide: data }));
    } else if (type === this.DATA_TYPE_DEVICE_STATUS) {
      send(stringify({ type, status: data }));
    } else if (type === this.DATA_TYPE_RECORDING) {
      send(stringify({ type, isRecording: true }));
    } else if (type === this.DATA_TYPE_JANUS_VIDEO) {
      send(stringify({ type, status: data }));
    } else if (type === this.DATA_TYPE_CODE) {
      send(stringify({ type, code: data.code }));
    }
  };

  onReceiveData = async data => {
    const {
      type,
      drawing,
      isOn,
      editorRange,
      // highlightBtnId,
      log,
      lectureVideo,
      lectureSlide,
      isRecording,
      status,
      code
    } = data;

    if (type === this.DATA_TYPE_PROJECT) {
      if (!this.projectData[data.key]) {
        this.projectData[data.key] = { datas: [], total: data.total };
      }

      this.projectData[data.key].datas[data.index] = data.data;
      if (this.projectData[data.key].datas.length === data.total) {
        let string = "";
        for (let i = 0; i < data.total; ++i) {
          string += this.projectData[data.key].datas[i];
        }
        delete this.projectData[data.key];

        // const combinedState =
        //   this.props.editorMode === "block"
        //     ? JSON.parse(restoreJSON(string))
        //     : JSON.parse(string);

        const combinedState = JSON.parse(string);

        if (this.lastSentState) {
          const _state = { ...combinedState };
          const _lastState = { ...this.lastSentState };
          if (_state.state.scene) _state.state.scene.timeStamp = 0;
          if (_lastState.state.scene) _lastState.state.scene.timeStamp = 0;
          if (stringify(_state) === stringify(_lastState)) return;
        }
        const assets = await AssetLibrary.loadAssetsForGame(
          combinedState.state.scene
        );
        AssetLibrary.setAll(assets);
        if (this.projectTimeout) {
          clearTimeout(this.projectTimeout);
        }
        this.projectTimeout = setTimeout(() => {
          this.props.setProject(combinedState, true);
        }, 10);
      }
    } else if (type === this.DATA_TYPE_CANVAS) {
      if (this.lastSentDrawing) {
        const _drawing = { ...drawing };
        const _lastSentDrawing = { ...this.lastSentDrawing };
        if (stringify(_drawing) === stringify(_lastSentDrawing)) return;
      }

      if (this.drawTimer) {
        clearTimeout(this.drawTimer);
      }
      this.drawTimer = setTimeout(() => {
        this.props.addDrawing(drawing);
      }, 500);
    } else if (type === this.DATA_TYPE_CANVAS_TOGGLE) {
      this.props.setDrawingBoard(isOn);
    } else if (type === this.DATA_TYPE_EDITOR_RANGE) {
      if (this.lastSentRange) {
        const _editorRange = { ...editorRange };
        const _lastSentRange = { ...this.lastSentRange };
        if (stringify(_editorRange) === stringify(_lastSentRange)) return;
      }
      this.props.setEditorRange(editorRange);
    } else if (type === this.DATA_TYPE_HIGHLIGHT) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.props.setBtnHighlight(data.highlightBtnId);
      
      this.timer = setTimeout(() => {
        this.props.setBtnHighlight();
      }, 800);

    } else if (type === this.DATA_TYPE_LOG) {
      this.setState({ log });
    } else if (type === this.DATA_TYPE_EXIT) {
      this.unpublish();
      this.setState({ isEnd: true });
      this.showFeedbackAlert();
    } else if (type === this.DATA_TYPE_LECTURE_VIDEO) {
      this.setState({
        isLectureVideoOn: lectureVideo.isOn,
        selectedLectureVideoURL: lectureVideo.video
      });
    } else if (type === this.DATA_TYPE_LECTURE_SLIDE) {
      this.setState({
        isLectureSlideOn: lectureSlide.isOn,
        selectedSlideIndex: lectureSlide.slide
      });
    } else if (type === this.DATA_TYPE_DEVICE_STATUS) {
      this.setState({
        recvAudio: status.audioSend,
        recvVideo: status.videoSend,
        connected: true,
        startTime: Date.now()
      });
    } else if (type === this.DATA_TYPE_RECORDING) {
      this.setState({ isRecording: isRecording });
      const fileName = this.getRecordFileName();
      this.videocall.send({
        message: {
          request: "configure",
          record: isRecording,
          filename: fileName
        }
      });
    } else if (type === this.DATA_TYPE_JANUS_VIDEO) {
      if (data.status) {
        let newBitrate = this.beforeBitrate / 2;
        if (newBitrate >= this.minimumBitrate && this.doDownGrade) {
          this.videocall.send({
            message: { request: "configure", bitrate: newBitrate },
            success: result => {
              console.log("bitrate down complete", newBitrate);
              this.beforeBitrate = newBitrate;
              this.doDownGrade = false;
              setTimeout(() => {
                this.doDownGrade = true;
              }, this.doDownGradeInterVal);
            }
          });
        } else {
          // console.log(
          //   `new bitrate[${newBitrate}] is waitting [${this.doDownGrade}]`
          // );
        }
      }

      if (this.beforeBitrate <= this.maximumBitrate) {
        if (this.upgradeTimer !== undefined) clearTimeout(this.upgradeTimer);

        this.upgradeTimer = setTimeout(() => {
          let upBitrate = this.beforeBitrate * 2;
          if (upBitrate <= this.maximumBitrate && this.doUpgrade) {
            console.log("bitrate upgrade start", upBitrate);
            this.videocall.send({
              message: { request: "configure", bitrate: upBitrate },
              success: result => {
                console.log("bitrate up complete");
                this.beforeBitrate = upBitrate;
                this.doUpgrade = false;
                setTimeout(() => {
                  this.doUpgrade = true;
                  // SocketUtil.sendSocket("slowLink", false);
                  this.sendData(this.DATA_TYPE_JANUS_VIDEO, false);
                }, this.doUpgradeInterVal);
              }
            });
          }
        }, this.doUpgradeInterVal);
      }
    } else if (type === this.DATA_TYPE_CODE) {
      if (this.lastSentCode !== code) {
        this.lastSentCode = code;
        const sceneId = this.props.selectedSceneId;
        const selectedSprite = this.props.selectedObject;
        if (selectedSprite.name) {
          this.props.setSpriteCode(sceneId, selectedSprite.name, code);
        }
      }
    }
  };

  getRecordFileName = () => {
    const { isTutor, reservationId } = this.props;
    //const idPart = isTutor ? tutorEmail.split("@")[0] : studentEmail.split("@")[0];
    const idPart = isTutor ? "tutor" : "student";
    return `${
      this.recordFilePath
    }/${reservationId}/${reservationId}-${new Date().getTime()}-${idPart}`;
  };

  setTimerRef = elem => {
    if (!elem) return;
    this.timerRef = elem;
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.timerRef) return;
      const timeDiff = Math.floor((Date.now() - this.state.startTime) / 1000);
      let min = Math.floor(timeDiff / 60);
      let sec = timeDiff % 60;
      const formNum = num => (num.toString().length === 1 ? `0${num}` : num);
      this.timerRef.innerText = `${formNum(min)}:${formNum(sec)}`;
    }, 1000);
  };

  handleDrawingBtn = isOn => {
    this.props.setDrawingBoard(isOn);
  };

  handleLectureSlideBtn = isOn => {
    this.setState({
      isLectureSlideOn: isOn
    });
    this.sendData(this.DATA_TYPE_LECTURE_SLIDE, {
      isOn: isOn,
      slide: 0
    });
  };

  handleSelectedLectureSlide = selectedSlideIndex => {
    this.setState({
      isLectureSlideOn: true,
      selectedSlideIndex
    });
    this.sendData(this.DATA_TYPE_LECTURE_SLIDE, {
      isOn: true,
      slide: selectedSlideIndex
    });
  };

  handleLectureVideoBtn = isOn => {
    this.setState({
      isLectureVideoOn: isOn
    });
    this.sendData(this.DATA_TYPE_LECTURE_VIDEO, {
      isOn
    });
  };

  handleLectureVideoListBtn = (isOn, selectedLectureVideoURL) => {
    this.setState({
      isLectureVideoListOn: isOn
    });

    if (selectedLectureVideoURL) {
      this.setState({
        isLectureVideoOn: true,
        selectedLectureVideoURL
      });
      this.sendData(this.DATA_TYPE_LECTURE_VIDEO, {
        isOn: true,
        video: selectedLectureVideoURL
      });
    }
  };

  handleVoiceToggleButton = () => {
    this.setState({ audioEnabled: !this.state.audioEnabled }, () => {
      this.videocall.send({
        message: { request: "configure", audio: this.state.audioEnabled }
      });
    });
  };

  handleVideoToggleButton = () => {
    this.setState({ myVideoHidden: !this.state.myVideoHidden });
  };

  handleChangeVideoButton = () => {
    if (this.screenMode === "window") {
      this.screenMode = "camera";
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(
          function(stream) {
            this.setStream(stream);
          }.bind(this)
        );
      }
    } else {
      this.screenMode = "window";
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({
            video: { width: this.maxScreenShareWidth },
            audio: true
          })
          .then(
            function(stream) {
              navigator.mediaDevices
                .getUserMedia({ audio: true, video: false })
                .then(
                  function(audioStream) {
                    stream.addTrack(audioStream.getAudioTracks()[0]);
                    this.setStream(stream);
                  }.bind(this)
                );
            }.bind(this),
            function(error) {
              this.sendWizLabReport(error);
              console.error(error);
            }
          );
      }
    }
  };

  setStream(stream) {
    const config = this.videocall.webrtcStuff;
    if (
      config.myStream &&
      config.myStream.getVideoTracks() &&
      config.myStream.getVideoTracks().length
    ) {
      const s = config.myStream.getVideoTracks()[0];
      config.myStream.removeTrack(s);
      try {
        s.stop();
      } catch (e) {
        this.sendWizLabReport(e);
      }
    }

    config.myStream.addTrack(stream.getVideoTracks()[0]);
    config.myStream.addTrack(stream.getAudioTracks()[0]);

    let videoTransceiver = null;
    const transceivers = config.pc.getTransceivers();
    if (transceivers && transceivers.length > 0) {
      for (let i in transceivers) {
        const t = transceivers[i];
        if (
          (t.sender && t.sender.track && t.sender.track.kind === "video") ||
          (t.receiver && t.receiver.track && t.receiver.track.kind === "video")
        ) {
          videoTransceiver = t;
          break;
        }
      }
    }
    if (videoTransceiver && videoTransceiver.sender) {
      videoTransceiver.sender.replaceTrack(stream.getVideoTracks()[0]);
    } else {
      config.pc.addTrack(stream.getVideoTracks()[0], stream);
    }
    // Janus.attachMediaStream(this.localVideo, stream);
  }

  handleExitBtn = () => {
    this.showExitConfirmAlert();
  };

  showExitConfirmAlert = () => {
    const callback = () => {
      request.setCompleteReservation({
        reservationId: this.props.reservationId
      });
      this.sendData(this.DATA_TYPE_EXIT, null);
      this.unpublish();
      this.setState({ isEnd: true });
      this.showExitAlert();
    };

    showPopUp(
      <Popup.TwoButton
        confirmAction={callback}
        intl={this.props.intl}
        titleId="ID_WIZLIVE_EXIT_CONFIRM"
        confirmButtonNameId="ID_WIZLIVE_EXIT"
        cancelButtonNameId="ID_WIZLIVE_CANCEL"
      />
    );
  };

  showExitAlert = () => {
    const callback = () => {
      const { studentEmail, reservationId } = this.props;
      const url = `${URL.WIZLIVE}/tutor/feedback/${studentEmail}/${reservationId}/false`;
      window.open(url, "_blank");
    };

    showPopUp(
      <Popup.TwoButton
        confirmAction={callback}
        intl={this.props.intl}
        titleId="ID_WIZLIVE_EXIT_COMPLETE"
        subtitleId="ID_WIZLIVE_FEEDBACK_REQUEST"
        confirmButtonNameId="ID_WIZLIVE_FEEDBACK_GO"
        cancelButtonNameId="ID_WIZLIVE_FEEDBACK_NEXTTIME"
      />
    );
  };

  handleFreeTrialSurvey = isOn => {
    this.setState({ isShowSurveyPopup: isOn });
  };

  showFeedbackAlert = () => {
    this.handleFreeTrialSurvey(true);
  };

  showFeedbackResultAlert = success => {
    let title = success
      ? "ID_WIZLIVE_FEEDBACK_COMPLETE"
      : "ID_WIZLIVE_FEEDBACK_FAIL";
    let subtitle = success ? "" : "ID_WIZLIVE_FEEDBACK_FAIL_ADMIN";
    showPopUp(
      <Popup.OneButton
        intl={this.props.intl}
        titleId={title}
        subtitleId={subtitle}
        buttonNameId="ID_WIZLIVE_COMFIRM"
      />
    );
  };

  sendWebhook(type) {
    const {
      tutorEmail,
      studentEmail,
      email,
      reservationId,
      pId,
      pageType
    } = this.props;
    const isTutor = email === tutorEmail;
    let msg = "[new 위즈라이브 수업 알림]\n";

    switch (type) {
      case this.WEBHOOK_TYPE_CONNECTED:
        if (isTutor) {
          msg += `튜터(${tutorEmail}) 입장 완료(${this.myroom})`;
        } else {
          msg += `학생(${studentEmail}) 입장 완료(${this.myroom})`;
        }
        if (pageType === "wizlive") {
          request
            .postWizLiveEntrance({
              id: reservationId,
              isTutor: isTutor,
              pId: pId
            })
            .then(res => res.json())
            .then(json => {
              // console.log(json);
            });
        } else {
          request
            .postLiveEntrance({ id: reservationId, isTutor: isTutor })
            .then(res => res.json())
            .then(json => {
              // console.log(json);
            });
        }
        break;

      case this.WEBHOOK_TYPE_CONNECTED_ALL:
        if (isTutor) {
          msg += `튜터(${tutorEmail}), 학생(${studentEmail}) 모두 입장 완료. 수업 시작`;
        } else {
          return;
        }
        break;

      case this.WEBHOOK_TYPE_DISCONNECTED:
        if (isTutor) {
          msg += `학생(${studentEmail}) 수업 퇴장`;
        } else {
          msg += `튜터(${tutorEmail}) 수업 퇴장`;
        }
        break;
      default:
        return;
    }
    msg += "\n";
    request.sendWizLiveWebhook({ msg });
  }

  randomString(len, charSet) {
    charSet =
      charSet ||
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < len; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  }

  setRemoteVideo = video => {
    this.remoteVideo = video;
  };

  setLocalVideo = video => {
    this.localVideo = video;
  };

  // handleChangeTest = (type, id) => {
  //   if (type === "audioInput") {
  //     console.log(id);
  //     navigator.mediaDevices
  //       .getUserMedia({
  //         audio: { deviceId: { exact: id } },
  //         video: { deviceId: { exact: this.state.userVideoId } }
  //       })
  //       .then(
  //         function(stream) {
  //           console.log(stream);
  //           this.setStream(stream);
  //         }.bind(this)
  //       );
  //   } else if (type === "audioOutput") {
  //     console.log(id);
  //     const localVideo = document.querySelector("#localVideo");
  //     if (typeof localVideo.sinkId !== "undefined") {
  //       localVideo
  //         .setSinkId(id)
  //         .then(() => {
  //           console.log(`Success, audio output device attached: ${id}`);
  //         })
  //         .catch(error => {
  //           let errorMessage = error;
  //           if (error.name === "SecurityError") {
  //             errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
  //           }
  //           console.error(errorMessage);
  //           // Jump back to first output device in the list as it's the default.
  //         });
  //     } else {
  //       console.warn("Browser does not support output device selection.");
  //     }
  //     // navigator.mediaDevices
  //     //   .getUserMedia({
  //     //     audio: { deviceId: { exact: id } },
  //     //     video: { deviceId: { exact: this.state.userVideoId}}
  //     //   })
  //     //   .then(
  //     //     function(stream) {
  //     //       console.log(stream);
  //     //       this.setStream(stream);
  //     //     }.bind(this)
  //     //   );
  //   } else if (type === "video") {
  //     this.setState({ userVideoId: id });
  //     navigator.mediaDevices
  //       .getUserMedia({ audio: true, video: { deviceId: { exact: id } } })
  //       .then(
  //         function(stream) {
  //           this.setStream(stream);
  //         }.bind(this)
  //       );
  //   }
  //   // if (type === "cam") {
  //   //   this.setState({ userVideoId: e.target.value });
  //   //   navigator.mediaDevices
  //   //     .getUserMedia({ audio: true, video: { deviceId: e.target.value } })
  //   //     .then(
  //   //       function(stream) {
  //   //         this.setStream(stream);
  //   //       }.bind(this)
  //   //     );
  //   // } else if (type === "mic") {
  //   //   // navigator.mediaDevices
  //   //   //   .getUserMedia({
  //   //   //     audio: { deviceId: { exact: e.target.value } },
  //   //   //     video: this.state.userVideoId
  //   //   //   })
  //   //   //   .then(
  //   //   //     function(stream) {
  //   //   //       this.setStream(stream);
  //   //   //     }.bind(this)
  //   //   //   );
  //   // }
  // };

  // handleDevice = () => {
  //   let params = {
  //     audio: {
  //       input: this.state.audioInputList,
  //       output: this.state.audioOutputList
  //     },
  //     video: this.state.videoInputList
  //   };

  //   showDeviceTest(this.handleChangeTest, params);
  // };

  handleSMS = () => {
    showTwoBtnAlertWithTextarea(
      "ID_WIZLIVE_CLASS_MESSAGE_TITLE",
      undefined,
      "ID_WIZLIVE_CLASS_MESSAGE_TEXT_HINT",
      undefined,
      "ID_WIZLIVE_CLASS_MESSAGE_TEXT_CONFIRM",
      "ID_WIZLIVE_CLASS_MESSAGE_TEXT_CANCEL",
      msg => {
        const param = {
          tutorEmail: this.props.email,
          studentEmail: this.props.studentEmail,
          message: msg
        };
        request
          .postSendStudentMessage(param)
          .then(res => res.json())
          .then(json => {
            showAlert(
              "ID_WIZLIVE_CLASS_MESSAGE_SUCCESS",
              undefined,
              "ID_WIZLIVE_CLASS_MESSAGE_SUCCESS_OK"
            );
          })
          .catch(e => {
            console.error(e);
          });
      }
    );
  };

  // handleChangeTest = (type, e) => {
  //   if (type === "cam") {
  //     this.setState({ userVideoId: e.target.value });
  //     navigator.mediaDevices
  //       .getUserMedia({ audio: true, video: { deviceId: e.target.value } })
  //       .then(
  //         function(stream) {
  //           this.setStream(stream);
  //         }.bind(this)
  //       );
  //   } else if (type === "mic") {
  //     // navigator.mediaDevices
  //     //   .getUserMedia({
  //     //     audio: { deviceId: { exact: e.target.value } },
  //     //     video: this.state.userVideoId
  //     //   })
  //     //   .then(
  //     //     function(stream) {
  //     //       this.setStream(stream);
  //     //     }.bind(this)
  //     //   );
  //   }
  // };

  sendWizLabReport = msg => {
    let error = msg;
    try {
      error = JSON.stringify(error);
    } catch (e) {}

    const { email } = this.props;
    request.sendWizLabReport({ payload: JSON.stringify({ email, error }) });
  };

  //for rnd
  rnd = {
    onDragStop: (e, d) => {
      this.setState({ x: d.x, y: d.y });
    },
    onResize: (e, direction, ref, delta, position) => {
      this.setState({
        width: Math.max(500, parseInt(ref.style.width)),
        height: "auto",
        ...position
      });
    }
  };

  render() {
    const {
      isDrawingBoardOn,
      isTutor,
      roomId,
      tutorEmail,
      lectureVideos,
      lectureSlides,
      reservationId,
      isFreeTrial,
      handleSelectTab,
      handleChangeZIndex,
      zIndex,
      email
    } = this.props;
    const {
      connected,
      recvAudio,
      recvVideo,
      audioEnabled,
      myVideoHidden,
      log,
      startTime,
      poorNetwork,
      isEnd,
      isLectureVideoOn,
      selectedLectureVideoURL,
      isLectureVideoListOn,
      selectedSlideIndex,
      isLectureSlideOn,
      isMqConnected,
      isShowSurveyPopup,
      audioInputList,
      audioOutputList,
      videoInputList,
      userVideoId
    } = this.state;
    const {
      setRemoteVideo,
      setLocalVideo,
      handleVideoToggleButton,
      handleVoiceToggleButton,
      handleChangeVideoButton,
      handleDrawingBtn,
      handleExitBtn,
      setTimerRef,
      handleLectureVideoBtn,
      handleLectureVideoListBtn,
      handleSelectedLectureSlide,
      handleLectureSlideBtn,
      handleFreeTrialSurvey,
      opposite,
      handleSMS,
      handleChangeTest,
      handleDevice
    } = this;

    return (
      <React.Fragment>
        <RndWrapper
          id="live"
          style={{ zIndex }}
          defaultWidth={300}
          defaultHeight={((300 * 9) / 16) * 2 + 35}
          defaultX={document.body.clientWidth - 365}
          defaultY={0}
          minWidth={300}
          minHeight={((300 * 9) / 16) * 2 + 35}
          lockAspectRatio={16 / 9 / 2}
          lockAspectRatioExtraHeight={35}
        >
          <View
            connected={connected}
            recvAudio={recvAudio}
            recvVideo={recvVideo}
            audioEnabled={audioEnabled}
            myVideoHidden={myVideoHidden}
            log={log}
            isDrawingBoardOn={isDrawingBoardOn}
            isTutor={isTutor}
            setRemoteVideo={setRemoteVideo}
            setLocalVideo={setLocalVideo}
            handleVideoToggleButton={handleVideoToggleButton}
            handleVoiceToggleButton={handleVoiceToggleButton}
            handleChangeVideoButton={handleChangeVideoButton}
            handleDrawingBtn={handleDrawingBtn}
            handleExitBtn={handleExitBtn}
            startTime={startTime}
            setTimerRef={setTimerRef}
            poorNetwork={poorNetwork}
            isEnd={isEnd}
            roomId={roomId}
            tutorEmail={tutorEmail}
            opposite={opposite}
            isLectureVideoOn={isLectureVideoOn}
            handleLectureVideoListBtn={handleLectureVideoListBtn}
            handleLectureVideoBtn={handleLectureVideoBtn}
            selectedLectureVideoURL={selectedLectureVideoURL}
            lectureVideos={lectureVideos}
            isLectureVideoListOn={isLectureVideoListOn}
            selectedSlideIndex={selectedSlideIndex}
            isLectureSlideOn={isLectureSlideOn}
            handleLectureSlideBtn={handleLectureSlideBtn}
            handleSelectedLectureSlide={handleSelectedLectureSlide}
            lectureSlides={lectureSlides}
            isMqConnected={isMqConnected}
            handleFreeTrialSurvey={handleFreeTrialSurvey}
            isShowSurveyPopup={isShowSurveyPopup}
            reservationId={reservationId}
            isFreeTrial={isFreeTrial}
            handleSelectTab={handleSelectTab}
            handleChangeZIndex={handleChangeZIndex}
            handleSMS={handleSMS}
            audioInputList={audioInputList}
            audioOutputList={audioOutputList}
            videoInputList={videoInputList}
            handleChangeTest={handleChangeTest}
            userVideoId={userVideoId}
            handleDevice={handleDevice}
            email={email}
          />
        </RndWrapper>
        {isTutor && <LogContainer log={log} />}
        {isDrawingBoardOn && <DrawingBoard handleClose={handleDrawingBtn} />}
        {isLectureVideoOn && (
          <LectureVideoContainer
            isTutor={isTutor}
            handleLectureVideoBtn={handleLectureVideoBtn}
            selectedLectureVideoURL={selectedLectureVideoURL}
          />
        )}
        {isLectureSlideOn && (
          <LectureSlideContainer
            isTutor={isTutor}
            handleLectureSlideBtn={handleLectureSlideBtn}
            handleSelectedLectureSlide={handleSelectedLectureSlide}
            selectedSlideIndex={selectedSlideIndex}
            lectureSlides={lectureSlides}
          />
        )}
        {isShowSurveyPopup && (
          <FreeTrialSurveyPopup
            reservationId={reservationId}
            tutorEmail={tutorEmail}
            handleFreeTrialSurvey={handleFreeTrialSurvey}
            isFreeTrial={isFreeTrial}
          />
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    project: state.project,
    email: state.userinfo.email,
    webrtcProject: state.webrtc.project,
    webrtcDrawing: state.webrtc.drawing,
    isDrawingBoardOn: state.webrtc.isDrawingBoardOn,
    editorRange: state.webrtc.editorRange,
    highlightBtnId: state.interaction.highlightBtnId,
    log: state.webrtc.log,
    editorMode: state.scene.editorMode,
    scene: state.scene,
    interaction: state.interaction,
    preview: state.preview,
    selectedSceneId: state.interaction.selected.scene,
    selectedObject:
      state.interaction.selected.objects[state.interaction.selected.scene]
  }),
  {
    setProject: projectActions.setProject,
    addDrawing: webrtcActions.addDrawing,
    setDrawingBoard: webrtcActions.setDrawingBoard,
    setEditorRange: webrtcActions.setEditorRange,
    setBtnHighlight: interactionActions.setBtnHighlight,
    addRoom: chatActions.addRoom,
    setSpriteCode: sceneActions.setSpriteCode
  }
)(injectIntl(Container));
