import { URL } from "./Constant";
import { detectIE } from "./detectBrowser";
import Achievement from "./Achievement";
import { useState } from "react";

export const fetchSaasRequest = (url, method, param) => {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5OaEpQRXNSTmtaZVJSZ1lRL2dvNVBLMnU1NEhNaDhkZkxGV0VNemNBYkk9IiwibmFtZSI6Ik1BS0VSUyIsInRva2VuRm9yIjoiRURVQ0FUT1IiLCJpYXQiOjE2OTQ2NTQyNTEsImV4cCI6MjU1ODU2Nzg1MX0.VKFEREcGwLbsGf9dOujdK8Se5hBxSwLCHpSH6zJuYGM",
  };

  const requestInfo = {
    method: method,
    headers: headers,
  };

  if (param) requestInfo["body"] = JSON.stringify(param);

  return new Promise((resolve, reject) => {
    fetch(url, requestInfo)
      .then((res) => {
        Achievement.handleResponse(res);
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};

///////////////////////////////////////////////////////////////////////////////
/** SAAS */

export const tagUpdate = (lessonId, tags) => {
  const params = {
    tags: tags,
    lessonId: lessonId,
  };
  return fetchSaasRequest(URL.API_SAAS_SERVER + `lesson/tag`, "POST", params);
};

export const projectIconUpload = (pId) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `project/educator/icon/upload?projectId=${pId}`,
    "GET"
  );
};

export const updateSaasProject = ({ params, pId }) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `project/educator?projectId=${pId}`,
    "PUT",
    params
  );
};

export const createNewProject = (props) => {
  const param = {
    title: props.title ? props.title : "testTemplate",
    useCustomIcon: 1, //or 0
    icon: "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/ff78050de9c8f0715750c4590cbf9640.jpg",
    url: "",
    language: props.language ? props.language : "JS", //or OOBC
    state:
      props.editorFormat === "JS"
        ? {
            scene: {
              scenes: {
                scene1: {
                  sceneName: "scene1",
                  sprites: {
                    gray: {
                      type: "background",
                      assetId: "gray_v3",
                      code: "",
                      preview: {
                        name: "gray",
                        type: "background",
                        angle: 0,
                        left: -199,
                        top: -479,
                        scaleX: 1,
                        scaleY: 1,
                        width: 1678,
                        height: 1678,
                        opacity: 1,
                      },
                    },
                  },
                  spriteIds: ["gray"],
                  preview:
                    "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/c59fb10cb7918db05336bb614cd3a278.jpg",
                  worldWidth: 1280,
                  worldHeight: 720,
                },
              },
              sceneIds: ["scene1"],
              soundIds: [],
              timeStamp: 1619136251326,
              editorMode: "javascript-wiz",
            },
            interaction: {
              selected: {
                objects: { scene1: { name: "gray", type: "background" } },
                api: "ID_PHYSICS",
                method: null,
                scene: "scene1",
              },
              jukebox: { isPlaying: false },
            },
            preview: {
              isPlaying: false,
              isFullScreen: false,
              screenMode: "HORIZONTAL",
              volume: 100,
            },
          }
        : {
            scene: {
              scenes: {
                scene1: {
                  sceneName: "scene1",
                  sprites: {
                    undefined: {
                      code: {
                        lines: [
                          {
                            id: "ujqw3r",
                            block: {
                              id: "1qfds5",
                              mode: "empty",
                              grammars: {
                                sprite: "subject",
                                variable: "subject",
                                function: "subject",
                                util: "subject",
                              },
                              blockTypes: [
                                "sprite",
                                "variable",
                                "function",
                                "util",
                              ],
                              dataTypes: {
                                sprite: [
                                  "sprite",
                                  "screen",
                                  "joystick",
                                  "text",
                                  "sound",
                                ],
                                variable: ["sprite", "function"],
                                function: ["function"],
                                util: ["util", "mobile"],
                              },
                            },
                            folded: false,
                          },
                        ],
                      },
                    },
                    gray: {
                      type: "background",
                      assetId: "gray_v3",
                      code: "",
                      preview: {
                        name: "gray",
                        type: "background",
                        angle: 0,
                        left: -199,
                        top: -479,
                        scaleX: 1,
                        scaleY: 1,
                        width: 1678,
                        height: 1678,
                        opacity: 1,
                      },
                    },
                  },
                  spriteIds: ["gray"],
                  preview:
                    "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/1f1178ed6a853b6b1a2c3b5b84253342.jpg",
                  worldWidth: 1280,
                  worldHeight: 720,
                },
              },
              sceneIds: ["scene1"],
              soundIds: ["documentary_v3"],
              timeStamp: 1674805985227,
              editorMode: "block",
            },
            interaction: {
              selected: {
                objects: {
                  scene1: {
                    name: "gray",
                    type: "background",
                  },
                },
                api: "ID_PHYSICS",
                method: null,
                scene: "scene1",
              },
              jukebox: {
                isPlaying: false,
              },
            },
            preview: {
              isPlaying: false,
              isFullScreen: false,
              screenMode: "HORIZONTAL",
              volume: 100,
            },
          },
  };

  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `project/educator`,
    "POST",
    param
  );
};

export const deleteCourse = (param) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `course?courseId=${param}`,
    "DELETE"
  );
};

export const deleteLesson = (param) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `lesson?lessonId=${param}`,
    "DELETE"
  );
};

export const getSaasAllCourse = () => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + "course/list/available?offset=0&limit=100",
    "GET"
  );
  // return fetchRequest(URL.API_SAAS_SERVER + "course/list?locale=ko", "GET");
};

export const getNewCourse = (param) => {
  return fetchSaasRequest(URL.API_SAAS_SERVER + "course", "POST", param);
};

export const getCourseInfo = (courseId) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `course/info?courseId=${courseId}`
  );
};

export const addLecture = () => {
  const param = {
    locale: "ko", // or "en","zh"
    title: "test_lesson",
    thumbnailURL: "",
    description: "test",
    language: "JS", // JS / OOBC / 3D / PYTHON
    template: "",
    totalMissionNumber: 0,
    sampleGameURL: "",
  };
  return fetchSaasRequest(URL.API_SAAS_SERVER + `lesson`, "POST", param);
};

export const connectCourseAndLecture = ({ courseId, lessonId, order }) => {
  const param = {
    courseId,
    lessonList: [{ id: lessonId, order: order + 1 }],
  };
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `course/register/lesson`,
    "POST",
    param
  );
};

export const getLecture = (lectureId) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `lesson/info?lessonId=${lectureId}`
  );
};

export const updateLecture = (lectureId, lectureValues) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `lesson?lessonId=${lectureId}`,
    "PUT",
    lectureValues
  );
};

export const updateCourse = (lectureId, lectureValues) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `course?courseId=${lectureId}`,
    "PUT",
    lectureValues
  );
};

export const thumbnailUpload = (lectureName) => {
  const param = {
    lessonName: lectureName,
  };
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `lesson/thumbnail/upload`,
    "POST",
    param
  );
};

export const putThumbnail = (putUrl, data) => {
  return fetch(putUrl, {
    method: "PUT",
    body: data,
  });
};

export const getMySaasProject = (params) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER +
      `project/educator/my/list?limit=${params.limit}&offset=${params.offset}`,
    "GET"
  );
};

export const getMyPublishedSaasProject = (params) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER +
      `project/educator/my/list/published?limit=${params.limit}&offset=${params.offset}`,
    "GET"
  );
};

export const getSaasDevelopingProject = (pId) => {
  return fetchSaasRequest(
    URL.API_SAAS_SERVER + `project/educator/info?id=${pId}`,
    "GET"
  );
};

///////////////////////////////////////////////////////////////////////////////

export const fetchOriginRequest = (url, method, param) => {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    platform: "wizlab",
  };
  if (detectIE()) {
    headers["Pragma"] = "no-cache";
  }

  if (localStorage.getItem("astroToken")) {
    headers["Authorization"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidWlkIjo1LCJzaWQiOjAsImRpc3RyaWN0TmFtZSI6IiIsImVtYWlsIjoiZGFubnlAcmVkYnJpY2suc3BhY2UiLCJ1c2VyVHlwZSI6IloiLCJuYW1lIjoia2ltIHRlc3QiLCJmdWxsbmFtZSI6eyJmYW1pbHkiOiJraW0iLCJnaXZlbiI6InRlc3QifSwibmlja05hbWUiOiJUZXN0IiwiaWNvbiI6Imh0dHBzOi8vczMuYXAtbm9ydGhlYXN0LTIuYW1hem9uYXdzLmNvbS93aXpzY2hvb2wtaW1hZ2VzL3Byb2ZpbGUtaW1hZ2UtMDEucG5nIiwiaWF0IjoxNjk0MDU1NDY0fQ.MFqsaqPYZqaHnpfmYgsLX1c5gu5JiuZ0yPRTsReFeB8";
  }

  headers["locale"] = localStorage.getItem("lang");
  headers["domain"] = localStorage.getItem(window.location.hostname);

  const requestInfo = {
    method: method,
    headers: headers,
  };

  if (param) requestInfo["body"] = JSON.stringify(param);

  return new Promise((resolve, reject) => {
    fetch(url, requestInfo)
      .then((res) => {
        Achievement.handleResponse(res);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

///////////////////////////////////////////////////////////////////////////////

export const fetchRequest = (url, method, param) => {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    platform: "wizlab",
  };
  if (detectIE()) {
    headers["Pragma"] = "no-cache";
  }

  if (localStorage.getItem("astroToken")) {
    headers["Authorization"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ilg1bCtGLzlPL3NmS05VRnQ5d25GRm54T2duN0gwSjlhRWtwYlFGYTBkRGM9IiwibmFtZSI6IjEx7YWM7IqkIiwidG9rZW5Gb3IiOiJFRFVDQVRPUiIsImlhdCI6MTY5MzQ1NTk4NSwiZXhwIjoxNjk0MDYwNzg1fQ.SO_xcd_5FcqsBiCyp2u888KaeYetHM0Vnhx_p2nIqCYdd";
  }

  headers["locale"] = localStorage.getItem("lang");
  headers["domain"] = localStorage.getItem(window.location.hostname);

  const requestInfo = {
    method: method,
    headers: headers,
  };

  if (param) requestInfo["body"] = JSON.stringify(param);

  return new Promise((resolve, reject) => {
    fetch(url, requestInfo)
      .then((res) => {
        Achievement.handleResponse(res);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// videoclass temp
export const getWizliveLectures = (param) => {
  return fetchRequest(URL.API_SERVER + `admin/wizlive/lectures`, "POST", param);
};

/**** User */
export const userProfile = (param) => {
  return fetchRequest(URL.API_SERVER + `user/profile/${param.email}`, "GET");
};
export const userProfileById = (param) => {
  return fetchRequest(URL.API_SERVER + `user/${param.userId}`, "GET");
};
export const userEmailById = (param) => {
  return fetchRequest(URL.API_SERVER + `user/email/${param.id}`, "GET");
};
export const login = (param) => {
  return fetchRequest(URL.API_SERVER + "account/login", "POST", param);
};
export const loginByToken = (param) => {
  return fetchRequest(URL.API_SERVER + "user/loginByToken", "POST", param);
};

export const signup = (param) => {
  return fetchRequest(URL.API_SERVER + "user/signup", "POST", param);
};
export const signout = (param) => {
  return fetchRequest(URL.API_SERVER + "user/signout", "POST", param);
};
export const updateUserInfo = (param) => {
  return fetchRequest(URL.API_SERVER + "user/update", "POST", param);
};
export const getUserNameHistory = (param) => {
  return fetchRequest(URL.API_SERVER + "user/name/history", "POST", param);
};
export const sendPasswordMail = (param) => {
  return fetchRequest(URL.API_SERVER + "user/sendPasswordMail/", "POST", param);
};
export const userCounts = (param) => {
  return fetchRequest(URL.API_SERVER + `user/userCounts/${param.email}`, "GET");
};
export const getBadgeCount = (param) => {
  return fetchRequest(URL.API_SERVER + `user/badge/${param.email}`, "GET");
};
export const updateBuilderUsageTime = (param) => {
  return fetchRequest(
    URL.API_SERVER + `user/updateBuilderUsageTime/${param.email}/${param.time}`,
    "PUT"
  );
};
export const getUserApkTicket = (param) => {
  return fetchRequest(URL.API_SERVER + `user/apkticket/${param.id}`, "GET");
};

/**** Report */
export const postReport = (param) => {
  return fetchRequest(URL.API_SERVER + "report", "POST", param);
};

/**** SMS */
export const smsIssue = (param) => {
  return fetchRequest(URL.API_SERVER + "sms/issue", "POST", param);
};
export const smsCheck = (param) => {
  return fetchRequest(URL.API_SERVER + "sms/check", "POST", param);
};
export const smsPlayLink = (param) => {
  return fetchRequest(URL.API_SERVER + "sms/playLink", "POST", param);
};

export const smsApkDownloadLink = (param) => {
  return fetchRequest(URL.API_SERVER + `sms/apkDownload`, "POST", param);
};

export const postSendStudentMessage = (param) => {
  return fetchRequest(
    URL.API_SERVER + `wizLive/reservation/tutor/sendStudentMessage`,
    "POST",
    param
  );
};

/**** page */
export const getHomeInfo = (param) => {
  return fetchRequest(URL.API_SERVER + `page/home`, "GET");
};
export const getDashboardInfo = (param) => {
  return fetchRequest(URL.API_SERVER + `page/dashboard/${param.email}`, "GET");
};
export const getWizAppInfo = (param) => {
  return fetchRequest(URL.API_SERVER + "page/wizappMobile", "GET");
};
export const getWizClassInfo = (param) => {
  return fetchRequest(URL.API_SERVER + "page/wizclass", "GET");
};
export const getUserRankingInfo = (param) => {
  return fetchRequest(URL.API_SERVER + "page/ranking", "POST", param);
};

/**** Project */
export const getDefaultProject = (param) => {
  return fetchRequest(URL.API_SERVER + "project/default", "GET");
};

export const getDefaultTemplateProject = (param) => {
  return fetchRequest(URL.API_SERVER + `project/template/${param.id}`, "GET");
};

export const getTemplateProjectsByType = (param) => {
  return fetchOriginRequest(
    URL.API_SERVER + `templates/bytype/${param.type}`,
    "GET"
  );
};

export const getTemplateProjectsByKeyword = (param) => {
  return fetchRequest(URL.API_SERVER + `templates/byKeyword`, "POST", param);
};

export const getDevelopingProject = (param) => {
  return fetchRequest(
    URL.API_SERVER + `project/developing/${param.pId}`,
    "GET"
  );
};
export const getDevelopingProjectInfo = (param) => {
  return fetchRequest(
    URL.API_SERVER + `project/developing/info/${param.pId}`,
    "GET"
  );
};
export const getDevelopingProjects = (param) => {
  const { email, offset, limit, keyword } = param;
  return fetchRequest(
    URL.API_SERVER +
      `project/developings/${email}/${offset}/${limit}/${keyword}`,
    "GET"
  );
};
export const getDevelopingProjectsByType = (param) => {
  return fetchRequest(
    URL.API_SERVER + `project/developings/bytype`,
    "POST",
    param
  );
};

export const getSharedProjects = (param) => {
  return fetchRequest(URL.API_SERVER + "project/shared", "GET");
};
export const getPublishedProject = (param) => {
  return fetchRequest(URL.API_SERVER + `project/published/${param.pId}`, "GET");
};
export const getPublishedProjectV2 = (param) => {
  return fetchRequest(
    URL.API_SERVER + `project/v2/published/${param.pId}`,
    "GET"
  );
};
export const getPublishedProjects = (param) => {
  const { email, offset, limit } = param;
  return fetchRequest(
    URL.API_SERVER + `project/publisheds/${email}/${offset}/${limit}`,
    "GET"
  );
};

export const getPublishedProjectsByUserWithOffset = (param) => {
  return fetchRequest(URL.API_SERVER + `project/publisheds/get`, "POST", param);
};

export const getPublishedProjectByKeyword = (param) => {
  const { keyword } = param;
  return fetchRequest(URL.API_SERVER + `project/search/${keyword}`, "GET");
};

export const updatePublishedProjectsViewCount = (param) => {
  const { pId } = param;
  return fetchRequest(
    URL.API_SERVER + `project/published/viewcount/${pId}`,
    "PUT"
  );
};
export const getPublishedProjectsByLive = (param) => {
  return fetchRequest(
    URL.API_SERVER + `project/getPublishedProjectsByLive`,
    "POST",
    param
  );
};

export const getPublishedProjectsByType = (param) => {
  return fetchRequest(
    URL.API_SERVER + `project/getPublisheds/bytype`,
    "POST",
    param
  );
};

export const postDevelopingProject = (param) => {
  return fetchRequest(URL.API_SERVER + "project/developing", "POST", param);
};
export const updateDevelopingProject = (param) => {
  return fetchRequest(
    URL.API_SERVER + `project/developing/${param.pId}`,
    "PUT",
    param
  );
};
export const deleteDevelopingProject = (param) => {
  return fetchRequest(
    URL.API_SERVER + `project/developing/${param.pId}/${param.email}`,
    "DELETE"
  );
};
export const copyDevelopingProject = (param) => {
  return fetchRequest(
    URL.API_SERVER + `project/developing/copy`,
    "POST",
    param
  );
};
export const postSharedProject = (param) => {
  return fetchRequest(URL.API_SERVER + "project/shared", "POST", param);
};
export const postPublishedProject = (param) => {
  return fetchRequest(URL.API_SERVER + "project/published", "POST", param);
};
export const getWizlabPlayPage = (param) => {
  return fetchRequest(
    URL.API_SERVER + "project/getWizlabPlayPage",
    "POST",
    param
  );
};
export const getAppsBy = (param) => {
  const { mode, offset, limit } = param;
  return fetchRequest(
    URL.API_SERVER + `project/getAppsBy/${mode}/${offset}/${limit}`,
    "GET"
  );
};

export const getAllStates = (param) => {
  return fetchRequest(URL.API_SERVER + `project/states/${param.email}`, "GET");
};

export const getPopularTag = (param) => {
  return fetchRequest(URL.API_SERVER + `project/tag/popular`, "GET");
};

/*** wiz class */
export const getWizClass = (param) => {
  return fetchRequest(URL.API_SERVER + `wizclass/${param.cId}`, "GET");
};
export const getPurchased = (param) => {
  return fetchRequest(
    URL.API_SERVER + `wizclass/purchased/${param.cId}/${param.email}`,
    "GET"
  );
};
export const getPurchasedByPID = (param) => {
  return fetchRequest(
    URL.API_SERVER + `wizclass/purchased/pId/${param.pId}/${param.email}`,
    "GET"
  );
};
export const updatePurchasedByPID = (param) => {
  return fetchRequest(
    URL.API_SERVER + `wizclass/purchased/pId/${param.pId}`,
    "PUT",
    param
  );
};

export const purchaseWizClass = (param) => {
  return fetchRequest(URL.API_SERVER + "wizclass/purchase", "POST", param);
};

/*** comment */
export const getComments = (param) => {
  return fetchRequest(
    URL.API_SERVER +
      `${param.parentType}/comment/${param.parentId}/${param.limit}/${param.offset}`,
    "GET"
  );
};
export const postComment = (param) => {
  return fetchRequest(
    URL.API_SERVER + `${param.parentType}/comment`,
    "POST",
    param
  );
};
export const deleteComment = (param) => {
  return fetchRequest(
    URL.API_SERVER + `published/comment/${param.id}`,
    "DELETE"
  );
};
export const editComment = (param) => {
  return fetchRequest(URL.API_SERVER + `published/comment`, "PUT", param);
};

export const postReply = (param) => {
  return fetchRequest(
    URL.API_SERVER + `${param.parentType}/reply`,
    "POST",
    param
  );
};
export const deleteReply = (param) => {
  return fetchRequest(URL.API_SERVER + `published/reply/${param.id}`, "DELETE");
};
export const editReply = (param) => {
  return fetchRequest(URL.API_SERVER + `published/reply`, "PUT", param);
};

/*** like */
export const updatePublishedLike = (param) => {
  return fetchRequest(URL.API_SERVER + "published/like", "POST", param);
};
export const getPublishedLike = (param) => {
  return fetchRequest(
    URL.API_SERVER + `published/like/${param.pId}/${param.email}`,
    "GET"
  );
};

/*** upload */
export const upload = (formData) => {
  return fetch(URL.API_SERVER + "upload", {
    method: "POST",
    body: formData,
  });
};
export const uploadAsset = (formData) => {
  return fetch(URL.API_SERVER + "upload/asset", {
    method: "POST",
    body: formData,
  });
};
export const uploadPublished = (param) => {
  return fetchRequest(URL.API_SERVER + "upload/published", "POST", param);
};

/*** basic class */
export const getBasicClasses = (param) => {
  return fetchRequest(URL.API_SERVER + `basic`, "GET");
};

export const getBasicClass = (param) => {
  return fetchRequest(URL.API_SERVER + `basic/${param.id}`, "GET");
};

export const getBasicClassItem = (param) => {
  return fetchRequest(URL.API_SERVER + `basic/item/${param.id}`, "GET");
};

/*** unit complete */
export const getUnitCompletes = (param) => {
  //param:{email:userEmail}
  return fetchRequest(URL.API_SERVER + `unitComplete/${param.email}`, "GET");
};
export const getUnitCompletesByClassId = (param) => {
  //param:{email:userEmail,classId:classId}
  return fetchRequest(
    URL.API_SERVER + `unitComplete/${param.email}/${param.classId}`,
    "GET"
  );
};
export const addUnitComplete = (param) => {
  //param:{email:userEmail,itemId:itemId,classId:classId}
  return fetchRequest(URL.API_SERVER + `unitComplete`, "POST", param);
};
export const resetUnitCompletes = (param) => {
  //param:{email:userEmail, classId:classId}
  return fetchRequest(
    URL.API_SERVER + `unitComplete/${param.email}/${param.classId}`,
    "DELETE"
  );
};

/*** asset */
export const assetsById = (param) => {
  return fetchRequest(URL.API_SERVER + "asset/getByIds", "POST", param);
};

// export const assetsByCategory = (param) => {
//   return fetchRequest(URL.API_SERVER + `assets/${param.categoryId}`, "GET");
// };

// export const getCategories = (param) => {
//   return fetchRequest(URL.API_SERVER + `categories`, "GET");
// };

export const addAsset = (param) => {
  return fetchRequest(URL.API_SERVER + "asset", "POST", param);
};

export const assetsByCategory = (param) => {
  return fetchRequest(
    `https://apiserver.wizlab.net/assets/${param.categoryId}`,
    "GET"
  );
};

export const getCategories = (param) => {
  return fetchRequest(`https://apiserver.wizlab.net/categories`, "GET");
};

/*** billing */
export const billingHoldPayment = (param) => {
  return fetchRequest(URL.API_SERVER + "billing/holdPayment", "POST", param);
};
export const billingNewCustomerWhoPaid = (param) => {
  return fetchRequest(
    URL.API_SERVER + "billing/newCustomerWhoPaid",
    "POST",
    param
  );
};
export const billingUnsubscribe = (param) => {
  // email, refund
  // return { "lastPayment": 1, "scheduledPayment": 1 }
  return fetchRequest(URL.API_SERVER + `billing/unsubscribe`, "POST", param);
};
export const billingInfo = (param) => {
  return fetchRequest(URL.API_SERVER + `billing/info/${param.email}`, "GET");
};
export const billingUpdateMembership = (param) => {
  return fetchRequest(
    URL.API_SERVER + `billing/updateMembership`,
    "POST",
    param
  );
};

/*** event */
export const getEvents = (param) => {
  return fetchRequest(URL.API_SERVER + `events`, "GET");
};
export const getEvent1Progress = (param) => {
  return fetchRequest(URL.API_SERVER + `event/event1/progress`, "GET");
};

/*** community */
export const getCommunityArticles = (param) => {
  return fetchRequest(
    URL.API_SERVER + `community/articles/${param.limit}/${param.offset}`,
    "GET"
  );
};

export const getCommunityArticle = (param) => {
  return fetchRequest(
    URL.API_SERVER + `community/article/${param.articleId}`,
    "GET"
  );
};

export const addCommunityArticle = (param) => {
  return fetchRequest(URL.API_SERVER + "community/article", "POST", param);
};

export const updateCommunityArticle = (param) => {
  return fetchRequest(URL.API_SERVER + "community/article", "PUT", param);
};

export const deleteCommunityArticle = (param) => {
  return fetchRequest(
    URL.API_SERVER + `community/article/${param.id}`,
    "delete"
  );
};

export const getCommunityArticleComments = (param) => {
  return fetchRequest(
    URL.API_SERVER + `community/article/comments/${param.articleId}`,
    "GET"
  );
};

export const addCommunityArticleComment = (param) => {
  return fetchRequest(
    URL.API_SERVER + "community/article/comment",
    "POST",
    param
  );
};

export const updateCommunityArticleComment = (param) => {
  return fetchRequest(
    URL.API_SERVER + "community/article/comment",
    "PUT",
    param
  );
};

export const deleteCommunityArticleComment = (param) => {
  return fetchRequest(
    URL.API_SERVER + `community/article/comment/${param.id}`,
    "delete"
  );
};

export const getCommunityArticleCommentReplies = (param) => {
  return fetchRequest(
    URL.API_SERVER + `community/article/comment/replies/${param.commentId}`,
    "GET"
  );
};
export const addCommunityArticleCommentReply = (param) => {
  return fetchRequest(
    URL.API_SERVER + "community/article/comment/reply",
    "POST",
    param
  );
};

export const updateCommunityArticleReply = (param) => {
  return fetchRequest(
    URL.API_SERVER + "community/article/comment/reply",
    "PUT",
    param
  );
};

export const deleteCommunityArticleReply = (param) => {
  return fetchRequest(
    URL.API_SERVER + `community/article/comment/reply/${param.id}`,
    "delete"
  );
};

export const getCommunityRankings = (param) => {
  return fetchRequest(
    URL.API_SERVER + `community/rankings/${param.limit}`,
    "GET"
  );
};

export const selectComment = (param) => {
  return fetchRequest(
    URL.API_SERVER + "community/article/select",
    "POST",
    param
  );
};

/*** payment */
export const checkPaymentValidation = (param) => {
  return fetchRequest(
    URL.API_SERVER + "payments/checkValidation",
    "POST",
    param
  );
};

export const addCLabPayment = (param) => {
  return fetchRequest(URL.API_SERVER + "payments", "POST", param);
};

export const cancelCLabPayment = (param) => {
  return fetchRequest(
    URL.API_SERVER + "payments/clab_payments_canceled",
    "PUT",
    param
  );
};

export const addCLabSchedules = (param) => {
  return fetchRequest(URL.API_SERVER + "payments/schedules", "POST", param);
};

export const getCLabPayment = (param) => {
  return fetchRequest(
    URL.API_SERVER + `payments/${param.email}/${param.productId}`,
    "GET"
  );
};

export const getCLabPaymentAll = (param) => {
  return fetchRequest(URL.API_SERVER + `payments/${param.email}`, "GET");
};

/*** product */
export const getCLabProducts = (param) => {
  return fetchRequest(URL.API_SERVER + `products/${param.productType}`, "GET");
};
export const getCLabProduct = (param) => {
  return fetchRequest(URL.API_SERVER + `product/${param.id}`, "GET");
};

/*** clive */
export const getCLiveReservation = (param) => {
  return fetchRequest(URL.API_SERVER + `clive/reservation/${param.id}`, "GET");
};
export const addCLivePayment = (param) => {
  return fetchRequest(URL.API_SERVER + `clivePayments`, "POST", param);
};
export const cancelCLivePayment = (param) => {
  return fetchRequest(
    URL.API_SERVER + "clivePayments/payments_canceled",
    "PUT",
    param
  );
};
export const getCLivePayment = (param) => {
  return fetchRequest(
    URL.API_SERVER + `clivePayment/${param.reservationId}`,
    "GET"
  );
};
export const getCLivePaymentAll = (param) => {
  return fetchRequest(URL.API_SERVER + `clivePayments/${param.email}`, "GET");
};

/*** gameRanking */
export const getGameRanking = (param) => {
  const { pId } = param;
  return fetchRequest(URL.API_SERVER + `gameRanking/${pId}`, "GET");
};
export const getGameRankingAsc = (param) => {
  const { pId } = param;
  return fetchRequest(URL.API_SERVER + `gameRanking/asc/${pId}`, "GET");
};

export const saveScore = (param) => {
  return fetchRequest(URL.API_SERVER + "gameRanking", "POST", param);
};

/*** clab portfolio */
export const getPortfolios = (param) => {
  return fetchRequest(URL.API_SERVER + `project/portfolios`, "GET");
};

/*** statistics */
export const sendToStatistics = (param) => {
  return fetchRequest(URL.API_SERVER + "statistics", "POST", param);
};

/*** C.Live */
export const getTutorsReservation = (param) => {
  const { year, month, day } = param;
  return fetchRequest(
    URL.API_SERVER + `clive/reservations/tutors/${year}/${month}/${day}`,
    "GET"
  );
};

export const getTutorReservation = (param) => {
  const { email, year, month, day } = param;
  return fetchRequest(
    URL.API_SERVER +
      `clive/reservations/tutor/${email}/${year}/${month}/${day}`,
    "GET"
  );
};

export const getStudentReservation = (param) => {
  const { email, year, month, day } = param;
  return fetchRequest(
    URL.API_SERVER +
      `clive/reservations/student/${email}/${year}/${month}/${day}`,
    "GET"
  );
};

export const getTutor = (param) => {
  return fetchRequest(URL.API_SERVER + `clive/tutor/${param.email}`, "GET");
};

export const getRoomId = (param) => {
  return fetchRequest(URL.API_SERVER + `clive/roomId/${param.email}`, "GET");
};

/*** CLive Payments */
export const getClivePaymentById = (param) => {
  const { reservationId } = param;
  return fetchRequest(URL.API_SERVER + `clivePayment/${reservationId}`, "GET");
};

/*** premium classes */
export const getPremiumClasses = (param) => {
  return fetchRequest(URL.API_SERVER + "premiumClasses", "GET");
};
export const getPremiumClass = (param) => {
  return fetchRequest(URL.API_SERVER + `premiumClasses/${param.id}`, "GET");
};
export const purchasePremiumClass = (param) => {
  return fetchRequest(
    URL.API_SERVER + "premiumClasses/purchase",
    "POST",
    param
  );
};
export const getPurchasedPremiumClass = (param) => {
  return fetchRequest(
    URL.API_SERVER + `premiumClasses/purchased/${param.email}/${param.classId}`,
    "GET"
  );
};
export const getPurchasedPremiumClasses = (param) => {
  return fetchRequest(
    URL.API_SERVER + `premiumClasses/purchased/${param.email}`,
    "GET"
  );
};
export const updatePurchasedPremiumClass = (param) => {
  return fetchRequest(
    URL.API_SERVER + `premiumClasses/purchased/${param.id}`,
    "PUT",
    param
  );
};

export const getPremiumClassProjects = (param) => {
  return fetchRequest(
    URL.API_SERVER + `premiumClasses/developings/${param.email}`,
    "GET"
  );
};

/*** point payment */
export const addPointPayment = (param) => {
  return fetchRequest(URL.API_SERVER + "pointPayments", "POST", param);
};

export const cancelPointPayment = (param) => {
  return fetchRequest(
    URL.API_SERVER + "pointPayments/payments_canceled",
    "PUT",
    param
  );
};

export const getPointPayment = (param) => {
  return fetchRequest(URL.API_SERVER + `pointPayment/${param.id}`, "GET");
};

export const getPointPaymentAll = (param) => {
  return fetchRequest(URL.API_SERVER + `pointPayments/${param.email}`, "GET");
};

export const pushInstantRun = (param) => {
  return fetchRequest(URL.API_SERVER + `push/instantRun`, "POST", param);
};

/*** noti */
export const getNotifications = (param) => {
  return fetchRequest(
    URL.API_SERVER +
      `notification/${param.email}/${param.limit}/${param.offset}`,
    "GET"
  );
};

/*** subscribe */
export const getRecommendedUsers = (param) => {
  return fetchRequest(URL.API_SERVER + `subscribe/recommendeds`, "GET");
};

export const getSubscribesByType = (param) => {
  return fetchRequest(URL.API_SERVER + `subscribe/creators`, "POST", param);
};

export const isSubscribe = (param) => {
  return fetchRequest(
    URL.API_SERVER +
      `subscribe/isSubscribe/${param.email}/${param.creatorEmail}`,
    "GET"
  );
};

export const getProjectsBySubscibe = (param) => {
  return fetchRequest(
    URL.API_SERVER + `project/subscribe/${param.offset}/${param.limit}`,
    "POST",
    param
  );
};

export const addGamePlay = (param) => {
  return fetchRequest(URL.API_SERVER + "project/gamePlay", "POST", param);
};

export const addSubscribe = (param) => {
  return fetchRequest(URL.API_SERVER + `subscribe`, "POST", param);
};

export const removeSubscribe = (param) => {
  return fetchRequest(
    URL.API_SERVER + `subscribe/${param.email}/${param.creatorEmail}`,
    "DELETE"
  );
};

/*** products */
export const getProducts = (param) => {
  return fetchRequest(URL.API_SERVER + `product/type/${param.type}`, "GET");
};
export const getProduct = (param) => {
  return fetchRequest(URL.API_SERVER + `product/id/${param.id}`, "GET");
};

/*** payments */
export const addPayment = (param) => {
  return fetchRequest(URL.API_SERVER + `payment`, "POST", param);
};
export const cancelPayment = (param) => {
  return fetchRequest(
    URL.API_SERVER + `payment/cancel/${param.id}`,
    "PUT",
    param
  );
};
export const getPaymentResult = (param) => {
  return fetchRequest(
    URL.API_SERVER + `payment/result/${param.email}/${param.id}`,
    "GET"
  );
};
export const getPaymentResults = (param) => {
  return fetchRequest(URL.API_SERVER + `payment/result/${param.email}`, "GET");
};

export const postFeedbackFromStudentWizLive = (param) => {
  return fetchRequest(
    URL.API_SERVER + "wizLive/student/dashboard/feedback",
    "POST",
    param
  );
};

// wizlive send entrance
export const postLiveEntrance = (param) => {
  return fetchRequest(URL.API_SERVER + `liveTutor/entrance`, "POST", param);
};

// wizlive status send to slack
export const sendWizLiveWebhook = (param) => {
  return fetchRequest(URL.API_SERVER + `liveTutor/webhook`, "POST", param);
};
export const sendWizLabReport = (param) => {
  return fetchRequest(
    URL.API_SERVER + `liveTutor/webhook/report`,
    "POST",
    param
  );
};

//game data
export const loadGameData = (param) => {
  return fetchRequest(URL.API_SERVER + `gameData/load`, "POST", param);
};

export const saveGameData = (param) => {
  return fetchRequest(URL.API_SERVER + `gameData/save`, "POST", param);
};

/** wiz lab project list */
export const getProjectListForTutor = (param) => {
  return fetchRequest(URL.API_SERVER + `project/list/tutor`, "GET");
};

export const getProjectLoadForTutor = (param) => {
  return fetchRequest(URL.API_SERVER + `project/load/tutor/${param.id}`, "GET");
};

/** monitor */
export const getTodayAvailableRooms = (param) => {
  return fetchRequest(
    URL.API_SERVER + `wizLive/todayAvailableRooms/${param.type}`,
    "GET"
  );
};

// new wizlive
export const getWizLiveRoomId = (param) => {
  return fetchRequest(URL.API_SERVER + `wizLive/room/${param.email}`, "GET");
};

export const getWizLive1v4RoomId = (param) => {
  return fetchRequest(
    URL.API_SERVER + `wizLive/room/${param.email}/${param.roomId}`,
    "GET"
  );
};

export const getMonitorRoom1v4 = (param) => {
  return fetchRequest(
    URL.API_SERVER + `wizLive/monitor/room/${param.email}`,
    "GET"
  );
};

export const getReservationById = (param) => {
  return fetchRequest(
    URL.API_SERVER + `wizLive/reservation/id/${param.reservationId}`,
    "GET"
  );
};

// wizlive send entrance
export const postWizLiveEntrance = (param) => {
  return fetchRequest(URL.API_SERVER + `wizLive/entrance`, "POST", param);
};

// wizlive_1v4 send entrance
export const postWizLive1v4Entrance = (param) => {
  return fetchRequest(URL.API_SERVER + `wizLive/1v4/entrance`, "POST", param);
};

export const setCompleteReservation = (param) => {
  return fetchRequest(
    URL.API_SERVER + `wizLive/setCompleteReservation`,
    "PUT",
    param
  );
};

export const setComplete1v4Reservation = () => {
  return fetchRequest(
    URL.API_SERVER + `wizLive/setComplete1v4Reservations`,
    "PATCH"
  );
};

export const postSurvey = (param) => {
  return fetchRequest(URL.API_SERVER + `survey`, "POST", param);
};

//get record info
export const getS3Json = (param) => {
  return fetch(param.url, {
    method: "GET",
    headers: {},
  });
};

// game
export const getGameInfo = (param) => {
  return fetchRequest(URL.API_SERVER + `page/game`, "GET");
};

//project templates
export const getTemplateProjects = (param) => {
  return fetchRequest(URL.API_SERVER + "templates/", "GET", param);
};

// social
export const getSocialArticles = (param) => {
  return fetchRequest(URL.API_SERVER + `social/articles`, "POST", param);
};

export const getSocialArticle = (id) => {
  return fetchRequest(URL.API_SERVER + `social/article/${id}`, "GET");
};

export const addSocialArticle = (param) => {
  return fetchRequest(URL.API_SERVER + `social/article/add`, "POST", param);
};

export const updateSocialArticle = (param) => {
  return fetchRequest(URL.API_SERVER + `social/article/update`, "POST", param);
};

export const likeSocialArticle = (param) => {
  return fetchRequest(URL.API_SERVER + `social/article/like`, "POST", param);
};

export const deleteSocialArticle = (id) => {
  return fetchRequest(URL.API_SERVER + `social/article/delete/${id}`, "DELETE");
};

export const addSocialComment = (param) => {
  return fetchRequest(URL.API_SERVER + `social/comment/add`, "POST", param);
};

export const updateSocialComment = (param) => {
  return fetchRequest(URL.API_SERVER + `social/comment/update`, "POST", param);
};

export const likeSocialComment = (param) => {
  return fetchRequest(URL.API_SERVER + `social/comment/like`, "POST", param);
};

export const deleteSocialComment = (id) => {
  return fetchRequest(URL.API_SERVER + `social/comment/delete/${id}`, "DELETE");
};

export const selectSocialQuest = (param) => {
  return fetchRequest(URL.API_SERVER + `social/selectquest`, "POST", param);
};

export const getSocialTrends = (param) => {
  return fetchRequest(URL.API_SERVER + `social/trends`, "POST", param);
};

export const getSocialSubscribeNews = (param) => {
  return fetchRequest(URL.API_SERVER + `social/subscribenews`, "POST", param);
};

/** tutorial */
export const getTutorialList = (param) => {
  return fetchRequest(URL.API_SERVER + `tutorial/list`, "GET");
};

export const getMyTutorialList = (param) => {
  return fetchRequest(URL.API_SERVER + `tutorial/list/${param.email}`, "GET");
};

export const getMyTutorial = (param) => {
  return fetchRequest(
    URL.API_SERVER + `tutorial/get/${param.email}/${param.level}`,
    "GET"
  );
};

export const createTutorialItem = (param) => {
  return fetchRequest(
    URL.API_SERVER + `tutorial/create/${param.email}/${param.level}`,
    "GET"
  );
};

export const updateTutorialItem = (param) => {
  return fetchRequest(URL.API_SERVER + `tutorial/update`, "POST", param);
};
// chat
export const getChatMessages = (param) => {
  return fetchRequest(URL.API_SERVER + `chat/messages/${param.roomId}`, "GET");
};

//recommend code
export const getRecommendCode = (param) => {
  return fetchRequest(URL.API_SERVER + `recommendCode/${param.email}`, "GET");
};
export const getRecommendRanking = (param) => {
  return fetchRequest(URL.API_SERVER + `recommendCodes`, "GET");
};
export const checkRecommendCode = (param) => {
  return fetchRequest(
    URL.API_SERVER + `recommendCode/checkValidate/${param.recommendCode}`,
    "GET"
  );
};

export const sendEmailSMS = (param) => {
  return fetchRequest(URL.API_SERVER + "user/sendEmailSms", "POST", param);
};

export const showEvent1Result = (param) => {
  return fetchRequest(
    URL.API_SERVER + `event/event1/result/${param.email}`,
    "GET"
  );
};

//OCP
export const addOcpUser = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/user/add`, "POST", param);
};

export const getMyOcp = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/myOcp`, "POST", param);
};

export const updateMyOcpSync = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/myOcp/update`, "POST", param);
};

export const updateMyOcpLevel = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/myOcp/level`, "POST", param);
};
export const updateOcpUser = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/user/update`, "POST", param);
};

export const getOcpUser = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/user`, "POST", param);
};

export const getOcpSuccessUser = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/user/success`, "POST", param);
};

export const addMyOcp = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/myOcp/add`, "POST", param);
};

export const updateMyOcpPrint = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/myOcp/print`, "POST", param);
};

//OCP2
export const addOcpUser2 = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/s2/user/add`, "POST", param);
};

export const getMyOcp2 = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/s2/myOcp/type`, "POST", param);
};

export const updateMyOcpSync2 = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/s2/myOcp/update`, "POST", param);
};

export const updateMyOcpLevel2 = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/s2/myOcp/level`, "POST", param);
};
export const updateOcpUser2 = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/s2/user/update`, "POST", param);
};

export const getOcpUser2 = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/s2/user`, "POST", param);
};

export const getOcpSuccessUser2 = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/s2/user/success`, "POST", param);
};

export const addMyOcp2 = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/s2/myOcp/add`, "POST", param);
};

export const updateMyOcpPrint2 = (param) => {
  return fetchRequest(URL.API_SERVER + `ocp/s2/myOcp/print`, "POST", param);
};

export const getOCPComments = (param) => {
  return fetchRequest(URL.API_SERVER + "ocp/s2/comments/get", "POST", param);
};
export const getOCPCommentsByEmail = (param) => {
  return fetchRequest(
    URL.API_SERVER + "ocp/s2/comments/getByEmail",
    "POST",
    param
  );
};
export const getOCPCount = (param) => {
  return fetchRequest(URL.API_SERVER + "ocp/s2/count/get", "POST", param);
};

export const addOCPComment = (param) => {
  return fetchRequest(URL.API_SERVER + "ocp/s2/comment/add", "POST", param);
};

export const deleteOCPComment = (param) => {
  return fetchRequest(URL.API_SERVER + "ocp/s2/comment/delete", "POST", param);
};

export const addOCPReport = (param) => {
  return fetchRequest(
    URL.API_SERVER + "ocp/s2/comment/report/add",
    "POST",
    param
  );
};

/** RoomEscape event  */
export const addRoomEscape = (param) => {
  return fetchRequest(URL.API_SERVER + `event/roomescape`, "POST", param);
};

export const getRoomEscape = (param) => {
  return fetchRequest(URL.API_SERVER + `event/roomescape/list`, "POST", param);
};

export const checkAttendEventRoomEscape = (param) => {
  return fetchRequest(URL.API_SERVER + `event/roomescape/my`, "POST", param);
};

//SEF
export const addSefUser = (param) => {
  return fetchRequest(URL.API_SERVER + `sef/user/add`, "POST", param);
};

export const getMySef = (param) => {
  return fetchRequest(URL.API_SERVER + `sef/mySef`, "POST", param);
};

export const updateMySefSync = (param) => {
  return fetchRequest(URL.API_SERVER + `sef/mySef/update`, "POST", param);
};

export const updateMySefLevel = (param) => {
  return fetchRequest(URL.API_SERVER + `sef/mySef/level`, "POST", param);
};
export const updateSefUser = (param) => {
  return fetchRequest(URL.API_SERVER + `sef/user/update`, "POST", param);
};

export const getSefUser = (param) => {
  return fetchRequest(URL.API_SERVER + `sef/user`, "POST", param);
};

export const getSefSuccessUser = (param) => {
  return fetchRequest(URL.API_SERVER + `sef/user/success`, "POST", param);
};

export const addMySef = (param) => {
  return fetchRequest(URL.API_SERVER + `sef/mySef/add`, "POST", param);
};

//bingo
export const checkShareBingo = (param) => {
  return fetchRequest(URL.API_SERVER + "bingo/checkShareBingo", "POST", param);
};
export const checkLikeGameBingo = (param) => {
  return fetchRequest(
    URL.API_SERVER + "bingo/checkLikeGameBingo",
    "POST",
    param
  );
};
export const readBingo = (param) => {
  return fetchRequest(URL.API_SERVER + "bingo/read", "POST", param);
};
export const getUnreadBingoEvents = (param) => {
  return fetchRequest(URL.API_SERVER + `bingo/unreads/${param.email}`, "GET");
};
export const getBingoEvents = (param) => {
  return fetchRequest(URL.API_SERVER + `bingo/${param.email}`, "GET");
};

export const getSsafyProjects = (param) => {
  return fetchRequest(URL.API_SERVER + "ssafy/getProjects", "POST", param);
};

export const getJJProjects = (param) => {
  return fetchRequest(URL.API_SERVER + "jj/getProjects", "POST", param);
};

// MyCodingStyle
export const createMyCodingStyleParticipant = (param) => {
  return fetchRequest(URL.API_SERVER + "myCodingStyle/create", "POST", param);
};
export const completeMyCodingStyleParticipant = (param) => {
  return fetchRequest(URL.API_SERVER + "myCodingStyle/complete", "POST", param);
};
export const updateMyCodingStyleParticipant = (param) => {
  return fetchRequest(URL.API_SERVER + "myCodingStyle/update", "POST", param);
};

//main page
export const getRankingByType = (param) => {
  return fetchRequest(URL.API_SERVER + `users/ranking/${param.type}`, "GET");
};

export const getEditorRecommends = (param) => {
  return fetchRequest(
    URL.API_SERVER + `projects/recommend/editor`,
    "POST",
    param
  );
};
export const getOcp2ChallengeNews = (param) => {
  return fetchRequest(
    URL.API_SERVER + "event/ocp/s2/challenge/news",
    "POST",
    param
  );
};

export const getWizlabEvents = (param) => {
  return fetchRequest(URL.API_SERVER + `events/wizlab`, "GET");
};

export const getWeeklyProjectsByType = (param) => {
  return fetchRequest(URL.API_SERVER + `projects/weekly/bytype`, "POST", param);
};

//play page
export const playProject = (params) => {
  return fetchRequest(URL.API_SERVER + "play/game/tag", "POST", params);
};

export const getAllProjects = (queryString) => {
  return fetchRequest(
    URL.API_SERVER + `play/game/list/all?${queryString}`,
    "GET"
  );
};

export const getRecentlyPlayed = () => {
  return fetchRequest(URL.API_SERVER + "play/game/list/recently", "GET");
};

export const getProjectsByType = (param) => {
  return fetchRequest(URL.API_SERVER + `projects/bytype`, "POST", param);
};

export const getOcp2ChallengePopulars = (param) => {
  return fetchRequest(
    URL.API_SERVER + "event/ocp/s2/challenge/populars",
    "POST",
    param
  );
};

/** ocp2 challenge event  */
export const addChallenge = (param) => {
  return fetchRequest(
    URL.API_SERVER + `event/ocp/s2/challenge/add`,
    "POST",
    param
  );
};

export const checkAttendEventChallenge = (param) => {
  return fetchRequest(
    URL.API_SERVER + `event/ocp/s2/challenge/check`,
    "POST",
    param
  );
};

export const applyOnlineCamp = (param) => {
  return fetchRequest(URL.API_SERVER + `onlineCamp/apply`, "POST", param);
};

export const getWhiteList = (param) => {
  return fetchRequest(URL.API_SERVER + `whiteList/${param.email}`, "GET");
};

export const getWizlabAPKs = (param) => {
  return fetchRequest(URL.API_SERVER + `wizlabAPKs/get`, "POST", param);
};

export const getWizlabAPK = (param) => {
  return fetchRequest(URL.API_SERVER + `wizlabAPK/get`, "POST", param);
};

export const getIsPackageNameDuplicate = (param) => {
  return fetchRequest(
    URL.API_SERVER + `wizlabAPK/packageName/isDuplicate/get`,
    "POST",
    param
  );
};

export const createWizlabAPK = (param) => {
  return fetchRequest(URL.API_SERVER + `wizlabAPK/create`, "POST", param);
};

export const updateWizlabAPK = (param) => {
  return fetchRequest(URL.API_SERVER + `wizlabAPK/update`, "POST", param);
};

export const uploadWizlabAPKIcon = (formData) => {
  return fetch(URL.API_SERVER + "upload/wizlapAPK/icon", {
    method: "POST",
    body: formData,
  });
};

export const apkHistory = (param) => {
  return fetchRequest(URL.API_SERVER + `wizlabAPK/history`, "POST", param);
};
/* promotion code */
export const checkPromotionCodeValid = (param) => {
  return fetchRequest(URL.API_SERVER + `promotionCode/valid`, "POST", param);
};

export const getNewsList = (param) => {
  return fetchRequest(
    URL.API_SERVER + `news/${param.type}/${param.offset}/${param.limit}`,
    "GET"
  );
};
export const getNewsDetail = (param) => {
  return fetchRequest(URL.API_SERVER + `news/detail/${param.newsId}`, "GET");
};

export const createNewsReply = (param) => {
  return fetchRequest(URL.API_SERVER + `news/reply`, "POST", param);
};

export const updateNewsReply = (param) => {
  return fetchRequest(URL.API_SERVER + `news/reply/change`, "POST", param);
};

export const deleteNewsReply = (param) => {
  return fetchRequest(
    URL.API_SERVER + `news/reply/${param.commentId}`,
    "DELETE"
  );
};

export const postReportComment = (param) => {
  return fetchRequest(URL.API_SERVER + `news/reportComment`, "POST", param);
};

//builder qna
export const getBuilderQuestions = (param) => {
  if (param.userId) {
    return fetchRequest(
      URL.API_SERVER +
        `wizlabQnA/${param.limit}/${param.offset}/${param.userId}`,
      "GET"
    );
  } else {
    return fetchRequest(
      URL.API_SERVER + `wizlabQnA/${param.limit}/${param.offset}`,
      "GET"
    );
  }
};

export const getBuilderQuestion = (param) => {
  return fetchRequest(URL.API_SERVER + `wizlabQnA/${param.id}`, "GET");
};

export const getQuestionState = (param) => {
  return fetchRequest(
    URL.API_SERVER + `wizlabQnA/get/state/${param.id}`,
    "POST"
  );
};

export const postBuilderQuestion = (params) => {
  return fetchRequest(URL.API_SERVER + `wizlabQnA/`, "POST", params);
};

export const postBuilderAnswer = (params) => {
  return fetchRequest(URL.API_SERVER + `wizlabQnA/answer`, "POST", params);
};

// dreamclass
export const getDreamCourseDetails = () => {
  return fetchRequest(URL.API_SERVER + "dreamCourses/detail", "GET");
};
export const getDreamLecture = (id) => {
  return fetchRequest(URL.API_SERVER + `dreamLecture/${id}`, "GET");
};
export const updateDreamLecture = (id, params) => {
  return fetchRequest(URL.API_SERVER + `dreamLecture/${id}`, "PUT", params);
};
export const deleteDreamLecture = (id) => {
  return fetchRequest(URL.API_SERVER + `dreamLecture/${id}`, "DELETE");
};
export const addDreamLectureForCourse = (courseId) => {
  return fetchRequest(
    URL.API_SERVER + `dreamCourse/${courseId}/emptyLecture`,
    "POST"
  );
};
export const getDreamProject = (id) => {
  return fetchRequest(URL.API_SERVER + `dreamProject/${id}`, "GET");
};
export const getDreamProjectsByTag = (tag) => {
  return fetchRequest(URL.API_SERVER + `dreamProjects/?tag=${tag}`, "GET");
};
export const updateDreamProject = (id, params) => {
  return fetchRequest(URL.API_SERVER + `dreamProject/${id}`, "PUT", params);
};
export const deleteDreamProject = (id) => {
  return fetchRequest(URL.API_SERVER + `dreamProject/${id}`, "DELETE");
};
export const addDreamProjectForLecture = (lectureId) => {
  return fetchRequest(
    URL.API_SERVER + `dreamLecture/${lectureId}/emptyProject`,
    "POST"
  );
};
export const getMyDreamProject = (id) => {
  return fetchRequest(URL.API_SERVER + `myDreamProject/${id}`, "GET");
};
export const postMyDreamProject = ({ projectId }) => {
  return fetchRequest(`${URL.API_SERVER}myDreamProject`, "POST", { projectId });
};

export const saveMyDreamProject = (id, updateValues) => {
  return fetchRequest(
    URL.API_SERVER + `myProject/complete/${id}`,
    "PUT",
    updateValues
  );
};

export const saveAstroMission = (id, updateValues) => {
  return fetchRequest(
    URL.API_SERVER + `myProject/complete/${id}`,
    "PUT",
    updateValues
  );
};
export const getAstroMissionCompleteInfo = (id) => {
  return fetchRequest(URL.API_SERVER + `myProject/complete/${id}`, "GET");
};

export const getMyDreamProjectInfo = (id) => {
  return fetchRequest(URL.API_SERVER + `myDreamProject/${id}/get`, "GET");
};

export const dreamUpload = (formData) => {
  const headers = {};
  if (localStorage.getItem("astroToken")) {
    headers["Authorization"] = localStorage.getItem("astroToken");
  }
  headers["locale"] = localStorage.getItem("wizLang");
  return fetch(URL.API_SERVER + "upload/dream", {
    method: "POST",
    headers,
    body: formData,
  });
};
export const getReservationStudents = (roomId) => {
  return fetchRequest(
    URL.API_SERVER + `wizLive/reservation/students/${roomId}`,
    "GET"
  );
};
export const getNextMyDreamProject = (id) => {
  return fetchRequest(URL.API_SERVER + `nextMyProject/${id}`, "GET");
};

export const getPythonCategoryItembooks = () => {
  return fetchRequest(
    URL.API_SERVER + `dream/python/category/itembooks`,
    "GET"
  );
};

// ranking page
export const getMyRanking = (param) => {
  const { type, email } = param;
  let query = `type=${type}&email=${email}`;
  return fetchRequest(URL.API_SERVER + `userRanking?${query}`, "GET");
};

export const getUserRankings = (param) => {
  const { limit, offset, type, searchKey } = param;
  let query = `type=${type}`;
  if (searchKey) {
    query += `&searchKey=${searchKey}`;
  } else {
    query += `&limit=${limit}&offset=${offset}`;
  }
  return fetchRequest(URL.API_SERVER + `userRankings?${query}`, "GET");
};

export const getPublishedList = (queryString) => {
  return fetchRequest(URL.API_SERVER + `publishedList?${queryString}`, "GET");
};

export const getSemester = () => {
  return fetchRequest(URL.API_SERVER + `semester`, "GET");
};

export const checkShareGame = ({ type }) => {
  return fetchRequest(URL.API_SERVER + `achievement/checkShareGame`, "POST", {
    type,
  });
};

export const getDreamEvents = () => {
  return fetchRequest(URL.API_SERVER + `dream/events`, "GET");
};

export const getDreamEvent = (param) => {
  return fetchRequest(URL.API_SERVER + `dream/event/${param.id}`, "GET");
};

export const createDreamReport = (params) => {
  return fetchRequest(URL.API_SERVER + "dreamReport", "POST", params);
};

export const getCertificateInfo = (courseId) => {
  return fetchRequest(
    URL.API_SERVER + `course/certificate/${courseId}`,
    "GET"
  ).then((res) => res.json());
};

export const addCertificateInfo = (formData) => {
  return fetchRequest(
    URL.API_SERVER + `course/certificate`,
    "POST",
    formData
  ).then((res) => res.json());
};

export const accountActivateCheckout = (authorityKey) => {
  return fetchRequest(
    URL.API_SERVER + `account/activate/checkout/${authorityKey}`,
    "GET"
  );
};

export const getAttendance = (userId) => {
  return fetchRequest(URL.API_SERVER + `account/attendance/${userId}`, "GET");
};

export const getLearn = (formData) => {
  return fetchRequest(URL.API_SERVER + `learn/box`, "GET", formData).then(
    (res) => res.json()
  );
};

export const getLearnCourses = (formData) => {
  return fetchRequest(URL.API_SERVER + `learn/courses`, "GET", formData).then(
    (res) => res.json()
  );
};

export const inviteSignup = (params, authorityKey) => {
  return fetchRequest(
    URL.API_SERVER + `account/register/${authorityKey.authorityKey}`,
    "POST",
    params
  );
};

export const loginByGoogle = (params) => {
  return fetchRequest(
    URL.API_SERVER + `account/loginByGoogle`,
    "POST",
    params
  ).then((res) => res.json());
};

export const modifyPassword = (params) => {
  return fetchRequest(
    URL.API_SERVER + `account/modify/password`,
    "POST",
    params
  );
};

export const modifyName = (params) => {
  return fetchRequest(
    URL.API_SERVER + `account/modify/names`,
    "POST",
    params
  ).then((res) => res.json());
};

export const sendContact = (params) => {
  return fetchRequest(URL.API_SERVER + `intro/contact`, "POST", params).then(
    (res) => res.json()
  );
};

export const getProjectShowHintState = (projectId) => {
  return fetchRequest(URL.API_SERVER + `myProject/${projectId}`, "GET").then(
    (res) => res.json()
  );
};
