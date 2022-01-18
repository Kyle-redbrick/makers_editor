import React, { Component } from "react";
import { connect } from "react-redux";
import stringify from "json-stringify-safe";
import AssetLibrary from "../../utils/assetLibrary";
import { URL, DEFAULT_VIDEO_URL } from "../../../../Common/Util/Constant";
import { showAlert } from "../../../../Common/Util/AlertManager";
import * as request from "../../../../Common/Util/HTTPRequest";
import * as projectActions from "../../Store/Reducer/project";
import * as webrtcActions from "../../Store/Reducer/webrtc";
import * as interactionActions from "../../Store/Reducer/interaction";
import View from "./View";
import Stomp from "stompjs";
// import { minifyJSON, restoreJSON } from "../../utils/oobcMinify";
const Janus = window.Janus;

class Container extends Component {
  constructor(props) {
    super(props);
    this.janus = undefined;
    this.videocall = undefined;
    this.serverUrl = URL.JANUS_SERVER;
    this.tutorVideo = undefined;
    this.studentVideo = undefined;
    this.myid = undefined;
    this.mypvtid = undefined; // We use this other ID just to map our subscriptions to us
    this.opaqueId = "wizlive-" + Janus.randomString(12);
    this.feeds = [];
    this.remoteFeed = undefined;
    this.screen = undefined;
    this.timerRef = undefined;
    this.displayId = "monitor";
    this.studentBitrateTimer = undefined;
    this.tutorBitrateTimer = undefined;

    this.projectData = {};

    this.state = {
      rooms: [],

      currentRoom: undefined,
      startTime: undefined,
      // rnd
      width: 300,
      height: "auto",
      x: 0,
      y: 0,
      isLectureVideoOn: false,
      isLectureSlideOn: false,

      // test
      isMqConnected: false
    };

    // MQ
    this.mq = {
      isUsingMQ: false,
      client: null,
      subscription: null
    };
  }

  MEDIA_CAMERA = "MEDIA_CAMERA";
  MEDIA_SCREEN = "MEDIA_SCREEN";
  DATA_TYPE_PROJECT = "DATA_TYPE_PROJECT";
  DATA_TYPE_CANVAS = "DATA_TYPE_CANVAS";
  DATA_TYPE_CANVAS_TOGGLE = "DATA_TYPE_CANVAS_TOGGLE";
  DATA_TYPE_EDITOR_RANGE = "DATA_TYPE_EDITOR_RANGE";
  DATA_TYPE_HIGHLIGHT = "DATA_TYPE_HIGHLIGHT";
  DATA_TYPE_LECTURE_VIDEO = "DATA_TYPE_LECTURE_VIDEO";
  DATA_TYPE_LECTURE_SLIDE = "DATA_TYPE_LECTURE_SLIDE";

  componentDidMount() {
    // Janus.init({
    //   debug: "all",
    //   callback: this.setupJanus
    // });
    request
      .getWhiteList({ email: this.props.email ? this.props.email : "none" })
      .then(res => res.json())
      .then(json => {
        if (!json) window.location.href = "/";

        request
          .getTodayAvailableRooms({ type: "js" })
          .then(res => res.json())
          .then(json => {
            let tempWOLecture = json.filter(item => {
              if (this.props.location.params.type === "js") {
                if (
                  item.myLecture.lectureId !== 107 &&
                  item.myLecture.lectureId !== 109
                ) {
                  return item;
                }
              } else {
                if (
                  item.myLecture.lectureId === 107 ||
                  item.myLecture.lectureId === 109
                ) {
                  return item;
                }
              }
              return false;
            });

            this.setState({ rooms: tempWOLecture });
          })
          .catch(e => console.error(e));
      });
  }

  componentWillMount() {
    if (this.videocall) {
      this.videocall.hangup();
      this.janus.destroy();
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
    if (this.studentBitrateTimer) {
      clearInterval(this.studentBitrateTimer);
      this.studentBitrateTimer = undefined;
    }
    if (this.tutorBitrateTimer) {
      clearInterval(this.tutorBitrateTimer);
      this.tutorBitrateTimer = undefined;
    }
  }

  componentWillUnmount() {
    if (this.isUsingMQ) {
      this.mqDisconnect();
    }
  }

  setupJanus = () => {
    if (!Janus.isWebrtcSupported()) {
      showAlert("ID_WEBRTC_UNSUPPORT");
      return;
    }
    this.janus = new Janus({
      server: this.serverUrl,
      iceTransportPolicy: "relay",
      iceServers: URL.ICE_SERVERS,
      success: this.attachJanus,
      error: error => {
        Janus.error(error);
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
                if (l.display !== this.displayId) {
                  this.newRemoteFeed(id, display, audio, video);
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
                if (l.display !== this.displayId) {
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
                  startTime: undefined,
                  log: undefined
                });
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
                  startTime: undefined,
                  log: undefined
                });
              }
            } else if (msg.error) {
              if (msg.error_code === 426) {
                // This is a "no such room" error: give a more meaningful description
                Janus.error("No such room");
              } else {
                Janus.error(msg.error);
              }
            }
          }
        }

        if (jsep) {
          Janus.debug("Handling SDP as well...");
          Janus.debug(jsep);
          this.videocall.handleRemoteJsep({ jsep: jsep });
        }
      },
      onlocalstream: stream => {
        //this is monitor. nothing to do
      },
      onremotestream: stream => {
        // The publisher stream is sendonly, we don't expect anything here
      },
      oncleanup: () => {
        Janus.log(" ::: Got a cleanup notification :::");
        this.setState({
          startTime: undefined,
          log: undefined
        });
      }
    });
  };

  checkRoom = () => {
    const { roomId } = this.state.currentRoom;
    // this.videocall.send({
    //   message: { request: "destroy", room: roomId }
    // });
    // return;
    Janus.debug("is room exist...?");
    this.videocall.send({
      message: { request: "exists", room: roomId },
      success: data => {
        if (data.exists) {
          this.registerUsername();
        } else {
          Janus.debug("Room is creating...");
          this.videocall.send({
            message: {
              request: "create",
              // bitrate: 512000,
              publishers: 30,
              bitrate_cap: true,
              room: roomId,
              is_private: true
            },
            success: this.registerUsername
          });
        }
      }
    });
  };

  registerUsername = () => {
    const { roomId } = this.state.currentRoom;
    const register = {
      request: "join",
      room: roomId,
      ptype: "publisher",
      display: this.displayId
    };
    this.videocall.send({ message: register });
  };

  newRemoteFeed(id, display, audio, video) {
    const { roomId } = this.state.currentRoom;
    // A new feed has been published, create a new plugin handle and attach to it as a subscriber
    let remoteFeed = null;
    this.janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: this.opaqueId,
      success: pluginHandle => {
        remoteFeed = pluginHandle;
        remoteFeed.simulcastStarted = false;
        Janus.log(
          `Plugin attached! (${remoteFeed.getPlugin()}, id=${remoteFeed.getId()})`
        );
        Janus.log("  -- This is a subscriber");
        // We wait for the plugin to send us an offer
        const subscribe = {
          request: "join",
          room: roomId,
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
        remoteFeed.videoCodec = video;
        remoteFeed.send({ message: subscribe });
      },
      error: error => {
        Janus.error("  -- Error attaching plugin...", error);
      },
      onmessage: (msg, jsep) => {
        Janus.debug(" ::: Got a message (subscriber) :::");
        Janus.debug(msg);
        const event = msg.videoroom;
        Janus.debug("Event: " + event);
        if (msg.error) {
          Janus.error(msg.error);
        } else if (event) {
          if (event === "attached") {
            // Subscriber created and attached
            for (let i = 1; i < 6; i++) {
              if (!this.feeds[i]) {
                this.feeds[i] = remoteFeed;
                remoteFeed.rfindex = i;
                break;
              }
            }
            remoteFeed.rfid = msg.id;
            remoteFeed.rfdisplay = msg.display;
            Janus.log(
              `Successfully attached to feed ${remoteFeed.rfid} (${remoteFeed.rfdisplay}) in room ${msg.room}`
            );
            this.setState({ startTime: Date.now() });
          } else if (event === "event") {
            // Check if we got an event on a simulcast-related event from this publisher
          } else {
            // What has just happened?
          }
        }

        if (jsep) {
          const { roomId } = this.state.currentRoom;
          Janus.debug("Handling SDP as well...");
          Janus.debug(jsep);
          // Answer and attach
          remoteFeed.createAnswer({
            jsep: jsep,
            // Add data:true here if you want to subscribe to datachannels as well
            // (obviously only works if the publisher offered them in the first place)
            media: {
              data: this.isUsingMQ ? false : true,
              audioSend: false,
              videoSend: false
            }, // We want recvonly audio/video
            success: jsep => {
              Janus.debug("Got SDP!");
              Janus.debug(jsep);
              const body = { request: "start", room: roomId };
              remoteFeed.send({ message: body, jsep: jsep });
            },
            error: error => {
              Janus.error("WebRTC error:", error);
            }
          });
        }
      },
      webrtcState: on => {
        Janus.log(
          `Janus says this WebRTC PeerConnection (feed #${
            remoteFeed.rfindex
          }) is ${on ? "up" : "down"} now`
        );
      },
      onlocalstream: stream => {
        // The subscriber stream is recvonly, we don't expect anything here
      },
      onremotestream: stream => {
        if (remoteFeed && remoteFeed.rfindex) {
          Janus.debug(`Remote feed #${remoteFeed.rfindex}`);
          const { currentRoom } = this.state;
          if (remoteFeed.rfdisplay === currentRoom.studentEmail) {
            Janus.attachMediaStream(this.studentVideo, stream);

            if (this.studentBitrateTimer) {
              clearInterval(this.studentBitrateTimer);
            }
            this.studentBitrateTimer = setInterval(() => {
              this.setState({
                studentBitrate: remoteFeed.getBitrate()
              });
            }, 1000);
          } else {
            Janus.attachMediaStream(this.tutorVideo, stream);

            if (this.tutorBitrateTimer) {
              clearInterval(this.tutorBitrateTimer);
            }
            this.tutorBitrateTimer = setInterval(() => {
              this.setState({
                tutorBitrate: remoteFeed.getBitrate()
              });
            }, 1000);
          }
        }
      },
      ondataopen: data => {
        Janus.log("The DataChannel is available!");
        this.setState({ startTime: Date.now() });
      },
      ondata: data => {
        // data = JSON.parse(data.toString());
        Janus.debug("We got data from the DataChannel! ");
        this.onReceiveData(JSON.parse(data));
      },
      oncleanup: () => {
        Janus.log(` ::: Got a cleanup notification (remote feed ${id}) :::`);
        if (remoteFeed.rfdisplay === this.state.studentEmail) {
          clearInterval(this.studentBitrateTimer);
          this.studentBitrateTimer = undefined;
        } else {
          clearInterval(this.tutorBitrateTimer);
          this.tutorBitrateTimer = undefined;
        }
      }
    });
  }

  onReceiveData = async data => {
    const {
      type,
      drawing,
      isOn,
      editorRange,
      highlightBtnId,
      lectureVideo,
      lectureSlide
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
        this.props.setProject(combinedState, true);
      }
    } else if (type === this.DATA_TYPE_CANVAS) {
      if (this.lastSentDrawing) {
        const _drawing = { ...drawing };
        const _lastSentDrawing = { ...this.lastSentDrawing };
        if (stringify(_drawing) === stringify(_lastSentDrawing)) return;
      }

      this.props.addDrawing(drawing);
    } else if (type === this.DATA_TYPE_CANVAS_TOGGLE) {
      this.props.setDrawingBoard(isOn);
    } else if (type === this.DATA_TYPE_EDITOR_RANGE) {
      const current = new Date().getTime();
      const diff = current - this.lastRangeTime;
      this.lastRangeTime = current;
      if (diff < 100) {
        this.lastRangeDiffCount++;
        if (this.lastRangeDiffCount > 10) {
          this.lastRangeDiffCount = 0;
          return;
        }
      }
      this.props.setEditorRange(editorRange);
    } else if (type === this.DATA_TYPE_HIGHLIGHT) {
      this.props.setBtnHighlight(highlightBtnId);
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
    }
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

  setStudentVideo = video => {
    this.studentVideo = video;
  };

  setTutorVideo = video => {
    this.tutorVideo = video;
  };

  setup = room => {
    const mqTesterTutor = [
      "tutor@wizlive.com",
      "neotutor@wizschool.io",
      "chris@wizschool.io",

      "tutor01@wizlive.com",
      "tutor02@wizlive.com",
      "tutor03@wizlive.com",
      "tutor04@wizlive.com",
      "tutor05@wizlive.com",
      "tutor06@wizlive.com",
      "tutor07@wizlive.com",
      "tutor08@wizlive.com",
      "tutor09@wizlive.com",
      "tutor10@wizlive.com",
      "tutor11@wizlive.com",
      "tutor12@wizlive.com",
      "tutor13@wizlive.com"
    ];
    const mqTesterStudent = [
      "student@wizlive.com",
      "neo@wizschool.io",
      "chris4@wizschool.io",

      "student01@wizlive.com",
      "student02@wizlive.com",
      "student03@wizlive.com",
      "student04@wizlive.com",
      "student05@wizlive.com",
      "student06@wizlive.com",
      "student07@wizlive.com",
      "student08@wizlive.com",
      "student09@wizlive.com",
      "student10@wizlive.com",
      "student11@wizlive.com",
      "student12@wizlive.com",
      "student13@wizlive.com"
    ];

    this.isUsingMQ =
      mqTesterTutor.indexOf(room.tutorEmail) !== -1 &&
      mqTesterStudent.indexOf(room.studentEmail) !== -1;

    //
    this.isUsingMQ = true;

    if (this.isUsingMQ) {
      this.mqConnect(
        `/topic/wizlive${room.roomId}-${room.tutorEmail}`,
        () => {
          Janus.init({
            debug: "all",
            callback: this.setupJanus
          });
        },
        err => {
          console.error(err);
        }
      );
    } else {
      Janus.init({
        debug: "all",
        callback: this.setupJanus
      });
    }
  };

  mqConnect = (topicName, mqReadyCallback, mqErrorCallback) => {
    this.mq.client = Stomp.client(URL.MQ);
    this.mq.client.debug = null;
    this.mq.client.reconnect_delay = 5000;

    const { client } = this.mq;
    const headers = {
      login: "wizschool",
      passcode: "Wizschool2018!!",
      host: "/"
    };
    const number = Math.floor(Math.random() * 9000 + 1000);
    if (this.props.email) {
      headers["client-id"] = `monitor${number}-${this.props.email}`;
    } else {
      headers["client-id"] = `monitor${number}`;
    }

    client.connect(
      headers,
      frame => {
        this.setState({ isMqConnected: true });
        this.mq.subscription = client.subscribe(topicName, msg => {
          this.onReceiveData(JSON.parse(msg.body));
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

  handleOnClickRoom = room => {
    this.setState(
      {
        currentRoom: { ...room, roomId: parseInt(room.roomId) },
        lectureSlides: JSON.parse(room.myLecture.lecture.slides)
      },
      async () => {
        const { isMqConnected } = this.state;
        if (isMqConnected) {
          this.mqDisconnect();
        }
        this.setup(room);

        try {
          const state = JSON.parse(room.myLecture.lecture.state);
          const project = {
            state,
            name: "",
            basicClass: false,
            video: { videoURL: DEFAULT_VIDEO_URL }
          };
          const assets = await AssetLibrary.loadAssetsForGame(state.scene);
          AssetLibrary.setAll(assets);
          this.props.setProject(project, true);
        } catch (e) {
          console.error(e);
        }
      }
    );
  };

  handleOnClickSync = async room => {
    const pId = room.myLecture.pId;
    if (pId) {
      await request
        .getDevelopingProject({ pId })
        .then(res => res.json())
        .then(async json => {
          try {
            const state = JSON.parse(json.state);
            const assets = await AssetLibrary.loadAssetsForGame(state.scene);
            AssetLibrary.setAll(assets);
            this.props.setProject({ state, pId }, true);
          } catch (e) {
            console.error(e);
          }
        });
    } else {
      alert("아직 프로젝트가 생성되지 않았습니다.");
    }
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
      log,
      startTime,
      rooms,
      studentBitrate,
      tutorBitrate,
      currentRoom,
      isLectureVideoOn,
      selectedLectureVideoURL,
      isLectureSlideOn,
      selectedSlideIndex,
      lectureSlides,
      isMqConnected
    } = this.state;
    const { isDrawingBoardOn } = this.props;
    const {
      setStudentVideo,
      setTutorVideo,
      setTimerRef,
      handleOnClickRoom,
      handleOnClickSync
    } = this;

    //for rnd
    const { width, height, x, y } = this.state;
    const { onDragStop, onResize } = this.rnd;
    const rnd = { width, height, x, y, onDragStop, onResize };

    return (
      <View
        rooms={rooms}
        log={log}
        isDrawingBoardOn={isDrawingBoardOn}
        setStudentVideo={setStudentVideo}
        setTutorVideo={setTutorVideo}
        rnd={rnd}
        startTime={startTime}
        setTimerRef={setTimerRef}
        handleOnClickRoom={handleOnClickRoom}
        handleOnClickSync={handleOnClickSync}
        studentBitrate={studentBitrate}
        tutorBitrate={tutorBitrate}
        currentRoom={currentRoom}
        isLectureVideoOn={isLectureVideoOn}
        selectedLectureVideoURL={selectedLectureVideoURL}
        selectedSlideIndex={selectedSlideIndex}
        isLectureSlideOn={isLectureSlideOn}
        lectureSlides={lectureSlides}
        isMqConnected={isMqConnected}
      />
    );
  }
}

export default connect(
  state => ({
    email: state.userinfo.email,
    project: state.project,
    webrtcProject: state.webrtc.project,
    webrtcDrawing: state.webrtc.drawing,
    isDrawingBoardOn: state.webrtc.isDrawingBoardOn,
    editorRange: state.webrtc.editorRange,
    highlightBtnId: state.interaction.highlightBtnId,
    log: state.webrtc.log,
    editorMode: state.scene.editorMode
  }),
  {
    setProject: projectActions.setProject,
    addDrawing: webrtcActions.addDrawing,
    setDrawingBoard: webrtcActions.setDrawingBoard,
    setEditorRange: webrtcActions.setEditorRange,
    setBtnHighlight: interactionActions.setBtnHighlight
  }
)(Container);
