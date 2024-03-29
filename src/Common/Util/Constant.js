const subdomain = "dreamdev.";
export const URL = {
  SOCKET_SERVER: `https://astro-sock.wizclass.com/`,
  NOTIFICATION_SOCKET_SERVER: `https://astroboy-api-dev.wizclass.com:3002/`,
  API_SERVER: `https://api.wizclass.com/`,
  API_SAAS_SERVER: process.env.REACT_APP_API_SERVER,
  GAME_SRC: process.env.REACT_APP_GAME_SRC,
  LIVE_TEST: `https://${subdomain}wizlab.net/liveTest/`,
  WIZ_APP: `https://en.astro-coding-go.com/game?pId=`,
  ORIGIN: `https://${subdomain}wizlab.net/`,
  WIZLIVE: `https://${subdomain}wizlive.com`,
  WIZLIVE_WWW: `https://www.${subdomain}wizlive.com`,
  ICE_SERVERS: [
    {
      urls: [
        `stun:wizlive.wizschool.io:3478`,
        `turn:wizlive.wizschool.io:3478`,
      ],
      username: `wizmate`,
      credential: `dudtkdxhdghk`,
    },
  ],
  MQ: `wss://b-cbf4fce1-6979-4051-8fd6-2017eca62b9a-1.mq.ap-northeast-2.amazonaws.com:61619`,
  RECORD_S3: `https://wizschool-record.s3.ap-northeast-2.amazonaws.com`,
  S3_VIDEOCLASS: `https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com`,
  S3_WIZLABAPK: "https://wizlab-apk.s3.ap-northeast-2.amazonaws.com",
  get S3_DREAMCLASS() {
    return "https://d21hhf2g9kirkh.cloudfront.net";
  },
  get THUMBNAIL_ALI() {
    return process.env.REACT_APP_THUMBNAIL_ALI;
  },
};

export const GOOGLE_SIGNIN_CLIENT_ID =
  "451745919454-7ga3u82oe852pukhe4esubr6crb67rmq.apps.googleusercontent.com";

export const WIZLIVE_BANNER_LINK = (promotionId, userId) => {
  const url = `http://wizlive.com/wizlabPromotion/${promotionId}/`;
  if (userId) {
    return url + "?uId=" + userId;
  } else {
    return url;
  }
};

export const VCTYPE = {
  STEP: {
    VIDEO: "VIDEO",
    IMAGE: "IMAGE",
    CODE: "CODE",
    QUIZ: "QUIZ",
    BRANCH: "BRANCH",
    EDIT_MAP: "EDIT_MAP",
    CUSTOMSPRITE: "CUSTOMSPRITE",
    START: "START",
    END: "END",
  },
  CONDITION: {
    SPRITE_EXIST: "SPRITE_EXIST",
    SPRITE_INDEX: "SPRITE_INDEX",
    SPRITE_SELECTED: "SPRITE_SELECTED",
    SCENE_EMPTY: "SCENE_EMPTY",
    SCENE_FIRST: "SCENE_FIRST",
    SCENE_SELECTED: "SCENE_SELECTED",
    CUSTOM_ID_EXIST: "CUSTOM_ID_EXIST",
    CODE_EXIST: "CODE_EXIST",
    CODE_AST: "CODE_AST",
    PLAY_ONCE: "PLAY_ONCE",
    GAME_EVENT: "GAME_EVENT",
    OOBC_LINE_EXIST: "OOBC_LINE_EXIST",
  },
  EGO: {
    TEXT: "TEXT",
    IMAGE: "IMAGE",
    PLAY: "PLAY",
    NEXT: "NEXT",
    COMPONENT: "COMPONENT",
  },
};

// deprecated
export const VideoClassStageType = {
  START: "START",
  VIDEO: "VIDEO",
  IMAGE: "IMAGE",
  PLAY: "PLAY",
  CODE: "CODE",
  TEST: "TEST",
  END: "END",
};
export const VideoClassConditionType = {
  SPRITE_EXIST: "SPRITE_EXIST",
  CODE_EXIST: "CODE_EXIST",
  SCENE_FIRST: "SCENE_FIRST",
  SCENE_SELECTED: "SCENE_SELECTED",
  SPRITE_SELECTED: "SPRITE_SELECTED",
  PLAY_ONCE: "PLAY_ONCE",
  PUBLISH_PROJECT: "PUBLISH_PROJECT",
};
export const VideoClassEgoType = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
};

export const WORLD = {
  DEFAULT_WIDTH: 1280,
  DEFAULT_HEIGHT: 720,
  MIN_WIDTH: 1280,
  MIN_HEIGHT: 720,
  MAX_WIDTH: 9999,
  MAX_HEIGHT: 9999,
};

// gamePageGenerator.js & parser.js
export const WizSpritePrefix = "___m___";

export const ActionType = {
  SET_PROJECT: "SET_PROJECT",
  SET_TEMPLATE: "SET_TEMPLATE",
  SET_PROJECT_NAME: "SET_PROJECT_NAME",
  RESET_PROJECT: "RESET_PROJECT",
  PUBLISH_PROJECT: "PUBLISH_PROJECT",
  SET_SCREENSHOT_URL: "SET_SCREENSHOT_URL",

  ADD_SCENE: "ADD_SCENE",
  COPY_SCENE: "COPY_SCENE",
  REMOVE_SCENE: "REMOVE_SCENE",
  REORDER_SCENE: "REORDER_SCENE",
  SET_WORLD_SIZE: "SET_WORLD_SIZE",

  SELECT_SCENE: "SELECT_SCENE",
  SELECT_SPRITE: "SELECT_SPRITE",

  ADD_SPRITES: "ADD_SPRITES",
  REMOVE_SPRITE: "REMOVE_SPRITE",
  REMOVE_ALL_SPRITE: "REMOVE_ALL_SPRITE",
  REORDER_SPRITE: "REORDER_SPRITE",
  SET_EDITOR_MODE: "SET_EDITOR_MODE",
  SET_SPRITE_CODE: "SET_SPRITE_CODE",
  SET_GLOBAL_VARIABLE: "SET_GLOBAL_VARIABLE",
  SET_SPRITE_BLOCKXML: "SET_SPRITE_BLOCKXML",
  SET_SPRITE_PREVIEW: "SET_SPRITE_PREVIEW",

  ADD_SOUNDS: "ADD_SOUNDS",
  REMOVE_SOUND: "REMOVE_SOUND",
  PLAY_SOUND: "PLAY_SOUND",
  PAUSE_SOUND: "PAUSE_SOUND",
  STOP_SOUND: "STOP_SOUND",

  SET_IS_PLAYING: "SET_IS_PLAYING",
  SET_SCREEN_MODE: "SET_SCREEN_MODE",

  SET_IS_APP_MODAL_ON: "SET_IS_APP_MODAL_ON",

  UPDATE_USERINFO: "UPDATE_USERINFO",
  SET_MAIN_POPUP: "SET_MAIN_POPUP",

  SET_VIDEO_URL: "SET_VIDEO_URL",

  ADD_ROOM: "ADD_ROOM",
  ADD_MSG: "ADD_MSG",
  ADD_MSG_TO_QUEUE: "ADD_MSG_TO_QUEUE",
  CLEAR_MSG_QUEUE: "CLEAR_MSG_QUEUE",
  SET_SELECTED_ROOM: "SET_SELECTED_ROOM",
  ADD_UNREAD_MSG_COUNT: "ADD_UNREAD_MSG_COUNT",
  RESET_UNREAD_MSG_COUNT: "RESET_UNREAD_MSG_COUNT",

  WEBRTC_SET_PROJECT: "WEBRTC_SET_PROJECT",
  ADD_DRAWING: "ADD_DRAWING",
  SET_DRAWING_BOARD: "SET_DRAWING_BOARD",
  SET_EDITOR_RANGE: "SET_EDITOR_RANGE",
  SET_LOG: "SET_LOG",

  SET_INSTANTRUN_URL: "SET_INSTANTRUN_URL",
  SET_REQUEST_IMAGE: "SET_REQUEST_IMAGE",
  SET_RESPONSE_IMAGE: "SET_RESPONSE_IMAGE",

  SET_BTN_HIGHLIGHT: "SET_BTN_HIGHLIGHT",

  LOCK_SPRITE: "LOCK_SPRITE",
  HIDE_LOCK_SPRITE: "HIDE_LOCK_SPRITE",
  REMOVE_ALL_SOUND: "REMOVE_ALL_SOUND",

  SET_GAME_VOLUME: "SET_GAME_VOLUME",
  SET_SCENE_PREVIEW: "SET_SCENE_PREVIEW",

  ADD_NEW_MSG: "ADD_NEW_MSG",
  SET_TUTOR: "SET_TUTOR",
  SET_CHATBOT_ERRORS: "SET_CHATBOT_ERRORS",
  REMOVE_CHATBOT_MESSAGES: "REMOVE_CHATBOT_MESSAGES",
  INIT_CHATBOT: "INIT_CHATBOT",

  SET_BLOCK_CATEGORY: "SET_BLOCK_CATEGORY",
  ADD_GLOBAL_VARIABLE: "ADD_GLOBAL_VARIABLE",

  SET_STUDENTS: "SET_STUDENTS",
  GET_CURRENT_USER: "GET_CURRENT_USER",
};

export const MainPopupType = {
  LOGIN: "POPUP_LOGIN",
  SIGNUP: "POPUP_SIGNUP",
};

export const DrawerType = {
  API: "DRAWER_API",
  ANIME: "DRAWER_ANIME",
  SOUND: "DRAWER_SOUND",
  CHAT: "DRAWER_CHAT",
};

export const ModalType = {
  STORAGE: "MODAL_STORAGE",
  PUBLISH: "MODAL_PUBLISH",
  QRTEST: "MODAL_QRTEST",
  INSTANT_RUN: "MODAL_INSTANT_RUN",
};

export const SpriteType = {
  PLAIN: "plain",
  SPRITE: "sprite",
  BACKGROUND: "background",
  TEXT: "text",
  CUSTOM: "custom",
  COMPONENT: "component",
};

export const ErrorType = {
  PARAMETER_INVALID_TYPE: "PARAMETER_INVALID_TYPE",
  PARAMETER_UNDEFINED: "PARAMETER_UNDEFINED",
  PARAMETER_NOT_FOUND: "PARAMETER_NOT_FOUND",
};

export const spamType = {
  SPAM_BAD_WORD: "badWord",
  SPAM_DUPLICATION: "duplication",
  SPAM_TIME: "time",
};

export const DEFAULT_PROFILE_IMAGES = [
  "https://s3.ap-northeast-2.amazonaws.com/wizschool-images/profile-image-00.png",
  "https://s3.ap-northeast-2.amazonaws.com/wizschool-images/profile-image-01.png",
  "https://s3.ap-northeast-2.amazonaws.com/wizschool-images/profile-image-02.png",
  "https://s3.ap-northeast-2.amazonaws.com/wizschool-images/profile-image-03.png",
  "https://s3.ap-northeast-2.amazonaws.com/wizschool-images/profile-image-04.png",
  "https://s3.ap-northeast-2.amazonaws.com/wizschool-images/profile-image-05.png",
  "https://s3.ap-northeast-2.amazonaws.com/wizschool-images/profile-image-06.png",
  "https://s3.ap-northeast-2.amazonaws.com/wizschool-images/profile-image-07.png",
  "https://s3.ap-northeast-2.amazonaws.com/wizschool-images/profile-image-08.png",
  "https://s3.ap-northeast-2.amazonaws.com/wizschool-images/profile-image-09.png",
];

export const SIGNOUT_PROFILE_IMAGE =
  "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/signout_user.png";

export const DEFAULT_VIDEO_URL =
  "https://s3.ap-northeast-2.amazonaws.com/wizschool-class-videos/basic_1_preview.mp4";

// like 'javascript-wiz' naming is ace editor standard
export const EDITORMODE = {
  JAVASCRIPT: "javascript-wiz",
  JAVASCRIPT_3D: "javascript-wiz-3d",
  PYTHON: "python",
  BLOCK: "block",
};

export const PAGETYPE = {
  // BUILDER: "",
  BUILDER: "builder",
  BUILDER_EDIT: "builder_edit",
  BUILDER_READONLY: "builder_readonly",
  BUILDER3D: "builder3d",
  WIZLIVE: "wizlive",
  WIZLIVE_1V4: "wizlive_1v4",
  MONITOR: "monitor",
  VIDEOCLASS: "videoclass",
  OCP: "ocp",
  OCP2: "ocp2",
  BLOCK: "block",
  JS: "js",
  RECORD_PLAYER: "recordPlayer",
  TUTORIAL: "tutorial",
  QNA_READONLY: "qna_readonly",
  DREAMCLASS: "dreamclass",
  CLASS: "class",
  MONITOR_1V4: "monitor_1v4",
};

export const GAMEPAGE_MODE = {
  NORMAL: "NORMAL",
  SEARCH: "SEARCH",
  MORE: "MORE",
};

export const CHAT_MSG_TYPE = {
  TEXT: "TEXT",
};

export const ChatbotMsgType = {
  BOT_SELECT: "BOT_SELECT",
  BOT_CONFIRM: "BOT_CONFIRM",
  BOT_API_SCRIPT: "BOT_API_SCRIPT",
  BOT_ERROR: "BOT_ERROR",
  BOT_BUTTON: "BOT_BUTTON",
  BOT_CLASS: "BOT_CLASS",

  GAME_SESSION: "GAME_SESSION",
  GAME_PRINT: "GAME_PRINT",

  REQUEST_SOLUTION: "REQUEST_SOLUTION",
};

export const CHAT_TYPE = {
  ALL: "all",
};

export const RESOURCE = {
  OCP_LEARNINGTOOL:
    "https://d1tz4sj00zmgsb.cloudfront.net/%EB%B0%A9%ED%83%88%EC%B6%9C+-+%ED%95%99%EC%8A%B5%EB%A9%94%EB%89%B4%EB%8F%84%EA%B5%AC.zip",
};
export const OCP_GRADE = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
};

export const OCP_IMAGES = {
  beginner: {
    level1: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/cover/beginner_01.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-1/1-1+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      tutorials: [...Array(9).keys()].map(
        (element) =>
          `${URL.S3_VIDEOCLASS}/ocp/${OCP_GRADE.BEGINNER}/tutorial/tutorial_${
            element + 1
          }.png`
      ),
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-1/1-1+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-1/1-1+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_new.png",
      // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-1/1-1+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-1/1-1+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-1/1-1+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
    },
    level2: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/cover/beginner_02.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      tutorial:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/tutorial/tutorial_6.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
      select1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3_new.png",
      // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-2/1-2+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png"
    },
    level3: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/cover/beginner_03.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-3/1-3+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      tutorial:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/tutorial/tutorial_6.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-3/1-3+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-3/1-3+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-3/1-3+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-3/1-3+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-3/1-3+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-3/1-3+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-3/1-3+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-3/1-3+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      select1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-3/1-3+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-3/1-3+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png"
    },
    level4: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/cover/beginner_04.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      tutorial:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/tutorial/tutorial_6.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      mission4:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_4.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3_new.png",
      // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      description4:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_4.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      answer4:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_4.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
      hint4:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_4.png",
      select1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      select2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png"
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-4/1-4+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
    },
    level5: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/cover/beginner_05.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-5/1-5+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-5/1-5+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-5/1-5+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-5/1-5+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-5/1-5+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-5/1-5+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-5/1-5+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-5/1-5+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-5/1-5+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
    },
    level6: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/cover/beginner_06.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      tutorial:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/tutorial/tutorial_6.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
      // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
      select1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3_new.png",
      // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-6/1-6+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png"
    },
    level7: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/cover/beginner_07.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      tutorial:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/tutorial/tutorial_6.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-7/1-7+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
    },
    level8: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/cover/beginner_08.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-8/1-8+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-8/1-8+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-8/1-8+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-8/1-8+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-8/1-8+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-8/1-8+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-8/1-8+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-8/1-8+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-8/1-8+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
    },
    level9: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/cover/beginner_09.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-9/1-9+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      tutorial:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/tutorial/tutorial_8.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-9/1-9+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-9/1-9+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-9/1-9+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-9/1-9+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
    },
    level10: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/cover/beginner_09.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-10/1-10+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-10/1-10+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      description1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-10/1-10+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-10/1-10+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-10/1-10+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/beginner/1-10/1-10+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
    },
  },
  intermediate: {
    level1: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/cover/intermediate_01.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
      select1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      select2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png"
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-1/2-1+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
    },
    level2: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/cover/intermediate_02.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-2/2-2+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-2/2-2+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-2/2-2+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-2/2-2+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-2/2-2+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-2/2-2+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-2/2-2+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-2/2-2+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-2/2-2+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-2/2-2+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
    },
    level3: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/cover/intermediate_03.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-3/2-3+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
    },
    level4: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/cover/intermediate_04.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-4/2-4+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-4/2-4+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-4/2-4+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-4/2-4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-4/2-4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-4/2-4+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-4/2-4+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-4/2-4+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-4/2-4+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      select1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-4/2-4+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png"
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-4/2-4+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
    },
    level5: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/cover/intermediate_05.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
      select1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      select2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png"
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-5/2-5+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
    },
    level6: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/cover/intermediate_06.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      mission4:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_4.png",
      description1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      description4:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_4.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_4_new.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      answer4:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_4.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
      hint4:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-6/2-6+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_4.png",
    },
    level7: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/cover/intermediate_07.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-7/2-7+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
    },
    level8: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/cover/intermediate_08.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-8/2-8+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-8/2-8+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-8/2-8+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-8/2-8+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-8/2-8+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
    },
    level9: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/cover/intermediate_09.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-9/2-9+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
    },
    level10: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/cover/intermediate_10.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2_new.png",
      select1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png"
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/intermediate/2-10/2-10+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2_new.png",
    },
  },
  advanced: {
    level1: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/cover/advanced_01.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
      select1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      select2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png"
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-1/3-1+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
    },
    level2: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/cover/advanced_02.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      description1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
      description2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
      description3:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3_new.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
      select1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png"
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-2/3-2+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
    },
    level3: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/cover/advanced_03.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      mission4:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_4.png",
      description1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      description2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
      description3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
      description4:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_4.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      answer4:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_4.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
      hint4:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-3/3-3+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_4.png",
    },
    level4: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/cover/advanced_04.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      description2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      select1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png"
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-4/3-4+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
    },
    level5: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/cover/advanced_05.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      description2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      select1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png"
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-5/3-5+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
    },
    level6: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/cover/advanced_06.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      mission3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_3.png",
      description1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      description2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
      description3:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_3_new.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      answer3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_3.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      hint3:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-6/3-6+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_3.png",
    },
    level7: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/cover/advanced_07.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-7/3-7+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-7/3-7+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-7/3-7+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-7/3-7+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-7/3-7+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      description2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-7/3-7+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-7/3-7+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-7/3-7+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-7/3-7+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-7/3-7+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-7/3-7+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
    },
    level8: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/cover/advanced_08.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-8/3-8+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-8/3-8+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-8/3-8+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-8/3-8+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-8/3-8+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      description2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-8/3-8+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-8/3-8+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-8/3-8+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-8/3-8+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-8/3-8+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-8/3-8+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
    },
    level9: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/cover/advanced_09.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-9/3-9+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-9/3-9+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-9/3-9+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-9/3-9+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-9/3-9+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      description2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-9/3-9+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-9/3-9+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
      answer1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-9/3-9+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-9/3-9+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-9/3-9+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-9/3-9+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
    },
    level10: {
      cover:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/cover/advanced_10.png",
      story:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%85%E1%85%B5.png",
      mission1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_1.png",
      mission2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A9%E1%84%80%E1%85%A2_2.png",
      description1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
      description2:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%89%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A6%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_2_new.png",
      answer1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_1_new.png",
      answer2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B8_2.png",
      hint1:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_1.png",
      hint2:
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%92%E1%85%B5%E1%86%AB%E1%84%90%E1%85%B3_2.png",
      select1:
        // "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1.png",
        "https://wizschool-videoclass.s3.ap-northeast-2.amazonaws.com/ocp/advanced/3-10/3-10+%E1%84%89%E1%85%B3%E1%84%91%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC_1_new.png",
    },
  },
};

export const OCPv2 = {
  GAMETYPE: {
    ESCAPE: "escape",
    BLOCK: "block",
    GAME: "game",
  },

  GRADE: {
    BEGINNER: "beginner",
    INTERMEDIATE: "intermediate",
    ADVANCED: "advanced",
  },
};

export const WIZLAB_APK_STATUS = {
  ONGOING: "ongoing",
  COMPLETE: "complete",
  CANCEL: "cancel",
};

export const LEARNING_COMPLETE_ID = [
  "learning_oobc_c1",
  "learning_js_c1",
  "learning_python_c1",
];

export const USER_TYPE = {
  SUPER_ADMIN: "Z",
  ADMIN: "A",
  TUTOR: "T",
  STUDENT: "S",
};

export const isConnectProd = () => {
  return false;
};
