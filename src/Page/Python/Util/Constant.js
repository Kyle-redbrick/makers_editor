export const SCENE_MODE = {
  INTRO: "intro",
  QUESTION: "question",
  RESULT: "result",
  MEDIA: "mediaSlide",
  CHAT: "chat",
  ANNOUNCE: "announce",
  GIFT: "gift"
};

export const OVERLAY_VIEW = sceneMode => {
  if (
    [SCENE_MODE.INTRO, SCENE_MODE.QUESTION, SCENE_MODE.RESULT].includes(
      sceneMode
    )
  ) {
    return true;
  }
};

export const COLLECTION_TAB = {
  API: {
    type: "api",
    displayName: "API",
    list: [
      { title: "print", description: "print의 설명입니다." },
      { title: "int", description: "int의 설명입니다." },
      { title: "len", description: "len의 설명입니다." },
      { title: "replact", description: "replact의 설명입니다." },
      { title: "split", description: "split의 설명입니다." },
      { title: "sort", description: "sort의 설명입니다." },
      { title: "range", description: "range의 설명입니다." },
      { title: "append", description: "append의 설명입니다." },
      { title: "bin", description: "bin의 설명입니다." },
      { title: "join", description: "join의 설명입니다." },
      { title: "keys", description: "keys의 설명입니다." },
      { title: "values", description: "values의 설명입니다." },
      { title: "items", description: "items의 설명입니다." },
      { title: "get", description: "get의 설명입니다." },
      { title: "max", description: "max의 설명입니다." },
      { title: "len", description: "len의 설명입니다." },
      { title: "isalpha", description: "isalpha의 설명입니다." },
      { title: "zip", description: "zip의 설명입니다." },
      { title: "set", description: "set의 설명입니다." },
      { title: "pop", description: "pop의 설명입니다." },
      { title: "list", description: "list의 설명입니다." }
    ]
  },
  DATATYPE: {
    type: "dataType",
    displayName: "자료형",
    list: [
      { title: "변수", description: "변수의 설명입니다." },
      { title: "문자열", description: "문자열의 설명입니다." },
      { title: "문자열 연산", description: "문자열 연산의 설명입니다." },
      { title: "인덱스", description: "인덱스의 설명입니다." },
      { title: "문자열 인덱싱", description: "문자열 인덱싱의 설명입니다." },
      { title: "문자열 슬라이싱", description: "문자열 슬라이싱의 설명입니다." },
      { title: "문자열 함수", description: "문자열 함수의 설명입니다." },
      { title: "리스트", description: "리스트의 설명입니다." },
      { title: "리스트 인덱싱", description: "리스트 인덱싱의 설명입니다." },
      { title: "2진수", description: "2진수의 설명입니다." },
      { title: "2차원 리스트", description: "2차원 리스트의 설명입니다." },
      { title: "딕셔너리", description: "딕셔너리의 설명입니다." },
      { title: "사용자 함수", description: "사용자 함수의 설명입니다." },
      { title: "집합", description: "집합의 설명입니다." }
    ]
  },
  OPERATOR: {
    type: "operator",
    displayName: "연산자",
    list: [
      { title: "산술연산자", description: "산술연산자의 설명입니다." },
      { title: "비교연산자", description: "비교연산자의 설명입니다." },
      { title: "논리연산자", description: "논리연산자의 설명입니다." },
      { title: "포함연산자", description: "포함연산자의 설명입니다." }
    ]
  },
  CONTROLFLOW: {
    type: "controlFlow",
    displayName: "제어문",
    list: [
      { title: "for 반복문", description: "for 반복문의 설명입니다." },
      { title: "if 조건문", description: "if 조건문의 설명입니다." },
      { title: "elif 조건문", description: "elif의 설명입니다." },
      { title: "while 반복문", description: "while 반복문의 설명입니다." },
      { title: "이중 반복문", description: "이중반복문의 설명입니다." },
      { title: "반복 흐름 제어", description: "반복 흐름제어의 설명입니다." }
    ]
  },
  ETC: {
    type: "etc",
    displayName: "기타",
    list: [
      { title: "줄바꿈 제거", description: "줄바꿈 제거의 설명입니다." },
      { title: "최소값 탐색", description: "최소값 탐색의 설명입니다." }
    ]
  }
};

export const COLLECTION_TAB_LIST = [
  COLLECTION_TAB.API,
  COLLECTION_TAB.DATATYPE,
  COLLECTION_TAB.OPERATOR,
  COLLECTION_TAB.CONTROLFLOW,
  COLLECTION_TAB.ETC
];
