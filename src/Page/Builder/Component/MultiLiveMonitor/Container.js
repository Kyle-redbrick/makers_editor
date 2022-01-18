import React, { Component } from "react";
import { connect } from "react-redux";
import Popup, { showPopUp } from "../../../../Common/Component/PopUp";
import { URL } from "../../../../Common/Util/Constant";
import * as request from "../../../../Common/Util/HTTPRequest";
import * as projectActions from "../../Store/Reducer/project";
import * as tabActions from "../../Store/Reducer/tabs";
import RndWrapper from "../../utils/RndWrapper";
// import FreeTrialSurveyPopup from "../Live/Component/FreeTrialSurveyPopup";
import { socketUtil } from "../Socket/Container";
import View from "./View";

const Janus = window.Janus;

class Container extends Component {
  constructor(props) {
    super(props);
    this.janus = null;
    this.sfutest = null;
    this.myid = null;
    this.mypvtid = null;
    this.feeds = [];
    this.mystream = null;
    this.opaqueId = "wizlive-monitor" + Janus.randomString(12);
    // this.currentUser = null;
    // this.hasTutor = false;
    this.tutorVideo = undefined;
    this.localVideo = undefined;
    this.studentVideos = [];
    this.remoteVideos = [];
    this.email = this.opaqueId;
    this.tutorName = "";
    this.janusServerURL = URL.JANUS_SERVER;
    this.localStreamEmail = this.props.isTutor
      ? this.props.tutorEmail
      : this.props.email;
    this.attendees = [];

    this.state = {
      attendees: [],
      students: [],
      tutor: [],
      audioEnabled: true,
      isShowSurveyPopup: false,
      isEnd: false,
      roomStatus: "connecting"
    };
  }

  async getReservationStudents(callback) {
    try {
      const attendees = await request
        .getReservationStudents(this.props.roomId)
        .then(res => res.json());

      if (attendees.length) {
        this.setState({
          attendees: attendees.map(attendee => ({
            ...attendee,
            audioEnabled: true
          }))
        });

        const tutor = attendees[attendees.length - 1];
        this.tutorName = tutor.name;
      }
    } catch (err) {
      console.error(err);
    }
    callback();
  }

  componentDidMount() {
    this.getReservationStudents(() => {
      this.setup();
      // 수업 퇴장
      socketUtil.socket.on("lectureExit", data => {
        if (!this.props.isTutor) {
          this.unpublish();
          this.setState({ isEnd: true });
          this.showFeedbackAlert();
        }
      });

      // 오디오 on/off
      socketUtil.socket.on("audioChanged", data => {
        const { email, audioEnabled } = data;

        this.setState({
          attendees: this.state.attendees.map(attendee => {
            if (attendee.email === email) {
              return { ...attendee, audioEnabled };
            } else {
              return attendee;
            }
          })
        });
      });
    });
  }

  setup = () => {
    Janus.init({ debug: "all", callback: this.setupJanus });
  };

  setupJanus = () => {
    this.janus = new Janus({
      server: this.janusServerURL,
      success: () => {
        this.janus.attach({
          plugin: "janus.plugin.videoroom",
          opaqueId: this.opaqueId,
          success: pluginHandle => {
            this.sfutest = pluginHandle;
            Janus.log(
              "Plugin attached! (" +
                this.sfutest.getPlugin() +
                ", id=" +
                this.sfutest.getId() +
                ")"
            );
            this.checkRoom();
          },
          error: error => {
            Janus.error("  -- Error attaching plugin...", error);
            alert("Error attaching plugin... " + error);
          },
          consentDialog: on => {
            Janus.debug(
              "Consent dialog should be " + (on ? "on" : "off") + " now"
            );
          },
          iceState: state => {
            Janus.log("ICE state changed to " + state);
          },
          mediaState: (medium, on) => {
            Janus.log(
              "Janus " +
                (on ? "started" : "stopped") +
                " receiving our " +
                medium
            );
          },
          webrtcState: on => {
            Janus.log(
              "Janus says our WebRTC PeerConnection is " +
                (on ? "up" : "down") +
                " now"
            );
          },
          onmessage: (msg, jsep) => {
            Janus.debug(" ::: Got a message (publisher) :::", msg);
            var event = msg["videoroom"];
            Janus.debug("Event: " + event);
            if (event) {
              if (event === "joined") {
                // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
                this.myid = msg["id"];
                this.mypvtid = msg["private_id"];
                Janus.log(
                  "Successfully joined room " +
                    msg["room"] +
                    " with ID " +
                    this.myid
                );

                this.publishOwnFeed(true);

                if (msg["publishers"] && msg["publishers"].length) {
                  const list = msg["publishers"];
                  Janus.debug(
                    "Got a list of available publishers/feeds:",
                    list
                  );
                  for (let f in list) {
                    let id = list[f]["id"];
                    let display = list[f]["display"];
                    let audio = list[f]["audio_codec"];
                    let video = list[f]["video_codec"];
                    display = JSON.parse(display);
                    Janus.debug(
                      "  >> [" +
                        id +
                        "] " +
                        display.email +
                        " (audio: " +
                        audio +
                        ", video: " +
                        video +
                        ")"
                    );
                    // if (display.email !== this.props.email) {
                    //   console.log(
                    //     1111,
                    //     `I joined: remote email - ${display.email}`
                    //   );
                    this.newRemoteFeed(id, display, audio, video);
                    // } else {
                    //   this.sfutest.send({
                    //     message: {
                    //       request: "kick",
                    //       room: this.props.roomId,
                    //       id: id
                    //     },
                    //     success: data => {
                    //       Janus.debug(data);
                    //     }
                    //   });
                    // }
                  }
                }
                if (this.state.roomStatus === "connecting") {
                  this.setState({ roomStatus: "ready" });
                }
              } else if (event === "destroyed") {
                Janus.warn("The room has been destroyed!");
              } else if (event === "event") {
                if (msg["publishers"] && msg["publishers"].length) {
                  var list = msg["publishers"];
                  Janus.debug(
                    "Got a list of available publishers/feeds:",
                    list
                  );
                  for (let f in list) {
                    let id = list[f]["id"];
                    let display = list[f]["display"];
                    let audio = list[f]["audio_codec"];
                    let video = list[f]["video_codec"];
                    display = JSON.parse(display);
                    Janus.debug(
                      "  >> [" +
                        id +
                        "] " +
                        display +
                        " (audio: " +
                        audio +
                        ", video: " +
                        video +
                        ")"
                    );
                    if (display.email !== this.props.email) {
                      console.log(
                        1111,
                        `someone joined: remote email - ${display.email}`
                      );
                      this.newRemoteFeed(id, display, audio, video);
                    }
                  }
                } else if (msg["leaving"]) {
                  let leaving = msg["leaving"];
                  Janus.log("Publisher left: " + leaving);

                  for (var i = 0; i < 4; i++) {
                    if (this.feeds[i] && this.feeds[i].rfid === leaving) {
                      this.feeds[i].detach();
                      this.feeds[i] = null;
                      // this.studentName[feed.rfindex] = null;
                      console.log(1111, "student is leaving index: " + i);
                      break;
                    }
                  }
                } else if (msg["unpublished"]) {
                  var unpublished = msg["unpublished"];
                  Janus.log("Publisher left: " + unpublished);
                  if (unpublished === "ok") {
                    this.sfutest.hangup();
                    return;
                  }

                  for (let i = 0; i < 4; i++) {
                    if (this.feeds[i] && this.feeds[i].rfid === unpublished) {
                      this.feeds[i].detach();
                      this.feeds[i] = null;
                      // this.studentName[feed.rfindex] = null;
                      console.log(1111, "student is unpublishing index: " + i);
                      break;
                    }
                  }
                } else if (msg["error"]) {
                  if (msg["error_code"] === 426) {
                    // no such room error
                  } else {
                    // other errors
                  }
                }
              }
            }
            if (jsep) {
              Janus.debug("Handling SDP as well...", jsep);
              this.sfutest.handleRemoteJsep({ jsep: jsep });
              // Check if any of the media we wanted to publish has
              // been rejected (e.g., wrong or unsupported codec)
              var audio = msg["audio_codec"];
              if (
                this.mystream &&
                this.mystream.getAudioTracks() &&
                this.mystream.getAudioTracks().length > 0 &&
                !audio
              ) {
                // Audio has been rejected
              }
              var video = msg["video_codec"];
              if (
                this.mystream &&
                this.mystream.getVideoTracks() &&
                this.mystream.getVideoTracks().length > 0 &&
                !video
              ) {
                // Video has been rejected
              }
            }
          },
          onlocalstream: stream => {
            Janus.debug(" ::: Got a local stream :::", stream);
            this.mystream = stream;

            if (this.props.isTutor) {
              Janus.attachMediaStream(this.tutorVideo, stream);
              // Janus.attachMediaStream(this.localVideo, stream);
              // console.log(
              //   1111,
              //   `onlocalstream - I am a tutor with email: ${this.props.email}`
              // );
            } else {
              const index = this.state.attendees.findIndex(
                ({ email }) => email === this.props.email
              );

              console.log(
                1111,
                `localStream attendees index ${index}, ${this.props.email}`
              );

              Janus.attachMediaStream(this.studentVideos[index], stream);
              // Janus.attachMediaStream(this.localVideo, stream);
              // console.log(
              //   1111,
              //   `onlocalstream - I am a student with email: ${this.props.email}`
              // );
              this.setState(prevState => ({
                students: [
                  {
                    email: this.props.email,
                    pId: this.props.pId,
                    name: this.props.name
                  },
                  ...prevState.students
                ]
              }));
            }

            var videoTracks = stream.getVideoTracks();
            if (!videoTracks || videoTracks.length === 0) {
              // No webcam
            }
          },
          onremotestream: stream => {
            // The publisher stream is sendonly, we don't expect anything here
          },
          oncleanup: () => {
            Janus.log(
              " ::: Got a cleanup notification: we are unpublished now :::"
            );
            this.mystream = null;
          }
        });
      },
      error: error => {
        Janus.error(error);
      },
      destroyed: () => {
        window.location.reload();
      }
    });
  };

  checkRoom = () => {
    Janus.debug("is room exist...?");
    this.sfutest.send({
      message: { request: "exists", room: this.props.roomId },
      success: data => {
        if (data.exists) {
          this.registerUsername();
        } else {
          Janus.debug("Room is creating...");
          this.sfutest.send({
            message: {
              request: "create",
              // bitrate: this.maximumBitrate / 2,
              publishers: 30,
              // bitrate_cap: true,
              room: this.props.roomId,
              is_private: true
            },
            success: this.registerUsername
          });
        }
      }
    });
  };

  registerUsername = () => {
    const register = {
      request: "join",
      room: this.props.roomId,
      ptype: "publisher"
      // display: JSON.stringify({
      //   email: this.props.email,
      //   pId: this.props.pId,
      //   name: this.props.name
      // })
    };
    this.sfutest.send({ message: register });
  };

  unpublish = () => {
    const message = {
      request: "unpublish"
    };
    this.sfutest.send({ message: message });
  };

  publishOwnFeed(useAudio) {}

  // remoteFeed
  newRemoteFeed(id, display, audio, video) {
    let remoteFeed = null;
    this.janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: this.opaqueId,
      success: pluginHandle => {
        // console.log(1111, "--------- remote feed attach janus ok ----------");
        remoteFeed = pluginHandle;
        remoteFeed.simulcastStarted = false;
        Janus.log(
          "Plugin attached! (" +
            remoteFeed.getPlugin() +
            ", id=" +
            remoteFeed.getId() +
            " as a subscriber)"
        );
        // We wait for the plugin to send us an offer
        const subscribe = {
          request: "join",
          room: this.props.roomId,
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
          subscribe["offer_video"] = false;
        }
        remoteFeed.videoCodec = video;
        remoteFeed.send({ message: subscribe });
      },
      error: error => {
        Janus.error("  -- Error attaching plugin...", error);
      },
      onmessage: (msg, jsep) => {
        Janus.debug(" ::: Got a message (subscriber) :::", msg);
        var event = msg["videoroom"];
        Janus.debug("Event: " + event);
        if (msg["error"]) {
          // handle error if needed
        } else if (event) {
          if (event === "attached") {
            // console.log(
            //   1111,
            //   display.email + ": --------- remote attached ----------"
            // );
            // Subscriber created and attached

            for (let i = 0; i < 4; i++) {
              if (!this.feeds[i]) {
                this.feeds[i] = remoteFeed;
                remoteFeed.rfindex = i;
                console.log(
                  1111,
                  "display: " +
                    display.email +
                    " tutorEmail : " +
                    this.props.tutorEmail
                );
                // add student name when we got now feed
                // this.students[i] = JSON.parse(display).email;
                break;
              }
            }

            remoteFeed.rfid = msg["id"];
            // remoteFeed.rfdisplay = msg["display"];
            remoteFeed.rfdisplay = display.email;
            remoteFeed.name = display.name;
            // remoteFeed.pId = display.pId;
            console.log(1111, "remote.rfdisplay : ----" + remoteFeed.rfdisplay);

            Janus.log(
              "Successfully attached to feed " +
                remoteFeed.rfid +
                " (" +
                remoteFeed.rfdisplay +
                ") in room " +
                msg["room"]
            );
          }
          if (jsep) {
            Janus.debug("Handling SDP as well...", jsep);
            // Answer and attach
            remoteFeed.createAnswer({
              jsep: jsep,
              // Add data:true here if you want to subscribe to datachannels as well
              media: { audioSend: false, videoSend: false }, // We want recvonly audio/video
              success: jsep => {
                Janus.debug("Got SDP!", jsep);
                var body = { request: "start", room: this.props.roomId };
                remoteFeed.send({ message: body, jsep: jsep });
              },
              error: error => {
                Janus.error("WebRTC error:", error);
              }
            });
          }
        }
      },
      iceState: state => {
        Janus.log(
          "ICE state of this WebRTC PeerConnection (feed #" +
            remoteFeed.rfindex +
            ") changed to " +
            state
        );
      },
      webrtcState: on => {
        Janus.log(
          "Janus says this WebRTC PeerConnection (feed #" +
            remoteFeed.rfindex +
            ") is " +
            (on ? "up" : "down") +
            " now"
        );
      },
      onlocalstream: stream => {
        // The subscriber stream is recvonly, we don't expect anything here
      },
      onremotestream: stream => {
        Janus.debug("Remote feed #" + remoteFeed.rfindex + ", stream:", stream);
        if (display.email === this.props.tutorEmail) {
          console.log(
            1111,
            `someone has attached as tutor - display: ${
              display.email
            }, tutorEmail: ${this.props.tutorEmail}`
          );

          Janus.attachMediaStream(this.tutorVideo, stream);

          const tutorMap = data => {
            return data.reduce((acc, cur) => {
              const { email, pId, name } = cur;
              return acc.set(cur.email, { email, pId, name });
            }, new Map());
          };

          this.setState(
            prevState => ({
              tutor: [...tutorMap([...prevState.tutor, display]).values()]
            }),
            () => this.props.setTutor(this.state.tutor)
          );
        } else {
          console.log(
            1111,
            `**** someone has attached as student - display: ${
              display.email
            } rfindex: `
            // remoteFeed.rfindex
          );

          const index = this.state.attendees.findIndex(
            ({ email }) => email === display.email
          );

          console.log(1111, `onremoteStream index: ${index}, ${display.email}`);

          Janus.attachMediaStream(this.studentVideos[index], stream);

          const studentsMap = data => {
            return data.reduce((acc, cur) => {
              const { email, pId, name } = cur;
              return acc.set(cur.email, { email, pId, name });
            }, new Map());
          };

          this.setState(
            prevState => ({
              students: [
                ...studentsMap([...prevState.students, display]).values()
              ]
            }),
            () => this.props.setStudents(this.state.students)
          );
        }

        var videoTracks = stream.getVideoTracks();
        if (!videoTracks || videoTracks.length === 0) {
          // No remote video
        }
      },
      oncleanup: () => {
        Janus.log(
          " ::: Got a cleanup notification (remote feed " + id + ") :::"
        );
      }
    });
  }

  setTutorVideo = video => {
    this.tutorVideo = video;
  };

  setStudentVideo = (video, index) => {
    this.studentVideos[index] = video;
  };

  refreshVideos = () => {
    this.setState({ roomStatus: "connected" });
    if (this.tutorVideo.paused) this.tutorVideo.play();
    this.studentVideos.forEach(v => v.paused && v.play());
  };

  handleVoiceToggleButton = email => {
    if (email !== this.props.email) return;

    this.setState({ audioEnabled: !this.state.audioEnabled }, () => {
      this.sfutest.send({
        message: { request: "configure", audio: this.state.audioEnabled }
      });

      // socketUtil.sendSocketEvent("audioChanged", {
      //   email,
      //   audioEnabled: this.state.audioEnabled
      // });
    });
  };

  handleExitBtn = () => {
    this.showExitConfirmAlert();
  };

  showExitConfirmAlert = () => {
    const callback = () => {
      request.setCompleteReservation({
        reservationId: this.props.reservationId
      });
      // // this.sendData(this.DATA_TYPE_EXIT, null);
      // socketUtil.sendSocketEvent("lectureExit", {
      //   roomId: this.props.roomId
      // });

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
      const url = `${
        URL.WIZLIVE
      }/tutor/feedback/${studentEmail}/${reservationId}/false`;
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

  render() {
    const {
      // isDrawingBoardOn,
      isTutor,
      // lectureVideos,
      // lectureSlides,
      // reservationId,
      // isFreeTrial,
      // handleSelectTab,
      handleChangeZIndex,
      zIndex,
      email,
      tutorEmail
      // reservationId,
      // isFreeTrial
    } = this.props;
    const {
      students,
      audioEnabled,
      // isShowSurveyPopup,
      attendees,
      roomStatus
    } = this.state;
    const {
      tutorName,
      setTutorVideo,
      setStudentVideo,
      feeds,
      // attendees,
      handleVoiceToggleButton,
      handleExitBtn,
      // handleFreeTrialSurvey,
      refreshVideos
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
            // addStudentVideo={this.addStudentVideo}
            // addTutorVideo={this.addTutorVideo}
            setTutorVideo={setTutorVideo}
            setStudentVideo={setStudentVideo}
            // tutorEmail={tutorEmail}
            tutorName={tutorName}
            students={students}
            isTutor={isTutor}
            handleChangeZIndex={handleChangeZIndex}
            feeds={feeds}
            attendees={attendees}
            email={email}
            handleVoiceToggleButton={handleVoiceToggleButton}
            audioEnabled={audioEnabled}
            tutorEmail={tutorEmail}
            handleExitBtn={handleExitBtn}
            refreshVideos={refreshVideos}
          />
        </RndWrapper>
        {/* {isShowSurveyPopup && (
          <FreeTrialSurveyPopup
            reservationId={reservationId}
            tutorEmail={tutorEmail}
            handleFreeTrialSurvey={handleFreeTrialSurvey}
            isFreeTrial={isFreeTrial}
          />
        )} */}
        {roomStatus !== "connected" && (
          <div className="roomStatusPopup">
            <div className="roomStatusPopupContent">
              {roomStatus === "connecting" && (
                <React.Fragment>
                  <div className="roomStatusPopupMessage">접속 중입니다..</div>
                  <div className="roomStatusPopupProgress" />
                </React.Fragment>
              )}
              {roomStatus === "ready" && (
                <React.Fragment>
                  <div className="roomStatusPopupMessage">접속 되었습니다.</div>
                  <div className="roomStatusPopupBtn" onClick={refreshVideos}>
                    시작하기
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  state => {
    const { history, historyIndex, ..._scene } = state.scene;

    return {
      selectedSceneId: state.interaction.selected.scene,
      selectedObject:
        state.interaction.selected.objects[state.interaction.selected.scene],
      pId: state.project.pId,
      scene: _scene,
      interaction: {
        ...state.interaction,
        jukebox: {
          isPlaying: false
        },
        addSoundsTimeStamp: undefined
      },
      preview: state.preview,
      currentUser: state.tabs.currentUser
    };
  },
  {
    setStudents: tabActions.setStudents,
    setTutor: tabActions.setTutor,
    setProject: projectActions.setProject
  }
)(Container);
